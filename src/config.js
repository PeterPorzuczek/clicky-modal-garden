// Central place for runtime configuration used across the UI.
// Using the `with` import attribute keeps Node and Vite happy
// when loading JSON as a module.
import config from '../.mvp/config.json' with { type: 'json' };
export default config;
