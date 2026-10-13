/**
 * Draws the sleeve cover as an amplitude-modulated halftone, the same method
 * as src/components/Turntable.tsx: a two-ink duotone (label red for every
 * tone, sleeve ink for highlights on an offset grid), radius
 * maxRadius * sqrt(tone) so dot area tracks tone. Reads the crop from
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
    // Tone per cell: contrast-stretched, a small ink floor, and a soft light
    // falloff, exactly as src/components/Turntable.tsx's toneMap().
    const tone = (row, col) => {
      const stretched = Math.min(1, Math.max(0, (tones[row * cells + col] - low) / span));
      const dx = (col + 0.5) / cells - 0.5;
      const dy = (row + 0.5) / cells - 0.42;
      const falloff = 1 - 0.55 * Math.min(1, (dx * dx + dy * dy) / 0.5);
      return (0.14 + 0.86 * stretched) * falloff;
    };
    const dot = (x, y, radius) => {
      if (radius < 0.4) return;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    };
    // Ink one, label red: every tone on the main grid.
    context.fillStyle = getComputedStyle(canvas).color;
    for (let row = 0; row < cells; row += 1) {
      for (let col = 0; col < cells; col += 1) {
        dot((col + 0.5) * CELL, (row + 0.5) * CELL, CELL * 0.6 * Math.sqrt(tone(row, col)));
      }
    }
    // Ink two, sleeve ink: highlights only, on a grid offset by half a cell.
    context.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--ink').trim();
    for (let row = 0; row < cells - 1; row += 1) {
      for (let col = 0; col < cells - 1; col += 1) {
        const average = (tone(row, col) + tone(row, col + 1) + tone(row + 1, col) + tone(row + 1, col + 1)) / 4;
        dot((col + 1) * CELL, (row + 1) * CELL, CELL * 0.42 * Math.sqrt(Math.max(0, (average - 0.6) / 0.4)));
      }
    }
    document.documentElement.dataset.ready = 'true';
  });
}
