import { settings } from '../../settings';

const { minSize } = settings.frame;

export const resize = (node, width = minSize, height = minSize) => {
  if (width >= minSize && height >= minSize) {
    node.resize(width, height);
  }

  //
  else if (width < minSize && height < minSize) {
    node.resize(minSize, minSize);
  }

  //
  else if (height < minSize) {
    node.resize(width, minSize);
  }

  //
  else {
    node.resize(minSize, height);
  }

  return node;
};

// future proof
const addSizeToNode = (node, width = minSize, height = minSize) => {
  const newWidth = node.width + width;
  const newHeight = node.height + height;
  resize(node, newWidth, newHeight);

  return node;
};

const substractSizeFromNode = (node, width = minSize, height = minSize) => {
  const newWidth = node.width - width;
  const newHeight = node.height - height;
  resize(node, newWidth, newHeight);

  return node;
};

// Unconstrained
export const resizeUnconstrained = (node, width = minSize, height = minSize) => {
  if (width >= minSize && height >= minSize) {
    node.resizeWithoutConstraints(width, height);
  }

  //
  else if (width < minSize && height < minSize) {
    node.resizeWithoutConstraints(minSize, minSize);
  }

  //
  else if (height < minSize) {
    node.resizeWithoutConstraints(width, minSize);
  }

  //
  else {
    node.resizeWithoutConstraints(minSize, height);
  }

  return node;
};
