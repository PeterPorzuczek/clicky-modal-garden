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

export default t;
