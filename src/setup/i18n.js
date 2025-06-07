import config from './config.js';

let CURRENT_LANGUAGE = 'se';

export function setLanguage(language) {
  CURRENT_LANGUAGE = language;
}

export function getCurrentLanguage() {
  return CURRENT_LANGUAGE;
}

export function t(path) {
  const parts = path.split('.');
  let obj = config.texts;
  for (const part of parts) {
    obj = obj?.[part];
    if (obj === undefined) return path;
  }
  if (typeof obj === 'string') return obj;
  return obj?.[CURRENT_LANGUAGE] || obj?.se || obj?.en || '';
}

export function localize(obj) {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  // Handle both 'se' and 'sv' for Swedish to ensure compatibility
  return obj[CURRENT_LANGUAGE] || obj.se || obj.en || '';
}

export function getDamageLabel(productType, id) {
  const category = config.productCategories.find((c) => c.id === productType);
  const damage = category?.damages.find((d) => d.id === id);
  return damage ? localize(damage.name) : id;
}

export function getDefectLabel(productType, id) {
  const category = config.productCategories.find((c) => c.id === productType);
  const defect = category?.defects.find((d) => d.id === id);
  return defect ? localize(defect.name) : id;
}

export default t; 