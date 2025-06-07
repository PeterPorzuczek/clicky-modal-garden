import React from 'react';
import { DialogClose } from './ui/Dialog.jsx';
import t from '../../setup/i18n.js';

export default function ConfirmationStep({ resetForm, products = [], discount = 0 }) {
  return (
    <div className="confirm-container">
      <div className="confirm-header">
        <h2 className="confirm-title">{t('fourthStep.thankYouTitle')}</h2>
        <DialogClose className="confirm-close" />
      </div>
      <p className="confirm-text">
        {t('fourthStep.orderReceivedMsg')}
      </p>
      {discount > 0 && (
        <p className="confirm-discount">{t('fourthStep.discountMsg').replace('{discount}', discount)}</p>
      )}
      <p className="confirm-steps-intro">{t('fourthStep.instructionsTitle')}</p>
      <ol className="confirm-list">
        <li>{t('fourthStep.step1')}</li>
        <li>{t('fourthStep.step2')}</li>
        <li>{t('fourthStep.step3')}</li>
        <li>{t('fourthStep.step4')}</li>
        <li>{t('fourthStep.step5')}</li>
        <li>{t('fourthStep.step6')}</li>
      </ol>
      <div className="confirm-actions">
        <button
          type="button"
          onClick={resetForm}
          className="secondary-button"
        >
          {t('fourthStep.additionalOrder')}
        </button>
        <button
          type="button"
          onClick={() => window.close?.()}
          className="primary-button"
        >
          {t('fourthStep.close')}
        </button>
      </div>
    </div>
  );
}
