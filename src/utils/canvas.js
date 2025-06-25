export function getRandomPointInPolygon(polygon) {
  const bbox = getBoundingBox(polygon);
  let randomPoint;
  do {
    const randomX = Math.random() * (bbox.maxX - bbox.minX) + bbox.minX;
    const randomY = Math.random() * (bbox.maxY - bbox.minY) + bbox.minY;
    randomPoint = { x: randomX, y: randomY };
  } while (!isPointInPolygon(randomPoint, polygon));

  return randomPoint;
}

function isPointInPolygon(point, polygon) {
  // Ray casting algorithm implementation (simplified)
  let crossings = 0;
  for (let i = 0; i < polygon.length; i++) {
    const a = polygon[i];
    const b = polygon[(i + 1) % polygon.length];
    if (
      (a.y <= point.y && b.y > point.y) ||
      (a.y > point.y && b.y <= point.y)
    ) {
      const cross_x =
        a.x + ((point.y - a.y) / (b.y - a.y)) * (b.x - a.x);
      if (point.x < cross_x) {
        crossings++;
      }
    }
  }
  return crossings % 2 == 1;
}

function getBoundingBox(polygon) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const point of polygon) {
      minX = Math.min(minX, point.x);
      minY = Math.min(minY, point.y);
      maxX = Math.max(maxX, point.x);
      maxY = Math.max(maxY, point.y);
  }

  return { minX, minY, maxX, maxY };
}

export const myVariable = 'Hello';