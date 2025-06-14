import React, { useState, useRef, useEffect } from 'react';
import ProductSelectionStep from './order/ProductSelectionStep.jsx';
import OrderInformationStep from './order/OrderInformationStep.jsx';
import ConfirmationStep from './order/ConfirmationStep.jsx';
import EmailPreviewStep from './order/EmailPreviewStep.jsx';
import { calculateSummary } from './order/PriceSummary.jsx';
import config from '../setup/config.js';
import t from '../setup/i18n.js';

const createEmptyProduct = (id) => ({
  id,
  type: '',
  damageCount: 0,
  damages: [],
  damageDetails: {},
  damageLabels: {},
  otherIssues: {},
  defectDetails: {},
  defectLabels: {},
  images: null,
  isEmployeeOwned: false,
  employeeName: '',
  employeeDepartment: '',
  damageErrors: {},
  damageOptionErrors: {},
  markerError: undefined,
});

export default function OrderForm({ prefilledData = null, scrollRef }) {
  const internalRef = useRef(null);
  const containerRef = scrollRef || internalRef;
  const [step, setStep] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([createEmptyProduct(1)]);
  const [orderInfo, setOrderInfo] = useState(prefilledData || {});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  // Scroll back to the top of the form whenever the step changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [step]);

  // Update orderInfo when prefilledData changes
  useEffect(() => {
    if (prefilledData) {
      setOrderInfo(prefilledData);
    }
  }, [prefilledData]);

  const onFieldBlur = (name) => {
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
  };

  const resetForm = () => {
    setStep(0);
    setQuantity(1);
    setProducts([createEmptyProduct(1)]);
    setOrderInfo(prefilledData || {});
    setTermsAccepted(false);
    setTouchedFields({});
    setValidationErrors({});
  };

  const validateProducts = async () => {
    if (products.length === 0) return false;
    let valid = true;
    
    // Check if any product has 0 total cost
    const { productTotals } = calculateSummary(products);
    productTotals.forEach((productTotal, index) => {
      if (productTotal.subtotal === 0) {
        valid = false;
        console.error(`Product ${index + 1} has 0 cost - missing required selections`);
      }
    });
    
    // Pre-validate damage options before detailed validation
    products.forEach((product, productIndex) => {
      const category = config.productCategories.find((c) => c.id === product.type);
      if (!category) return;
      
      for (let i = 0; i < (product.damageCount || 0); i++) {
        const damageId = product.damages?.[i];
        if (!damageId) {
          valid = false;
          console.error(`Product ${productIndex + 1}: No damage type selected for damage ${i + 1}`);
          continue;
        }
        
        const damage = category.damages.find(d => d.id === damageId);
        if (!damage) {
          valid = false;
          console.error(`Product ${productIndex + 1}: Invalid damage type ${damageId}`);
          continue;
        }
        
        // Check if damage has options and if option is selected
        if (damage.options && damage.options.length > 0) {
          const selectedOption = product.damageDetails?.[`damage-${i}`]?.optionId;
          if (!selectedOption) {
            valid = false;
            console.error(`Product ${productIndex + 1}: Missing option for damage ${i + 1} (${damage.name?.en || damageId})`);
          }
        }
        
        // Check marker requirement
        if (damage.markedOnPicture) {
          const position = product.damageDetails?.[`damage-${i}`]?.position;
          if (!position) {
            valid = false;
            console.error(`Product ${productIndex + 1}: Missing marker for damage ${i + 1} (${damage.name?.en || damageId})`);
          }
        }
      }
    });
    
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        const typeError = p.type ? undefined : t('validation.required');
        if (!p.type) valid = false;

        const damageErrors = {};
        const damageOptionErrors = {};
        let markerError;
        const category = config.productCategories.find((c) => c.id === p.type);
        if (p.damageCount <= 0) {
          damageErrors[0] = t('validation.required');
          valid = false;
        } else {
          for (let i = 0; i < p.damageCount; i++) {
            if (!p.damages?.[i]) {
              damageErrors[i] = t('validation.required');
              valid = false;
              console.error(`Product ${p.id}: Missing damage selection for damage ${i + 1}`);
            } else {
              const damage = category?.damages.find((d) => d.id === p.damages[i]);
              if (damage?.options?.length > 0) {
                const opt = p.damageDetails?.[`damage-${i}`]?.optionId;
                if (!opt) {
                  damageOptionErrors[i] = t('validation.required');
                  valid = false;
                  console.error(`Product ${p.id}: Missing damage option for damage ${i + 1} (${damage.name?.en || damage.id})`);
                }
              }
              if (damage?.markedOnPicture) {
                const pos = p.damageDetails?.[`damage-${i}`]?.position;
                if (!pos) {
                  markerError = t('validation.required');
                  valid = false;
                  console.error(`Product ${p.id}: Missing marker position for damage ${i + 1}`);
                }
              }
            }
          }
        }

        if (p.otherIssues && category) {
          Object.entries(p.otherIssues).forEach(([id, active]) => {
            if (active) {
              const defect = category.defects.find((d) => d.id === id);
              if (defect?.markedOnPicture) {
                const pos = p.defectDetails?.[id]?.position;
                if (!pos) {
                  markerError = t('validation.required');
                  valid = false;
                }
              }
            }
          });
        }

        return {
          ...p,
          damages: [...(p.damages || [])],
          damageDetails: { ...(p.damageDetails || {}) },
          otherIssues: { ...(p.otherIssues || {}) },
          defectDetails: { ...(p.defectDetails || {}) },
          typeError,
          damageErrors,
          damageOptionErrors,
          markerError,
        };
      })
    );

    // If validation passed, capture marked areas
    if (valid) {
      const updatedProducts = await Promise.all(
        products.map(async (product) => {
          const capturedData = await captureMarkedAreas(product);
          return {
            ...product,
            capturedMarkedAreas: capturedData
          };
        })
      );
      setProducts(updatedProducts);
      }

    return valid;
  };

  const validateOrderInfo = () => {
    const required = [
      'companyName',
      'ordererName',
      'phone',
      'email',
      'billingCompanyName',
      'billingStreet',
      'billingZipCode',
      'billingCity',
    ];
    const errors = {};
    required.forEach((key) => {
      if (!orderInfo[key]) errors[key] = t('validation.required');
    });
    if (!termsAccepted) errors.termsAccepted = t('validation.mustAccept');
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const captureMarkedAreas = async (product) => {
    if (!product.images?.front) return {};

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        // Debug: log image dimensions and positions
        console.log('DEBUG IMAGE CAPTURE:');
        console.log('Natural image size:', img.width, 'x', img.height);
        
        // Find the actual image element in DOM to get its displayed size
        const imageElements = document.querySelectorAll('.gv-image');
        let actualDisplayWidth = img.width;
        let actualDisplayHeight = img.height;
        
        if (imageElements.length > 0) {
          const firstImage = imageElements[0];
          const computedStyle = window.getComputedStyle(firstImage);
          const displayedRect = firstImage.getBoundingClientRect();
          
          console.log('Displayed image size:', displayedRect.width, 'x', displayedRect.height);
          console.log('CSS max-height:', computedStyle.maxHeight);
          console.log('CSS object-fit:', computedStyle.objectFit);
          
          actualDisplayWidth = displayedRect.width;
          actualDisplayHeight = displayedRect.height;
        }
        
        // Debug marker positions
        if (product.damageDetails) {
          Object.entries(product.damageDetails).forEach(([key, detail]) => {
            if (detail.position) {
              console.log(`Damage ${key} position:`, detail.position);
              console.log(`Calculated canvas position:`, 
                detail.position.x * img.width, 
                detail.position.y * img.height
              );
            }
          });
        }
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Calculate scale factor between displayed image and natural image
        const maxHeight = 250;
        let displayWidth, displayHeight, scaleFactor;
        
        if (img.height > maxHeight) {
          scaleFactor = maxHeight / img.height;
          displayHeight = maxHeight;
          displayWidth = img.width * scaleFactor;
        } else {
          displayWidth = img.width;
          displayHeight = img.height;
          scaleFactor = 1;
        }
        
        // Set canvas size to match natural image size
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw original image
        ctx.drawImage(img, 0, 0);
        
        // Collect all markers with proper ordering
        const markers = [];
        const damageMarkers = [];
        const defectMarkers = [];
        
        // Collect damage markers with their order - scale from displayed image to natural image
        if (product.damageDetails) {
          Object.entries(product.damageDetails).forEach(([damageKey, detail]) => {
            if (detail.position && detail.position.view !== 'whole') {
              const damageIndex = damageKey.replace('damage-', '');
              
              // Scale position from displayed image size to natural image size
              const scaleX = img.width / actualDisplayWidth;
              const scaleY = img.height / actualDisplayHeight;
              
              damageMarkers.push({
                x: detail.position.x * actualDisplayWidth * scaleX,
                y: detail.position.y * actualDisplayHeight * scaleY,
                type: 'damage',
                label: (detail.orderIndex || parseInt(damageIndex) + 1).toString(),
                order: detail.orderIndex || parseInt(damageIndex) + 1,
                id: `damage-${damageIndex}`
              });
            }
          });
        }
        
        // Collect defect markers - scale from displayed image to natural image
        if (product.defectDetails) {
          Object.entries(product.defectDetails).forEach(([defectId, detail]) => {
            if (detail.position && detail.position.view !== 'whole') {
              
              // Scale position from displayed image size to natural image size
              const scaleX = img.width / actualDisplayWidth;
              const scaleY = img.height / actualDisplayHeight;
              
              defectMarkers.push({
                x: detail.position.x * actualDisplayWidth * scaleX,
                y: detail.position.y * actualDisplayHeight * scaleY,
                type: 'defect',
                label: defectId.replace('_', ' '),
                order: detail.orderIndex || 999,
                id: `defect-${defectId}`
              });
            }
          });
        }
        
        // Sort by order and combine
        damageMarkers.sort((a, b) => a.order - b.order);
        defectMarkers.sort((a, b) => a.order - b.order);
        markers.push(...damageMarkers, ...defectMarkers);
        
                 // Draw markers - scale sizes to match displayed proportions
         markers.forEach(marker => {
           if (marker.type === 'damage') {
             // Draw damage marker (circle with number) - scale up for natural image size
             const radius = 15.6 / scaleFactor;
             const fontSize = Math.max(16 / scaleFactor, 16);
             
             ctx.fillStyle = '#16a34a';
             ctx.beginPath();
             ctx.arc(marker.x, marker.y, radius, 0, 2 * Math.PI);
             ctx.fill();
             
             // White border
             ctx.strokeStyle = '#FFFFFF';
             ctx.lineWidth = 2 / scaleFactor;
             ctx.stroke();
             
             ctx.fillStyle = '#FFFFFF';
             ctx.font = `bold ${fontSize}px Arial`;
             ctx.textAlign = 'center';
             ctx.textBaseline = 'middle';
             ctx.fillText(marker.label, marker.x, marker.y);
           } else {
             // Draw defect marker (rectangle with text) - scale up for natural image size
             const fontSize = Math.max(12 / scaleFactor, 12);
             ctx.font = `bold ${fontSize}px Arial`;
             const textWidth = ctx.measureText(marker.label).width + (16 / scaleFactor);
             const rectHeight = 20 / scaleFactor;
             
             ctx.fillStyle = '#0066CC';
             ctx.fillRect(marker.x - textWidth/2, marker.y - rectHeight/2, textWidth, rectHeight);
             
             ctx.fillStyle = '#FFFFFF';
             ctx.textAlign = 'center';
             ctx.textBaseline = 'middle';
             ctx.fillText(marker.label, marker.x, marker.y);
           }
         });
        
        // Optimize and compress image
        const optimizeImage = (sourceCanvas) => {
          // Target maximum dimensions for compression (smaller = less file size)
          const maxWidth = 400;
          const maxHeight = 300;
          
          let finalWidth = sourceCanvas.width;
          let finalHeight = sourceCanvas.height;
          
          // Calculate optimal size maintaining aspect ratio
          if (finalWidth > maxWidth || finalHeight > maxHeight) {
            const widthRatio = maxWidth / finalWidth;
            const heightRatio = maxHeight / finalHeight;
            const ratio = Math.min(widthRatio, heightRatio);
            
            finalWidth = Math.floor(finalWidth * ratio);
            finalHeight = Math.floor(finalHeight * ratio);
          }
          
          // Create optimized canvas
          const optimizedCanvas = document.createElement('canvas');
          const optimizedCtx = optimizedCanvas.getContext('2d');
          optimizedCanvas.width = finalWidth;
          optimizedCanvas.height = finalHeight;
          
          // Use high-quality scaling
          optimizedCtx.imageSmoothingEnabled = true;
          optimizedCtx.imageSmoothingQuality = 'high';
          
          // Draw resized image
          optimizedCtx.drawImage(sourceCanvas, 0, 0, finalWidth, finalHeight);
          
          // Convert to grayscale for additional compression
          const imageData = optimizedCtx.getImageData(0, 0, finalWidth, finalHeight);
          const data = imageData.data;
          for (let i = 0; i < data.length; i += 4) {
            const gray = Math.round(data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114);
            data[i] = gray;     // Red
            data[i + 1] = gray; // Green
            data[i + 2] = gray; // Blue
            // Alpha stays the same (data[i + 3])
          }
          optimizedCtx.putImageData(imageData, 0, 0);
          
          // Convert to JPEG with adaptive compression
          // Use lower quality for larger images to maintain smaller file sizes
          const pixelCount = finalWidth * finalHeight;
          let quality;
          
          if (pixelCount > 80000) {       // Large images (>280x285)
            quality = 0.6;                // 60% quality
          } else if (pixelCount > 40000) { // Medium images (>200x200)
            quality = 0.7;                // 70% quality  
          } else {                        // Small images
            quality = 0.8;                // 80% quality
          }
          
          console.log(`Image optimization: ${finalWidth}x${finalHeight} (${pixelCount} pixels) -> JPEG quality: ${Math.round(quality * 100)}%`);
          
          return optimizedCanvas.toDataURL('image/jpeg', quality);
        };
        
        const compressedImage = optimizeImage(canvas);
        resolve({ markedImage: compressedImage });
      };
      img.crossOrigin = 'anonymous';
      img.src = product.images.front;
    });
  };

  const nextStep = async () => {
    if (step === 0) {
      const isValid = await validateProducts();
      if (isValid) {
        setStep(1);
      }
    } else if (step === 1) {
      if (validateOrderInfo()) setStep(2);
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleOrderInfoChange = (field, value) => {
    setOrderInfo((prev) => ({ ...prev, [field]: value }));
  };

  const [completeOrderData, setCompleteOrderData] = useState(null);

  return step === 3 ? (
    <div ref={containerRef} className="order-form-container">
      <EmailPreviewStep
        orderInfo={completeOrderData?.orderInfo}
        products={completeOrderData?.products}
        prevStep={() => setStep(2)}
      />
    </div>
  ) : step === 2 ? (
    <div ref={containerRef} className="order-form-container">
      <ConfirmationStep
        resetForm={resetForm}
        products={products}
        orderInfo={orderInfo}
        onPreview={(orderData) => {
          setCompleteOrderData(orderData);
          setStep(3);
        }}
      />
    </div>
  ) : (
    <div ref={containerRef} className="order-form-inner">
      {step === 0 && (
        <ProductSelectionStep
          products={products}
          setProducts={setProducts}
          quantity={quantity}
          setQuantity={setQuantity}
          nextStep={nextStep}
        />
      )}
      {step === 1 && (
        <OrderInformationStep
          orderInfo={orderInfo}
          products={products}
          termsAccepted={termsAccepted}
          setTermsAccepted={setTermsAccepted}
          onChange={handleOrderInfoChange}
          onFieldBlur={onFieldBlur}
          prevStep={prevStep}
          nextStep={nextStep}
          touchedFields={touchedFields}
          validationErrors={validationErrors}
        />
      )}
    </div>
  );
}
