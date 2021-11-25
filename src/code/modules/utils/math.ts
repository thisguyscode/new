//
const applyMatrixToPoint = (matrix: number[][], point: number[]) => {
  return [
    point[0] * matrix[0][0] + point[1] * matrix[0][1] + matrix[0][2],
    point[0] * matrix[1][0] + point[1] * matrix[1][1] + matrix[1][2],
  ];
};

//
export const calcNodeBoundingBox = (node) => {
  const [halfHeight, halfWidth] = [node.height / 2, node.width / 2];

  const [[c0, s0, x], [s1, c1, y]] = node.absoluteTransform;
  const matrix = [
    [c0, s0, x + halfWidth * c0 + halfHeight * s0],
    [s1, c1, y + halfWidth * s1 + halfHeight * c1],
  ];

  // the coordinates of the corners of the rectangle
  const XY = {
    x: [1, -1, 1, -1],
    y: [1, -1, -1, 1],
  };

  // fill in
  for (let i = 0; i <= 3; i++) {
    const a = applyMatrixToPoint(matrix, [XY.x[i] * halfWidth, XY.y[i] * halfHeight]);

    XY.x[i] = a[0];
    XY.y[i] = a[1];
  }

  const { min, max } = Math;

  const box = {
    x: min(...XY.x) || 0,
    y: min(...XY.y) || 0,
    x2: max(...XY.x) || 0,
    y2: max(...XY.y) || 0,
  };

  return {
    x: box.x,
    y: box.y,
    x2: box.x2,
    y2: box.y2,
    width: box.x2 - box.x,
    height: box.y2 - box.y,
  };
};

//
export const calcNodesBoundingBox = (nodes) => {
  const { min, max } = Math;

  const items = nodes.map(calcNodeBoundingBox);

  const box = {
    x: min(...items.map((item) => item.x)) || 0,
    y: min(...items.map((item) => item.y)) || 0,
    x2: max(...items.map((item) => item.x2)) || 0,
    y2: max(...items.map((item) => item.y2)) || 0,
  };

  return {
    x: box.x,
    y: box.y,
    x2: box.x2,
    y2: box.y2,
    width: box.x2 - box.x,
    height: box.y2 - box.y,
  };
};

export const calcNodeRelativeBox = (node) => {
  const { x, y, width, height } = calcNodeBoundingBox(node);

  return {
    x: node.absoluteTransform[0][2] - x,
    y: node.absoluteTransform[1][2] - y,
    width: width,
    height: height,
  };
};

//
export const getRandomNumber = (min: number, max: number, precision = 0): number => {
  const { random } = Math;

  return Number((random() * (max - min) + min).toFixed(precision));
};
