import React, { useEffect, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';

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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        {children}
      </div>
    </DialogContext.Provider>,
    document.body
  );
}

export function DialogContent({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>{children}</div>
  );
}

export const DialogTitle = ({ children, className = '' }) => (
  <h2 className={`text-xl font-bold ${className}`}>{children}</h2>
);

export const DialogDescription = ({ children, className = '' }) => (
  <p className={`text-gray-600 ${className}`}>{children}</p>
);

export const DialogClose = ({ className = '', ...props }) => {
  const ctx = useContext(DialogContext);
  return (
    <button
      aria-label="Close"
      className={`text-gray-500 hover:text-gray-900 ${className}`}
      onClick={() => ctx?.onOpenChange(false)}
      {...props}
    >
      ✕
    </button>
  );
};
