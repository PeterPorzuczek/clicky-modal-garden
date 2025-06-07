import React from 'react';

export const Badge = ({ variant = 'default', className = '', children, ...props }) => {
  const baseClasses = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium';
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    secondary: 'bg-gray-100 text-gray-800 border border-gray-300',
    destructive: 'bg-red-100 text-red-800',
    outline: 'border border-gray-300 bg-transparent text-gray-600',
  };

  return (
    <span 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}; 