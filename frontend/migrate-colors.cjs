const fs = require('fs');
const twConfigPath = './tailwind.config.js';
const stylePath = './src/style.css';

let twConfig = fs.readFileSync(twConfigPath, 'utf8');

const colorsMatch = twConfig.match(/colors:\s*\{([\s\S]*?)\}(?=\s*,?\s*borderRadius:)/);
if (!colorsMatch) {
  console.log('Could not find colors in tailwind.config.js');
  process.exit(1);
}

// Convert colorsMatch to valid JSON by quoting keys and handling comments
let colorsStr = '{' + colorsMatch[1] + '}';
// Remove comments
colorsStr = colorsStr.replace(/\/\/.*/g, '');

let colorsObj;
try {
  eval('colorsObj = ' + colorsStr);
} catch (e) {
  console.error("Error evaluating colors object", e);
  process.exit(1);
}

let rootVars = ':root, [data-theme="default"] {\n';
let newColorsStr = '{\n';

for (const [key, value] of Object.entries(colorsObj)) {
  const cssVarName = '--color-' + key;
  rootVars += '  ' + cssVarName + ': ' + value + ';\n';
  newColorsStr += '        "' + key + '": "var(' + cssVarName + ')",\n';
}

rootVars += '}\n\n[data-theme="emerald"] {\n';
for (const [key, value] of Object.entries(colorsObj)) {
  const cssVarName = '--color-' + key;
  if (value === '#006591') rootVars += '  ' + cssVarName + ': #059669;\n';
  else if (value === '#0ea5e9') rootVars += '  ' + cssVarName + ': #10b981;\n';
  else if (value === '#00C9A7') rootVars += '  ' + cssVarName + ': #34d399;\n';
  else if (value === '#0B1628') rootVars += '  ' + cssVarName + ': #064e3b;\n';
  else if (value === '#162340') rootVars += '  ' + cssVarName + ': #065f46;\n';
  else if (value === '#00A88D') rootVars += '  ' + cssVarName + ': #059669;\n';
  else rootVars += '  ' + cssVarName + ': ' + value + ';\n';
}
rootVars += '}\n';

newColorsStr += '      }';

const updatedTwConfig = twConfig.replace(/colors:\s*\{[\s\S]*?\}(?=\s*,?\s*borderRadius:)/, 'colors: ' + newColorsStr);

let styleCss = fs.readFileSync(stylePath, 'utf8');

// Replace the original root variables mapping in style.css to point to our new variables
// Find the original :root and replace values
styleCss = styleCss.replace(/--navy:\s*#0B1628;/, '--navy: var(--color-navy);');
styleCss = styleCss.replace(/--navy-mid:\s*#162340;/, '--navy-mid: var(--color-navy-mid);');
styleCss = styleCss.replace(/--teal:\s*#00C9A7;/, '--teal: var(--color-teal);');
styleCss = styleCss.replace(/--teal-dim:\s*#00A88D;/, '--teal-dim: var(--color-teal-dim);');

styleCss = rootVars + '\n' + styleCss;

fs.writeFileSync(twConfigPath, updatedTwConfig);
fs.writeFileSync(stylePath, styleCss);
console.log('Colors successfully migrated to CSS variables.');
