import React, { useEffect, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import '../../../styles/ui.css';

const DialogContext = createContext(null);

export function Dialog({ open, onOpenChange, children }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    if (open) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onOpenChange]);

  if (!open) return null;
  return createPortal(
    <DialogContext.Provider value={{ onOpenChange }}>
      <div className="dialog-overlay">{children}</div>
    </DialogContext.Provider>,
    document.body
  );
}

export function DialogContent({ children, className = '' }) {
  return <div className={`dialog-window ${className}`}>{children}</div>;
}

export const DialogTitle = ({ children, className = '' }) => (
  <h2 className={`dialog-title ${className}`}>{children}</h2>
);

export const DialogDescription = ({ children, className = '' }) => (
  <p className={`dialog-description ${className}`}>{children}</p>
);

export const DialogClose = ({ className = '', ...props }) => {
  const ctx = useContext(DialogContext);
  return (
    <button
      aria-label="Close"
      className={`dialog-close ${className}`}
      onClick={() => ctx?.onOpenChange(false)}
      {...props}
    >
      ✕
    </button>
  );
}; 