App should work like this:
1. Show panel with amount of products (by increasing number there will be more forms)
  a. for each product we choose product type (we have products for upper body [Jacket, Sweater, T-shirt/Polo] and lower body [Pants-Skirt called bottom] and shoes) (Maximum 20.)
  b. after product choosing we have more options to fill, we choose how many defects we have.
    I. we choose NUMBER of main DEFECTS:
      - T-shirt/Polo: Tear (16cm+ Sewing repair; Max 15cm Sewing repair; Max 15cm Patch); Elastic replacement; Button replacement (2-4 pcs; 3 pcs);
      - Sweater: Zipper replacement (Long Original 25-90 cm; Long Basic replacement 25-90 cm; Short Original Max. 25 cm; Short Basic replacement Max. 25 cm); Velcro replacement; Tear (16cm+ Sewing repair; Max 15cm Sewing repair; Max 15cm Patch); Elastic replacement; Button replacement (2-4 pcs; 2 pcs);
      - Jacket: Zipper replacement (Long Original 25-90 cm; Long Basic replacement 25-90 cm; Short Original Max. 25 cm; Short Basic replacement Max. 25 cm); Velcro replacement; Tear Large (16cm+ Sewing repair); Tear (Max 15cm Sewing repair; Max 15cm Patch); Elastic replacement; Button replacement (2-4 pcs; 4 pcs);
      - Bottom: Zipper replacement (Long Original 25-90 cm; Long Basic replacement 25-90 cm; Short Original Max. 25 cm; Short Basic replacement Max. 25 cm); Velcro replacement; Tear (Max 15cm Sewing repair; Max 15cm Patch); Fly replacement (Original; Basic replacement); Elastic replacement; Button replacement (2-4 pcs; 1 pcs); Tear Large (16cm+ Sewing repair);
      - Shoes: Repair, Washing & Recovering (incl. odor removal);

    II. we choose other general DAMAGES (checkboxes to check)
      - T-shirt/Polo: Wash tough stains (asphalt, oil, blood); Pilling; Wash and Refresh (including odor removal);
      - Sweater: Wash+Water repellent treatment; Wash tough stains (asphalt, oil, blood); Wash and Refresh (including odor removal); Pilling;
      - Jacket: Wash tough stains (asphalt, oil, blood); Wash and Refresh (including odor removal); Pilling;
      - Bottom: Wash tough stains (asphalt, oil, blood); Wash and Refresh (including odor removal); Pilling;
      - Shoes: Wash and Refresh (including odor removal);
  c. for each main defect we place mark on the image - it is required to put mark.
  d. we have optional checkbox for each garmet "Garments belong to the employee", after choosing
    I. we provide name in one field
    II we provige department in second field
  e. On bottom each product based on the defects has price which should be counted and displayed
    I. prices are choosen based on total amount of products added, we have prices for 1 product, 2 products, 3 products, 4-5 products, 6-10 products.
    II. all prices for each product should be summed up to have total count for repair order
  f. on next screen we fill this:
    - Kundnummer (customer number, read-only)
    - Företagsnamn* (company name, required)
    - Namn på beställare* (orderer’s name, required)
    - Telefon* (phone number, required)
    - E-post* (email, required)
    - Faktureringsadress – Företagsnamn* (billing company name, required)
    - Faktureringsadress – Gatuadress* (billing street address, required)
    - Faktureringsadress – Postnummer* (billing postal code, required)
    - Faktureringsadress – Ort* (billing city, required)
    - Upphämtningsadress – Samma som faktureringsadress (same as billing address, checkbox)
    - Upphämtningsadress – Företagsnamn* (pickup company name, required if not same as billing)
    - Upphämtningsadress – Gatuadress* (pickup street address, required if not same as billing)
    - Upphämtningsadress – Postnummer* (pickup postal code, required if not same as billing)
    - Upphämtningsadress – Ort* (pickup city, required if not same as billing)
    - Leveransadress – Samma som upphämtningsadress (same as pickup address, checkbox)
    - Leveransadress – Företagsnamn* (delivery company name, required if not same as pickup)
    - Leveransadress – Gatuadress* (delivery street address, required if not same as pickup)
    - Leveransadress – Postnummer* (delivery postal code, required if not same as pickup)
    - Leveransadress – Ort* (delivery city, required if not same as pickup)
    - Produktinformation (product and service summary, auto-filled)
    - Delsumma (subtotal, auto-calculated)
    - Totalt (total, auto-calculated)
    - Jag accepterar att arbetskläder lagade enligt villkoren från* (accept terms, checkbox, required)
  g. Skicka (submit button)
  h. We send all the data in object - marks choosen on pictures should be saved to base64 and send also as data in fields.
  j. last screen shows up that:
    - Confirms that the order has been received and a confirmation email has been sent.
    - Provides the user with clear, step-by-step instructions on what to do next.
    - Informs the user about any applicable promotions (e.g., order discount).
    - Lists the actions needed to prepare and ship the clothes (print labels, pack, ship).
    - Allows the user to place an additional order with one click.
    - Allows the user to close the window and finish the process.

> mocukup.png explains the initial idea.

Data Structure Map - Clothing Repair Application

Main Structure
📦 productCategories[]
└── 🔸 ProductCategory
    ├── 🆔 id (string)
    ├── 📝 articleNumber (string, empty)
    ├── 🌐 name { en, sv, no }
    ├── 💥 damages[]
    └── 🔧 defects[]

Product Category Details
🔸 ProductCategory
├── 🆔 id: "tshirt_polo" | "sweater" | "jacket" | "bottom" | "shoes"
├── 📝 articleNumber: "" (empty, reserved for future use)
├── 🌐 name: { en: "English", sv: "Svenska", no: "Norsk" }
├── 💥 damages[] (physical damage requiring repair)
└── 🔧 defects[] (cleaning/maintenance - independent of damages)

Damage Structure
💥 Damage
├── 🆔 id: "tear" | "zipper_replacement" | "velcro_replacement" | "fly_replacement" | "tear_large" | etc.
├── 🌐 name: { en, sv, no }
├── 📸 picturesToBeMarked: [image_urls] (4 URLs or empty array)
├── ✅ markedOnPicture: boolean
├── ⚙️ options[] (repair variations - optional)
└── 💰 pricing: { 1, 2, 3, 5, 10 } (when no options exist)

Option Structure (Repair Variations)
⚙️ Option
├── 🆔 id: "large_sewing" | "small_patch" | "long_original" | "basic_replacement" | etc.
├── 🌐 name: { en, sv, no }
├── 📄 description: { en, sv, no } (usually empty)
└── 💰 pricing: { 1, 2, 3, 5, 10 } (prices for different quantities)

Defect Structure (Cleaning/Maintenance)
🔧 Defect
├── 🆔 id: "wash_tough_stains" | "pilling" | "wash_and_refresh" | "wash_water_repellent"
├── 🌐 name: { en, sv, no }
├── 📄 description: { en, sv, no } (usually empty)
└── 💰 pricing: { 1, 2, 3, 5, 10 }

Image Logic (picturesToBeMarked)
📸 Image Assignment Rules:

🔝 Upper Body Categories (T-shirt, Sweater, Jacket):
├── Tear, Elastic, Button damages → 4 generic upper body images
└── Zipper, Velcro damages → 4 specialized zipper images

🔽 Lower Body Categories (Bottom):
├── Tear, Button, Elastic damages → 4 generic upper body images  
└── Zipper, Velcro, Fly damages → 4 specialized zipper images

👟 Shoes:
└── All damages → 4 generic upper body images

📸 Image URLs in file:
├── Generic: imgur.com/FpqlbPM.png, /hkczXk3.png, /CCrkCn8.png, /5p3Oo6l.png
└── Zipper: imgur.com/k2aFvbe.png, /MsxNBla.png, /PCg8ijN.png, /JQ6YDAU.jpeg

Example Data Flow
👤 User selects:
├── 🔸 Product: "T-shirt/Polo"
├── 💥 Damage: "Tear" 
│   ├── ⚙️ Option: "Max 15cm (Patch)" 
│   └── 📸 Marks area on 4 upper body images
├── 🔧 Defect: "Pilling" (optional)
└── 💰 Price: calculated based on total selected items (1-10 scale)

Example Products and Their Specialties
👕 T-shirt/Polo: 3 damages, 3 defects
├── Tear (3 options), Elastic replacement, Button replacement (2 options)
└── Wash tough stains, Pilling, Wash & refresh
👔 Sweater: 5 damages, 4 defects
├── Zipper (4 options), Velcro, Tear (3 options), Elastic, Button (2 options)
└── Wash+Water repellent, Wash tough stains, Wash & refresh, Pilling
🧥 Jacket: 6 damages, 3 defects
├── Zipper (4 options), Velcro, Tear Large, Tear (2 options), Elastic, Button (2 options)
└── Wash tough stains, Wash & refresh, Pilling
👖 Bottom: 7 damages, 3 defects
├── Zipper (4 options), Velcro, Tear (2 options), Fly (2 options), Elastic, Button (2 options), Tear Large
└── Wash tough stains, Pilling, Wash & refresh
👟 Shoes: 1 damage, 1 defect
├── Repair, Washing & Recovering (Full service)
└── Wash & refresh

Key Business Rules
✅ ALLOWED:

Select one or more damages
Each damage can have different repair options
Select zero or more defects (independent of damages)
Combine damages + defects freely

❌ REQUIREMENTS:

Damages with markedOnPicture: true require area marking
Each option has price scaled by number of problems (1-10)
All text must be in 3 languages (en, sv, no)