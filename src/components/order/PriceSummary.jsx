import React from 'react';
import config from '../../config.js';
import t, { localize } from '../../i18n.js';

const getPrice = (pricing = {}, count) => {
  if (count >= 6) return pricing['10'] || 0;
  if (count >= 4) return pricing['5'] || 0;
  if (count === 3) return pricing['3'] || 0;
  if (count === 2) return pricing['2'] || 0;
  return pricing['1'] || 0;
};

export function calculateSummary(products = [], discount = 0) {
  const productTotals = products.map((p) => {
    const category = config.productCategories.find((c) => c.id === p.type);
    let subtotal = 0;
    const items = [];
    if (category) {
      p.damages?.forEach((damageId, idx) => {
        const damage = category.damages.find((d) => d.id === damageId);
        if (damage) {
          const optionId = p.damageDetails?.[`damage-${idx}`]?.optionId;
          const option = optionId ? damage.options.find((o) => o.id === optionId) : damage;
          if (option) {
            const price = getPrice(option.pricing, products.length);
            subtotal += price;
            items.push({ label: localize(option.name), price });
          }
        }
      });
      Object.entries(p.otherIssues || {}).forEach(([id, active]) => {
        if (active) {
          const defect = category.defects.find((d) => d.id === id);
          if (defect) {
            const price = getPrice(defect.pricing, products.length);
            subtotal += price;
            items.push({ label: localize(defect.name), price });
          }
        }
      });
    }
    return { id: p.id, type: localize(category?.name) || p.type, subtotal, items };
  });

  const subTotal = productTotals.reduce((sum, p) => sum + p.subtotal, 0);
  const discountAmount = Math.round(subTotal * (discount / 100));
  const total = subTotal - discountAmount;

  return { productTotals, subTotal, discountAmount, total };
}

export default function PriceSummary({ products = [], discount = 0 }) {
  const { productTotals, subTotal, discountAmount, total } =
    calculateSummary(products, discount);

  return (
    <div className="space-y-4">
      {productTotals.map((p) => (
        <div key={p.id} className="border border-gray-200 rounded-md p-3 bg-white/0">
          <div className="font-medium border-b pb-2 mb-2">Produkt #{p.id}: {p.type || '-'}</div>
          <div className="space-y-1 text-sm">
            {p.items.map((item, idx) => (
              <div key={idx} className="flex justify-between">
                <span>{item.label}</span>
                <span>{item.price} kr</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-medium mt-2 pt-2 border-t border-gray-200">
            <span>Delsumma</span>
            <span>{p.subtotal} kr</span>
          </div>
        </div>
      ))}
      <div className="flex justify-between font-medium pt-2 mt-2 border-t border-gray-300">
        <span>Delsumma</span>
        <span>{subTotal} kr</span>
      </div>
      {discount > 0 && (
        <div className="flex justify-between text-green-600 font-medium">
          <span>Rabatt ({discount}%)</span>
          <span>-{discountAmount} kr</span>
        </div>
      )}
      <div className="flex justify-between font-bold text-lg pt-2 mt-2 border-t border-gray-300">
        <span>{t('firstStep.total')}</span>
        <span>{total} kr</span>
      </div>
    </div>
  );
}
