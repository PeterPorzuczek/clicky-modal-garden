import React from 'react';

const PRICE_PER_ITEM = 50;

export default function PriceSummary({ products = [], discount = 0 }) {
  const productTotals = products.map(p => {
    const damages = p.damageCount || 0;
    const subtotal = damages * PRICE_PER_ITEM;
    return { id: p.id, type: p.type, subtotal };
  });

  const subTotal = productTotals.reduce((sum, p) => sum + p.subtotal, 0);
  const discountAmount = Math.round(subTotal * (discount / 100));
  const total = subTotal - discountAmount;

  return (
    <div className="space-y-4">
      {productTotals.map(p => (
        <div key={p.id} className="border border-gray-200 rounded-md p-3 bg-white/0">
          <div className="font-medium border-b pb-2 mb-2">Produkt #{p.id}: {p.type || '-'}</div>
          <div className="flex justify-between text-sm">
            <span>Skador</span>
            <span>{PRICE_PER_ITEM} kr</span>
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
        <span>Totalt</span>
        <span>{total} kr</span>
      </div>
    </div>
  );
}
