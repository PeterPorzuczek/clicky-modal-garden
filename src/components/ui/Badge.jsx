import React from 'react';
import '../../ui.css';

const VARIANTS = {
  default: 'badge-default',
  secondary: 'badge-secondary',
  destructive: 'badge-destructive',
  outline: 'badge-outline',
};

export default function Badge({ variant = 'default', className = '', ...props }) {
  const classes = ['badge', VARIANTS[variant], className]
    .filter(Boolean)
    .join(' ');

  return <div className={classes} {...props} />;
}
