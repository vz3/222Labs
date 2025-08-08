import sharp from 'sharp';
import fs from 'fs';

async function generateOGImage() {
  try {
    // Read the actual logo SVG
    const svgBuffer = fs.readFileSync('public/logo.svg');
    
    // Create a 1200x630 canvas with your brand background
    const canvas = sharp({
      create: {
        width: 1200,
        height: 630,
        channels: 4,
        background: { r: 238, g: 238, b: 238, alpha: 1 } // #EEEEEE
      }
    });
    
    // Composite the logo onto the canvas, centered
    await canvas
      .composite([{
        input: svgBuffer,
        top: 165, // Center vertically: (630 - 300) / 2
        left: 0
      }])
      .png()
      .toFile('public/og-image.png');
    
    console.log('✅ Generated og-image.png using actual logo (1200×630)');
  } catch (error) {
    console.error('❌ Error generating OG image:', error);
  }
}

generateOGImage();
