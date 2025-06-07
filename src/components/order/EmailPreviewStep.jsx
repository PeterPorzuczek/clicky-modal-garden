import React, { useMemo, useEffect, useState } from 'react';
import config from '../../setup/config.js';
import t, { localize } from '../../setup/i18n.js';
import { calculateSummary } from './PriceSummary.jsx';

export function generateEmailHtml(orderInfo = {}, products = []) {
  const { productTotals, subTotal, total } = calculateSummary(products);
  const et = config.emailTemplate || {};
  const l = localize;

  const productItemsHtml = productTotals
    .map((p) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
          <div style="font-weight: 600; color: #2D2E87; margin-bottom: 8px; font-size: 16px;">
            ${t('firstStep.product')} #${p.id}: ${p.type || '-'}
          </div>
          <div style="margin-left: 15px;">
            ${p.items
              .map(
                (item) => `
                  <div style="display: table; width: 100%; margin: 4px 0; padding: 2px 0; font-size: 14px;">
                    <span style="display: table-cell; color: #333;">${item.label}</span>
                    <span style="display: table-cell; text-align: right; color: #2D2E87; font-weight: 500;">${item.price} kr</span>
                  </div>`
              )
              .join('')}
            <div style="display: table; width: 100%; margin-top: 8px; padding-top: 8px; border-top: 1px solid #ddd; font-weight: 600; color: #2D2E87;">
              <span style="display: table-cell;">${t('firstStep.subtotal')}</span>
              <span style="display: table-cell; text-align: right;">${p.subtotal} kr</span>
            </div>
          </div>
        </td>
      </tr>`)
    .join('');

  const customerInfoRows = `
    <tr>
      <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
        <div style="display: table; width: 100%;">
          <span style="display: table-cell; font-weight: 500; color: #666;">${l(et.sections?.order_information?.fields?.customer_number) || 'Kundnummer'}:</span>
          <span style="display: table-cell; text-align: right; color: #333;">${orderInfo.customerNumber || '-'}</span>
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
        <div style="display: table; width: 100%;">
          <span style="display: table-cell; font-weight: 500; color: #666;">${l(et.sections?.order_information?.fields?.company_name) || 'Företagsnamn'}:</span>
          <span style="display: table-cell; text-align: right; color: #333;">${orderInfo.companyName || '-'}</span>
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
        <div style="display: table; width: 100%;">
          <span style="display: table-cell; font-weight: 500; color: #666;">${l(et.sections?.order_information?.fields?.orderer_name) || 'Beställarens namn'}:</span>
          <span style="display: table-cell; text-align: right; color: #333;">${orderInfo.ordererName || '-'}</span>
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
        <div style="display: table; width: 100%;">
          <span style="display: table-cell; font-weight: 500; color: #666;">${l(et.sections?.order_information?.fields?.phone) || 'Telefon'}:</span>
          <span style="display: table-cell; text-align: right; color: #333;">${orderInfo.phone || '-'}</span>
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
        <div style="display: table; width: 100%;">
          <span style="display: table-cell; font-weight: 500; color: #666;">${l(et.sections?.order_information?.fields?.email) || 'E-post'}:</span>
          <span style="display: table-cell; text-align: right; color: #333;">${orderInfo.email || '-'}</span>
        </div>
      </td>
    </tr>`;

  return `
    <!DOCTYPE html>
    <html lang="${l()}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${l(et.subject, 'Order Confirmation')}</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          line-height: 1.5;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #ffffff;
        }
        .container {
          max-width: 748px;
          margin: 0 auto;
          background-color: #ffffff;
        }
        .header {
          background-color: #ffffff;
          padding: 40px 50px 20px;
          text-align: left;
        }
        .logo {
          height: 50px;
          margin-bottom: 20px;
        }
        .main-header {
          background-color: #2D2E87;
          color: #ffffff;
          padding: 15px 50px;
          font-size: 20px;
          font-weight: 500;
          text-align: left;
        }
        .content {
          padding: 40px 50px;
          background-color: #ffffff;
        }
        .greeting {
          font-size: 16px;
          line-height: 1.6;
          color: #2D2E87;
          margin-bottom: 30px;
        }
        .section {
          margin-bottom: 30px;
        }
        .section-title {
          font-size: 16px;
          font-weight: 600;
          color: #2D2E87;
          margin-bottom: 15px;
          padding-bottom: 8px;
          border-bottom: 2px solid #2D2E87;
        }
        .table {
          width: 100%;
          border-collapse: collapse;
        }
        .table td {
          vertical-align: top;
        }
        .info-table td {
          padding: 8px 0;
          border-bottom: 1px solid #f0f0f0;
        }
        .summary-box {
          background-color: #f8f9fa;
          padding: 20px;
          margin-top: 25px;
          border-radius: 6px;
          border: 1px solid #e9ecef;
        }
        .summary-row {
          display: table;
          width: 100%;
          margin: 8px 0;
          font-size: 14px;
        }
        .total-row {
          border-top: 2px solid #2D2E87;
          padding-top: 12px;
          margin-top: 12px;
          font-weight: 700;
          font-size: 16px;
          color: #2D2E87;
        }
        .footer {
          background-color: #f8f9fa;
          padding: 30px 50px;
          text-align: center;
          color: #666666;
          font-size: 14px;
          line-height: 1.6;
        }
        .footer p {
          margin: 8px 0;
        }
        .disclaimer {
          font-size: 12px;
          color: #999999;
          margin-top: 15px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header with Logo -->
        <div class="header">

        </div>

        <!-- Main Header -->
        <div class="main-header">
          ${l(et.header, 'Orderbekräftelse')}
        </div>

        <!-- Content -->
        <div class="content">
          <div class="greeting">
            ${l(et.greeting, 'Tack för din beställning!')}
          </div>

          <!-- Order Details -->
          <div class="section">
            <div class="section-title">${l(et.sections?.order_information?.title) || 'Beställningsinformation'}</div>
            <table class="table info-table">
              ${customerInfoRows}
            </table>
          </div>

          <!-- Billing Address -->
          <div class="section">
            <div class="section-title">${l(et.sections?.billing_address?.title) || 'Fakturaadress'}</div>
            <table class="table info-table">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                  <div style="display: table; width: 100%;">
                    <span style="display: table-cell; font-weight: 500; color: #666;">${l(et.sections?.billing_address?.fields?.company_name) || 'Företagsnamn'}:</span>
                    <span style="display: table-cell; text-align: right; color: #333;">${orderInfo.billingCompanyName || '-'}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                  <div style="display: table; width: 100%;">
                    <span style="display: table-cell; font-weight: 500; color: #666;">${l(et.sections?.billing_address?.fields?.street_address) || 'Gatuadress'}:</span>
                    <span style="display: table-cell; text-align: right; color: #333;">${orderInfo.billingStreet || '-'}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                  <div style="display: table; width: 100%;">
                    <span style="display: table-cell; font-weight: 500; color: #666;">${l(et.sections?.billing_address?.fields?.postal_code) || 'Postnummer'}:</span>
                    <span style="display: table-cell; text-align: right; color: #333;">${orderInfo.billingZipCode || '-'}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                  <div style="display: table; width: 100%;">
                    <span style="display: table-cell; font-weight: 500; color: #666;">${l(et.sections?.billing_address?.fields?.city) || 'Ort'}:</span>
                    <span style="display: table-cell; text-align: right; color: #333;">${orderInfo.billingCity || '-'}</span>
                  </div>
                </td>
              </tr>
            </table>
          </div>

          <!-- Pickup Address -->
          <div class="section">
            <div class="section-title">${l(et.sections?.pickup_address?.title) || 'Hämtadress'}</div>
            <table class="table info-table">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                  <div style="display: table; width: 100%;">
                    <span style="display: table-cell; font-weight: 500; color: #666;">${l(et.sections?.pickup_address?.fields?.company_name) || 'Företagsnamn'}:</span>
                    <span style="display: table-cell; text-align: right; color: #333;">${orderInfo.pickupCompanyName || '-'}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                  <div style="display: table; width: 100%;">
                    <span style="display: table-cell; font-weight: 500; color: #666;">${l(et.sections?.pickup_address?.fields?.street_address) || 'Gatuadress'}:</span>
                    <span style="display: table-cell; text-align: right; color: #333;">${orderInfo.pickupStreet || '-'}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                  <div style="display: table; width: 100%;">
                    <span style="display: table-cell; font-weight: 500; color: #666;">${l(et.sections?.pickup_address?.fields?.postal_code) || 'Postnummer'}:</span>
                    <span style="display: table-cell; text-align: right; color: #333;">${orderInfo.pickupZipCode || '-'}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                  <div style="display: table; width: 100%;">
                    <span style="display: table-cell; font-weight: 500; color: #666;">${l(et.sections?.pickup_address?.fields?.city) || 'Ort'}:</span>
                    <span style="display: table-cell; text-align: right; color: #333;">${orderInfo.pickupCity || '-'}</span>
                  </div>
                </td>
              </tr>
            </table>
          </div>

          ${!orderInfo.usePickupAddressForDelivery ? `
          <!-- Delivery Address -->
          <div class="section">
            <div class="section-title">${l(et.sections?.delivery_address?.title) || 'Leveransadress'}</div>
            <table class="table info-table">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                  <div style="display: table; width: 100%;">
                    <span style="display: table-cell; font-weight: 500; color: #666;">${l(et.sections?.delivery_address?.fields?.company_name) || 'Företagsnamn'}:</span>
                    <span style="display: table-cell; text-align: right; color: #333;">${orderInfo.deliveryCompanyName || '-'}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                  <div style="display: table; width: 100%;">
                    <span style="display: table-cell; font-weight: 500; color: #666;">${l(et.sections?.delivery_address?.fields?.street_address) || 'Gatuadress'}:</span>
                    <span style="display: table-cell; text-align: right; color: #333;">${orderInfo.deliveryStreet || '-'}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                  <div style="display: table; width: 100%;">
                    <span style="display: table-cell; font-weight: 500; color: #666;">${l(et.sections?.delivery_address?.fields?.postal_code) || 'Postnummer'}:</span>
                    <span style="display: table-cell; text-align: right; color: #333;">${orderInfo.deliveryZipCode || '-'}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                  <div style="display: table; width: 100%;">
                    <span style="display: table-cell; font-weight: 500; color: #666;">${l(et.sections?.delivery_address?.fields?.city) || 'Ort'}:</span>
                    <span style="display: table-cell; text-align: right; color: #333;">${orderInfo.deliveryCity || '-'}</span>
                  </div>
                </td>
              </tr>
            </table>
          </div>` : ''}

          <!-- Products -->
          <div class="section">
            <div class="section-title">${l(et.sections?.products?.title) || 'Beställda produkter'}</div>
            <table class="table">
              ${productItemsHtml}
            </table>

            <!-- Summary -->
            <div class="summary-box">
              <div class="summary-row">
                <span style="display: table-cell;">${t('firstStep.subtotal')}</span>
                <span style="display: table-cell; text-align: right;">${subTotal} kr</span>
              </div>
              <div class="summary-row total-row">
                <span style="display: table-cell;">${t('firstStep.total')}</span>
                <span style="display: table-cell; text-align: right;">${total} kr</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <p>${l(et.footer, 'Tack för att du valde vår tjänst!')}</p>
          <div class="disclaimer">
            ${l(et.disclaimer, 'Detta är ett automatiskt meddelande. Vänligen svara inte på detta e-postmeddelande.')}
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

export default function EmailPreviewStep({ orderInfo, products, prevStep }) {
  const [appState, setAppState] = useState({
    orderInfo: orderInfo || {},
    products: products || []
  });

  useEffect(() => {
    // Try to get state from props first, then from window object, then use fallback test data
    let finalOrderInfo = orderInfo;
    let finalProducts = products;

    // Check window object for application state
    if ((!orderInfo || Object.keys(orderInfo).length === 0) && 
        (!products || products.length === 0) && 
        window.appOrderState) {
      finalOrderInfo = window.appOrderState.orderInfo || {};
      finalProducts = window.appOrderState.products || [];
    }

    // Fallback test data for demonstration
    if ((!finalOrderInfo || Object.keys(finalOrderInfo).length === 0) && 
        (!finalProducts || finalProducts.length === 0)) {
      finalOrderInfo = {
        customerNumber: '5124996',
        companyName: 'Lyreco Sverige AB',
        ordererName: 'Marcus',
        phone: '0720347999',
        email: 'Marcus.svanstrom@lyreco.com',
        billingCompanyName: 'Lyreco Sverige AB',
        billingStreet: 'Datavägen 3',
        billingZipCode: '411 20',
        billingCity: 'Sisjön',
        pickupCompanyName: 'Lyreco Sverige AB',
        pickupStreet: 'Datavägen 3',
        pickupZipCode: '411 20',
        pickupCity: 'Sisjön',
        usePickupAddressForDelivery: true
      };
      
      finalProducts = [
        {
          id: 1,
          type: 'Byxa',
          artikelNumber: '12025325',
          lagningsId: 'L12906',
          damages: [
            { label: 'Hål', price: 120 },
            { label: 'Hål', price: 120 }
          ],
          defects: [
            { label: 'Bad smell', price: 60 }
          ],
          subtotal: 300
        },
        {
          id: 2,
          type: 'Väst',
          artikelNumber: '12025325',
          lagningsId: 'L12908',
          damages: [
            { label: 'Hål', price: 100 }
          ],
          defects: [],
          subtotal: 100
        }
      ];
    }

    setAppState({
      orderInfo: finalOrderInfo,
      products: finalProducts
    });

    // Store in window object for other components to access
    if (!window.appOrderState) {
      window.appOrderState = {
        orderInfo: finalOrderInfo,
        products: finalProducts
      };
    }
  }, [orderInfo, products]);

  const emailHtml = useMemo(() => generateEmailHtml(appState.orderInfo, appState.products), [appState.orderInfo, appState.products]);

  const handleSendEmail = () => {
    // TODO: Implement email sending with emailjs
    console.log('Sending email...', { 
      orderInfo: appState.orderInfo, 
      products: appState.products, 
      emailHtml 
    });
    alert('Email functionality will be implemented next!');
  };

  return (
    <div className="email-preview-container">
      <div className="email-preview-content">
        <div dangerouslySetInnerHTML={{ __html: emailHtml }} />
      </div>
      
      <div className="email-actions">
        <button type="button" onClick={prevStep} className="secondary-button">
          {t('fifthStep.back')}
        </button>
        <button type="button" onClick={handleSendEmail} className="primary-button">
          {t('fifthStep.sendEmail')}
        </button>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
        .email-preview-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          background-color: #f8f9fa;
          min-height: 100vh;
        }
        
        .email-preview-header {
          text-align: center;
          margin-bottom: 2rem;
          padding: 1rem;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .email-preview-header h2 {
          margin: 0 0 0.5rem;
          color: #262E85;
          font-size: 1.5rem;
        }
        
        .email-preview-header p {
          margin: 0;
          color: #666;
          font-size: 0.9rem;
        }
        
        .email-preview-content {
          background-color: white;
          border-radius: 8px;
          padding: 2rem;
          margin-bottom: 2rem;
          border: 1px solid #e5e7eb;
          width: 100%;
        }
        
        .email-actions {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          padding: 1rem;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .secondary-button {
          width: 100%;
          background-color: white;
          color: #262E85;
          border: 1px solid #262E85;
          border-radius: 9999px;
          height: 3rem;
          transition: background-color 0.2s;
        }
        .secondary-button:hover {
          background-color: #f9fafb;
        }
        

        .primary-button {
          width: 100%;
          border-radius: 9999px;
          height: 3rem;
          background-color: #262E85;
          color: white;
          transition: background-color 0.2s;
          border: none;
        }

        .primary-button:hover {
          background-color: #1e2566;
        }
        
        @media (max-width: 768px) {
          .email-preview-container {
            padding: 1rem;
          }
          
          .email-preview-content {
            padding: 1rem;
          }
          
          .email-actions {
            flex-direction: column;
          }
          
          .secondary-button,
          .primary-button {
            width: 100%;
            text-align: center;
          }
        }
        `
      }} />
    </div>
  );
}
