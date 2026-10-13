/**
 * Draws the sleeve cover as an amplitude-modulated halftone, the same method
 * as src/components/Turntable.tsx (first ink only): one red dot per cell,
 * radius maxRadius * sqrt(tone) so dot area tracks tone. Reads the crop from
 * data-src / data-crop ("x,y,size") on the canvas.
 */

const CELL = 8;

for (const canvas of document.querySelectorAll('canvas[data-src]')) {
  const image = new Image();
  image.src = canvas.dataset.src;
  const [cropX, cropY, cropSize] = canvas.dataset.crop.split(',').map(Number);
  image.addEventListener('load', () => {
    const size = canvas.getBoundingClientRect().width;
    canvas.width = size;
    canvas.height = size;
    const cells = Math.ceil(size / CELL);
    const sampler = document.createElement('canvas');
    sampler.width = cells;
    sampler.height = cells;
    const sample = sampler.getContext('2d');
    sample.imageSmoothingQuality = 'high';
    sample.drawImage(image, cropX, cropY, cropSize, cropSize, 0, 0, cells, cells);
    const pixels = sample.getImageData(0, 0, cells, cells).data;
    // Same tone map as the site: stretch the 4th..96th luminance percentile
    // to 0..1, then add a small ink floor so flat dark UI bands print as deep
    // tone rather than empty stripes.
    const tones = [];
    for (let i = 0; i < pixels.length; i += 4) {
      tones.push((0.2126 * pixels[i] + 0.7152 * pixels[i + 1] + 0.0722 * pixels[i + 2]) / 255);
    }
    const sorted = [...tones].sort((a, b) => a - b);
    const low = sorted[Math.floor(sorted.length * 0.04)];
    const span = Math.max(sorted[Math.floor(sorted.length * 0.96)] - low, 1e-3);
    const context = canvas.getContext('2d');
    context.fillStyle = getComputedStyle(canvas).color;
    for (let row = 0; row < cells; row += 1) {
      for (let col = 0; col < cells; col += 1) {
        const stretched = Math.min(1, Math.max(0, (tones[row * cells + col] - low) / span));
        const tone = 0.14 + 0.86 * stretched;
        const radius = CELL * 0.6 * Math.sqrt(tone);
        if (radius < 0.4) continue;
        context.beginPath();
        context.arc(col * CELL + CELL / 2, row * CELL + CELL / 2, radius, 0, Math.PI * 2);
        context.fill();
      }
    }
    document.documentElement.dataset.ready = 'true';
  });
}
