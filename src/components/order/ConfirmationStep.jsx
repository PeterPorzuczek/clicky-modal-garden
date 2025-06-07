import React from 'react';
import { DialogClose } from '../../ui/dialog.jsx';

export default function ConfirmationStep({ resetForm, products = [], discount = 0 }) {
  return (
    <div className="confirm-container">
      <div className="confirm-header">
        <h2 className="confirm-title">Tack för din beställning!</h2>
        <DialogClose className="confirm-close" />
      </div>
      <p className="confirm-text">
        Din beställning är nu mottagen och vi har skickat en bekräftelse till din e-postadress.
      </p>
      {discount > 0 && (
        <p className="confirm-discount">Du fick {discount}% rabatt på din order!</p>
      )}
      <p className="confirm-steps-intro">Följ stegen nedan för att förbereda dina plagg för reparation & återställning:</p>
      <ol className="confirm-list">
        <li>Mottag orderbekräftelse och medföljande plaggetikett (en per plagg) samt fraktsedel.</li>
        <li>Skriv ut plaggetikett och fraktsedel.</li>
        <li>Fäst plaggetiketter ordentligt på varje plagg. Dessa är viktiga för att koppla plagget till din beställning!</li>
        <li>Packa dina kläder i ett lämpligt paket.</li>
        <li>Klistra fast fraktsedeln på paketet.</li>
        <li>Skicka paketet enligt anvisningarna på fraktsedeln.</li>
      </ol>
      <div className="confirm-actions">
        <button
          type="button"
          onClick={resetForm}
          className="secondary-button"
        >
          Ytterligare beställning
        </button>
        <button
          type="button"
          onClick={() => window.close?.()}
          className="primary-button"
        >
          Stäng
        </button>
      </div>
    </div>
  );
}
