const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Read the bundled components file
let raw = fs.readFileSync(path.join('assets', 'COMPONENTS.JS'), 'utf8');
// Prepend comment start so prettier can parse
raw = '/*' + raw;
fs.writeFileSync('tmp_components.js', raw);
// Format using prettier to make parsing easier
execSync('npx prettier tmp_components.js > tmp_components_pretty.js');
const content = fs.readFileSync('tmp_components_pretty.js', 'utf8');

const components = {};
let current = null;
content.split(/\n/).forEach(line => {
  const m = line.match(/"data-component-path":\s*"(src[^\"]+)"/);
  if (m) {
    current = m[1];
    if (!components[current]) components[current] = [];
  }
  if (current) {
    components[current].push(line);
  }
});

Object.entries(components).forEach(([file, lines]) => {
  const target = path.join('src', file.replace(/^src\//, '').replace(/\.tsx$/, '.js'));
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, lines.join('\n'));
});

console.log('Extracted', Object.keys(components).length, 'components');
