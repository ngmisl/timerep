import sharp from 'sharp';
import { readFileSync } from 'fs';

const svgBuffer = readFileSync('public/icon.svg');

async function generateIcons() {
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile('public/icon-192.png');

  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile('public/icon-512.png');

  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile('public/favicon-32x32.png');

  await sharp(svgBuffer)
    .resize(16, 16)
    .png()
    .toFile('public/favicon-16x16.png');

  console.log('Icons and favicons generated successfully!');
}

generateIcons();
