let GRID_SIZE = 50; // 默认格子大小

export function setGridSize(size) {
  GRID_SIZE = size;
}

export function getGridSize() {
  return GRID_SIZE;
}

export function drawPoster(canvas, bgColor, gridWidth, gridHeight, texts, selectedTextId, showGrid = false) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = gridWidth * GRID_SIZE;
  const height = gridHeight * GRID_SIZE;

  // 绘制背景
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // 绘制网格（仅在编辑模式下）
  if (showGrid) {
    ctx.strokeStyle = 'rgba(200, 200, 200, 0.5)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= width; x += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y <= height; y += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }

  // 绘制文本
  texts.forEach(text => {
    const x = text.x * GRID_SIZE;
    const y = text.y * GRID_SIZE;
    ctx.font = `${text.size}px Arial`;
    ctx.fillStyle = text.color;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(text.content, x, y);

    // 如果文本被选中，绘制边框（仅在编辑模式下）
    if (showGrid && text.id === selectedTextId) {
      const metrics = ctx.measureText(text.content);
      const textHeight = text.size;
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, metrics.width, textHeight);
    }
  });
}


export function getTextWidth(text, font) {
  if (typeof window === 'undefined') return 0;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = font;
  return context.measureText(text).width;
}

export function pixelsToGrid(pixels) {
  return Math.floor(pixels / getGridSize());
}

export function gridToPixels(grid) {
  return grid * getGridSize();
}