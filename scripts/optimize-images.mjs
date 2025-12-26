
import sharp from 'sharp';
import fs from 'fs-extra';
import path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const CONTENT_DIR = path.join(PUBLIC_DIR, 'content');
const SOURCE_IMAGE = path.join(CONTENT_DIR, 'Home.jpeg');

async function optimizeImages() {
  console.log('🚀 Starting image optimization...');

  if (!fs.existsSync(SOURCE_IMAGE)) {
    console.error('❌ Source image not found:', SOURCE_IMAGE);
    process.exit(1);
  }

  // 1. Generate Blur Placeholder (for reference only, already inlined in component)
  const blurBuffer = await sharp(SOURCE_IMAGE)
    .resize(20, null, { fit: 'inside' })
    .toFormat('jpeg', { quality: 20 })
    .toBuffer();
    
  const blurBase64 = `data:image/jpeg;base64,${blurBuffer.toString('base64')}`;
  console.log('✅ Generated Blur Placeholder (inlined in component)');


  // 2. Mobile Retina High-Def (Portrait optimization)
  // Target: iPhone 12/13/14 Pro Max width ~1290px -> Let's go safe with 1200px width
  // Retaining high quality
  await sharp(SOURCE_IMAGE)
    .resize(1200, null, { withoutEnlargement: true })
    .toFormat('avif', { quality: 90, effort: 6 }) // Effort 6 balances speed/compression
    .toFile(path.join(CONTENT_DIR, 'Home-mobile-high.avif'));
  console.log('✅ Generated Mobile High-Def AVIF');

  // 3. Desktop High-Def AVIF
  // Target: 4K screens. We limit to 2560px width for practical web delivery, 
  // but keep quality very high. If original is larger, resize down slightly to save huge bandwidth
  // while keeping perceptual lossless.
  await sharp(SOURCE_IMAGE)
    .resize(2560, null, { withoutEnlargement: true })
    .toFormat('avif', { quality: 90, effort: 6 })
    .toFile(path.join(CONTENT_DIR, 'Home-desktop-high.avif'));
  console.log('✅ Generated Desktop High-Def AVIF');

  // 4. Desktop High-Def WebP (Fallback)
  await sharp(SOURCE_IMAGE)
    .resize(2560, null, { withoutEnlargement: true })
    .toFormat('webp', { quality: 90, effort: 6 })
    .toFile(path.join(CONTENT_DIR, 'Home-desktop-high.webp'));
  console.log('✅ Generated Desktop High-Def WebP');

  // 4.5 Mobile High-Def WebP (Fallback for Safari)
  await sharp(SOURCE_IMAGE)
    .resize(1200, null, { withoutEnlargement: true })
    .toFormat('webp', { quality: 90, effort: 6 })
    .toFile(path.join(CONTENT_DIR, 'Home-mobile-high.webp'));
  console.log('✅ Generated Mobile High-Def WebP');

  // 5. Low-Res Preview (Progressive Loading Layer 1)
  // Wider than blur, but small enough to load instantly.
  await sharp(SOURCE_IMAGE)
    .resize(600, null, { withoutEnlargement: true })
    .toFormat('jpeg', { quality: 60, mozjpeg: true })
    .toFile(path.join(CONTENT_DIR, 'Home-preview.jpg'));
  console.log('✅ Generated Preview Image (Low-Res)');

  console.log('🎉 Optimization complete!');
}

optimizeImages().catch(err => {
  console.error('❌ Optimization failed:', err);
  process.exit(1);
});
