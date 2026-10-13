const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

if (!fs.existsSync(distDir)) {
  console.error('dist directory does not exist! Run vite build first.');
  process.exit(1);
}

// 1. Copy everything from dist to root
function copyRecursive(src, dest) {
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src);
    for (const entry of entries) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

const entries = fs.readdirSync(distDir);
for (const entry of entries) {
  const srcPath = path.join(distDir, entry);
  const destPath = path.join(rootDir, entry);
  copyRecursive(srcPath, destPath);
}

// 2. Ensure .nojekyll exists
fs.writeFileSync(path.join(rootDir, '.nojekyll'), '');

// 3. Ensure stethoscope data URI is in root index.html as primary favicon
const indexPath = path.join(rootDir, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

const stethoscopeDataUri = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%23351E06'/%3E%3Crect x='2' y='2' width='60' height='60' rx='14' fill='none' stroke='%23DFB09E' stroke-width='1.5' opacity='0.4'/%3E%3Cpath d='M 20 13 L 20 22 C 20 31 26 35 32 35 C 38 35 44 31 44 22 L 44 13' fill='none' stroke='%23FAF7F2' stroke-width='4.5' stroke-linecap='round'/%3E%3Ccircle cx='20' cy='13' r='3.2' fill='%23DFB09E'/%3E%3Ccircle cx='44' cy='13' r='3.2' fill='%23DFB09E'/%3E%3Cpath d='M 32 35 L 32 40 C 32 50 18 50 18 41 C 18 33 37 35 41 46 L 41 48' fill='none' stroke='%23DFB09E' stroke-width='4.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ccircle cx='41' cy='51' r='6.5' fill='%23FAF7F2'/%3E%3Ccircle cx='41' cy='51' r='3' fill='%23351E06'/%3E%3C/svg%3E";

const faviconTags = `    <!-- Favicon - Medical Stethoscope -->
    <link rel="icon" type="image/svg+xml" href="${stethoscopeDataUri}" />
    <link rel="icon" type="image/svg+xml" href="./favicon.svg?v=4" />
    <link rel="icon" type="image/png" sizes="32x32" href="./favicon.png?v=4" />
    <link rel="alternate icon" href="./favicon.ico?v=4" />
    <link rel="apple-touch-icon" sizes="192x192" href="./apple-touch-icon.png?v=4" />`;

// Replace existing favicon links or insert before Google Fonts
if (html.includes('<!-- Favicon')) {
  html = html.replace(/<!-- Favicon[\s\S]*?(?=<!-- Google Fonts|<link rel="preconnect")/i, faviconTags + '\n\n    ');
} else {
  html = html.replace('</head>', `${faviconTags}\n  </head>`);
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Production assets prepared at repository root successfully!');
