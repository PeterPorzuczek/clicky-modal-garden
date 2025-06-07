import config from './config.js';

const LANGUAGE = 'se';

export function t(path) {
  const parts = path.split('.');
  let obj = config.texts;
  for (const part of parts) {
    obj = obj?.[part];
    if (obj === undefined) return path;
  }
  if (typeof obj === 'string') return obj;
  return obj?.[LANGUAGE] || obj?.sv || obj?.se || obj?.en || '';
}

export function localize(obj) {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[LANGUAGE] || obj.sv || obj.se || obj.en || '';
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
