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

console.log('Production assets prepared at repository root successfully!');
