const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

function createPNG(width, height, pixelBuf) {
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(rowSize * height);
  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter: None
    for (let x = 0; x < width; x++) {
      const pxOffset = (y * width + x) * 4;
      const targetOffset = rowOffset + 1 + x * 4;
      rawData[targetOffset] = pixelBuf[pxOffset];
      rawData[targetOffset + 1] = pixelBuf[pxOffset + 1];
      rawData[targetOffset + 2] = pixelBuf[pxOffset + 2];
      rawData[targetOffset + 3] = pixelBuf[pxOffset + 3];
    }
  }
  const compressed = zlib.deflateSync(rawData);

  function crc32(buf) {
    let crc = -1;
    for (let i = 0; i < buf.length; i++) {
      let byte = buf[i];
      for (let j = 0; j < 8; j++) {
        if ((crc ^ byte) & 1) crc = (crc >>> 1) ^ 0xEDB88320;
        else crc = crc >>> 1;
        byte >>>= 1;
      }
    }
    return (crc ^ -1) >>> 0;
  }

  function makeChunk(type, data) {
    const typeBuf = Buffer.from(type, 'ascii');
    const lenBuf = Buffer.alloc(4);
    lenBuf.writeUInt32BE(data.length, 0);
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
    return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
  }

  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  const ihdr = makeChunk('IHDR', ihdrData);
  const idat = makeChunk('IDAT', compressed);
  const iend = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([sig, ihdr, idat, iend]);
}

function renderStethoscope(size) {
  const S = size * 4;
  const buf = Buffer.alloc(S * S * 4);

  function setPixel(x, y, r, g, b, a) {
    if (x < 0 || x >= S || y < 0 || y >= S) return;
    const idx = (y * S + x) * 4;
    const srcA = a / 255;
    const dstA = buf[idx + 3] / 255;
    const outA = srcA + dstA * (1 - srcA);
    if (outA > 0) {
      buf[idx] = Math.round((r * srcA + buf[idx] * dstA * (1 - srcA)) / outA);
      buf[idx + 1] = Math.round((g * srcA + buf[idx + 1] * dstA * (1 - srcA)) / outA);
      buf[idx + 2] = Math.round((b * srcA + buf[idx + 2] * dstA * (1 - srcA)) / outA);
      buf[idx + 3] = Math.round(outA * 255);
    }
  }

  function fillCircle(cx, cy, r, color) {
    const minX = Math.max(0, Math.floor(cx - r - 1));
    const maxX = Math.min(S - 1, Math.ceil(cx + r + 1));
    const minY = Math.max(0, Math.floor(cy - r - 1));
    const maxY = Math.min(S - 1, Math.ceil(cy + r + 1));
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const d = Math.hypot(x - cx, y - cy);
        if (d <= r) {
          setPixel(x, y, color[0], color[1], color[2], color[3]);
        }
      }
    }
  }

  function fillRoundedRect(x, y, w, h, rad, color) {
    for (let py = y; py < y + h; py++) {
      for (let px = x; px < x + w; px++) {
        let inside = false;
        if (px >= x + rad && px < x + w - rad) inside = true;
        else if (py >= y + rad && py < y + h - rad) inside = true;
        else {
          const cornerX = px < x + rad ? x + rad : x + w - rad - 1;
          const cornerY = py < y + rad ? y + rad : y + h - rad - 1;
          if (Math.hypot(px - cornerX, py - cornerY) <= rad) inside = true;
        }
        if (inside) setPixel(px, py, color[0], color[1], color[2], color[3]);
      }
    }
  }

  function drawThickLine(x1, y1, x2, y2, thickness, color) {
    const dist = Math.hypot(x2 - x1, y2 - y1);
    const steps = Math.ceil(dist * 2.5);
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = x1 + (x2 - x1) * t;
      const y = y1 + (y2 - y1) * t;
      fillCircle(x, y, thickness / 2, color);
    }
  }

  // Draw background squircle: deep rich mocha #351E06
  fillRoundedRect(3, 3, S - 6, S - 6, Math.round(S * 0.26), [53, 30, 6, 255]);

  const scale = S / 64;
  const ivory = [250, 247, 242, 255]; // #FAF7F2
  const clay = [223, 176, 158, 255];  // #DFB09E
  const mocha = [53, 30, 6, 255];     // #351E06
  const thick = 4.2 * scale;

  // Binaural upper tips
  fillCircle(20 * scale, 13 * scale, 3.2 * scale, clay);
  fillCircle(44 * scale, 13 * scale, 3.2 * scale, clay);

  // Upper straight metal tubes
  drawThickLine(20 * scale, 13 * scale, 20 * scale, 22 * scale, thick, ivory);
  drawThickLine(44 * scale, 13 * scale, 44 * scale, 22 * scale, thick, ivory);

  // U-curve
  const curveSteps = 30;
  for (let i = 0; i < curveSteps; i++) {
    const t1 = i / curveSteps;
    const t2 = (i + 1) / curveSteps;
    const lx1 = (1 - t1)**2 * 20 + 2 * (1 - t1) * t1 * 20 + t1**2 * 32;
    const ly1 = (1 - t1)**2 * 22 + 2 * (1 - t1) * t1 * 35 + t1**2 * 35;
    const lx2 = (1 - t2)**2 * 20 + 2 * (1 - t2) * t2 * 20 + t2**2 * 32;
    const ly2 = (1 - t2)**2 * 22 + 2 * (1 - t2) * t2 * 35 + t2**2 * 35;
    drawThickLine(lx1 * scale, ly1 * scale, lx2 * scale, ly2 * scale, thick, ivory);

    const rx1 = (1 - t1)**2 * 44 + 2 * (1 - t1) * t1 * 44 + t1**2 * 32;
    const ry1 = (1 - t1)**2 * 22 + 2 * (1 - t1) * t1 * 35 + t1**2 * 35;
    const rx2 = (1 - t2)**2 * 44 + 2 * (1 - t2) * t2 * 44 + t2**2 * 32;
    const ry2 = (1 - t2)**2 * 22 + 2 * (1 - t2) * t2 * 35 + t2**2 * 35;
    drawThickLine(rx1 * scale, ry1 * scale, rx2 * scale, ry2 * scale, thick, ivory);
  }

  // Tubing stem
  drawThickLine(32 * scale, 35 * scale, 32 * scale, 40 * scale, thick, clay);

  // Tubing loop
  function bz(p0, p1, p2, p3, t) {
    return (1-t)**3 * p0 + 3*(1-t)**2*t * p1 + 3*(1-t)*t**2 * p2 + t**3 * p3;
  }
  for (let i = 0; i < 40; i++) {
    const t1 = i / 40;
    const t2 = (i + 1) / 40;
    const bx1 = bz(32, 32, 17, 18, t1);
    const by1 = bz(40, 52, 52, 42, t1);
    const bx2 = bz(32, 32, 17, 18, t2);
    const by2 = bz(40, 52, 52, 42, t2);
    drawThickLine(bx1 * scale, by1 * scale, bx2 * scale, by2 * scale, thick, clay);

    const cx1 = bz(18, 19, 36, 41, t1);
    const cy1 = bz(42, 34, 38, 48, t1);
    const cx2 = bz(18, 19, 36, 41, t2);
    const cy2 = bz(42, 34, 38, 48, t2);
    drawThickLine(cx1 * scale, cy1 * scale, cx2 * scale, cy2 * scale, thick, clay);
  }

  // Stethoscope chestpiece
  fillCircle(41 * scale, 50 * scale, 6.8 * scale, ivory);
  fillCircle(41 * scale, 50 * scale, 3.2 * scale, mocha);

  // Downsample to size x size
  const outBuf = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let r = 0, g = 0, b = 0, a = 0;
      for (let sy = 0; sy < 4; sy++) {
        for (let sx = 0; sx < 4; sx++) {
          const idx = ((y * 4 + sy) * S + (x * 4 + sx)) * 4;
          r += buf[idx];
          g += buf[idx + 1];
          b += buf[idx + 2];
          a += buf[idx + 3];
        }
      }
      const outIdx = (y * size + x) * 4;
      outBuf[outIdx] = Math.round(r / 16);
      outBuf[outIdx + 1] = Math.round(g / 16);
      outBuf[outIdx + 2] = Math.round(b / 16);
      outBuf[outIdx + 3] = Math.round(a / 16);
    }
  }
  return outBuf;
}

function makeICO(pngBuf, size = 32) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO
  header.writeUInt16LE(1, 4); // 1 image

  const entry = Buffer.alloc(16);
  entry.writeUInt8(size, 0); // width
  entry.writeUInt8(size, 1); // height
  entry.writeUInt8(0, 2);    // color count
  entry.writeUInt8(0, 3);    // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6);// bpp
  entry.writeUInt32LE(pngBuf.length, 8); // image size
  entry.writeUInt32LE(6 + 16, 12);       // offset

  return Buffer.concat([header, entry, pngBuf]);
}

const pubDir = path.join(__dirname, '..', 'public');
const px32 = renderStethoscope(32);
const png32 = createPNG(32, 32, px32);
fs.writeFileSync(path.join(pubDir, 'favicon.png'), png32);
console.log('Saved favicon.png (32x32)');

const ico = makeICO(png32, 32);
fs.writeFileSync(path.join(pubDir, 'favicon.ico'), ico);
console.log('Saved favicon.ico');

const px192 = renderStethoscope(192);
const png192 = createPNG(192, 192, px192);
fs.writeFileSync(path.join(pubDir, 'apple-touch-icon.png'), png192);
console.log('Saved apple-touch-icon.png (192x192)');
