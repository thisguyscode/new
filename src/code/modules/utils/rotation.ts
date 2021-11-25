import { calcNodeRelativeBox } from './math';

// rotating the node around its center
export const setNodeRotation = (node, angle) => {
  // finding the center coordonates
  const { x: x1, y: y1, width: w1, height: h1 } = calcNodeRelativeBox(node);

  const cx = node.x - x1 + w1 / 2;
  const cy = node.y - y1 + h1 / 2;

  // rotating the node
  node.rotation = angle;

  // translating back
  const { x: x2, y: y2, width: w2, height: h2 } = calcNodeRelativeBox(node);

  node.x = cx + x2 - w2 / 2;
  node.y = cy + y2 - h2 / 2;

  return node;
};
