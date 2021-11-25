import { isComponent, isContainer, isPage } from './boolean';

export const getClosestContainer = (node) => {
  return isContainer(node) || isPage(node) ? node : getClosestContainer(node.parent);
};

export const removeLayerFills = (node) => (node.fills = []);

export const getRootNode = (node) => {
  if (isPage(node.parent)) {
    return node;
  }

  return getRootNode(node.parent);
};

export const getRootComponentNode = (node) => {
  if (isComponent(node)) {
    return node;
  }

  return getRootComponentNode(node.parent);
};
