import React from 'react';

// Available garment options. These are more fine grained than the
// categories used internally when displaying the garment images.
// "Undertröja", "Tröja" and "Ytterplagg" should all be treated as
// upper body garments, "Nederdel" as a lower body garment and
// "Skor" represents footwear.
const OPTIONS = [
  { value: 'undertröja', label: 'Undertröja' },
  { value: 'tröja', label: 'Tröja' },
  { value: 'ytterplagg', label: 'Ytterplagg' },
  { value: 'nederdel', label: 'Nederdel' },
  { value: 'skor', label: 'Skor' },
];

export default function ProductTypeSelector({ productType, onTypeChange, onOpenChange, error }) {
  const handleChange = (e) => {
    onTypeChange && onTypeChange(e.target.value);
    onOpenChange && onOpenChange(false);
  };

  return (
    <div className="space-y-2">
      <label className="font-medium">Välj typ av produkt <span className="text-red-500">*</span></label>
      <select
        className={`w-full h-10 rounded border px-3 ${error ? 'border-red-500' : ''}`}
        value={productType || ''}
        onChange={handleChange}
      >
        <option value="" disabled>Välj</option>
        {OPTIONS.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
