export const setPosition = (node, x: number, y: number) => {
  node.x = x;
  node.y = y;

  return node;
};

export const addPosition = (node, x: number, y = x) => {
  node.x += x;
  node.y += y;

  return node;
};

export const substractPosition = (node, x: number, y = x) => {
  node.x -= x;
  node.y -= y;

  return node;
};

export const getAbsolutePosition = (node) => {
  return {
    x: node.absoluteTransform[0][2],
    y: node.absoluteTransform[1][2],
  };
};
