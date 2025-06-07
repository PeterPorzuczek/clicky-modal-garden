import React from 'react';
import { DialogClose } from '../../ui/dialog.jsx';

export default function ConfirmationStep({ resetForm, products = [], discount = 0 }) {
  return (
    <div className="p-8 flex flex-col items-center space-y-4">
      <div className="flex items-center w-full mb-2">
        <h2 className="text-2xl font-bold text-center flex-1">Tack för din beställning!</h2>
        <DialogClose className="text-xl" />
      </div>
      <p className="text-center text-gray-700 mb-4">
        Din beställning är nu mottagen och vi har skickat en bekräftelse till din e-postadress.
      </p>
      {discount > 0 && (
        <p className="text-center text-green-600 font-medium mb-4">Du fick {discount}% rabatt på din order!</p>
      )}
      <p className="mb-3">Följ stegen nedan för att förbereda dina plagg för reparation & återställning:</p>
      <ol className="space-y-3 list-decimal pl-5 mb-6 w-full text-left">
        <li>Mottag orderbekräftelse och medföljande plaggetikett (en per plagg) samt fraktsedel.</li>
        <li>Skriv ut plaggetikett och fraktsedel.</li>
        <li>Fäst plaggetiketter ordentligt på varje plagg. Dessa är viktiga för att koppla plagget till din beställning!</li>
        <li>Packa dina kläder i ett lämpligt paket.</li>
        <li>Klistra fast fraktsedeln på paketet.</li>
        <li>Skicka paketet enligt anvisningarna på fraktsedeln.</li>
      </ol>
      <div className="w-full space-y-4 mt-4">
        <button
          type="button"
          onClick={resetForm}
          className="w-full bg-white text-[#262E85] border border-[#262E85] hover:bg-gray-50 rounded-full h-12"
        >
          Ytterligare beställning
        </button>
        <button
          type="button"
          onClick={() => window.close?.()}
          className="w-full bg-[#262E85] text-white hover:bg-[#1e2566] rounded-full h-12"
        >
          Stäng
        </button>
      </div>
    </div>
  );
}
