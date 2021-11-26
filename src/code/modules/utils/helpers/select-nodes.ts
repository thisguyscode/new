import { isArrayEmpty } from '../boolean';
import { getNodePage } from './get-node-page';

// Handle the collapse / expand behaviour of the layers in layer panel
const getExpandedStates = (nodes) => {
  return nodes.map((node) => ({ id: node.id, expanded: node.expanded }));
};

const setExpandedStates = (nodes, cache) => {
  return nodes.map((node) => {
    if (!node.expanded) {
      return;
    }

    const { expanded = false } = { ...cache.find((item) => item.id === node.id) };

    node.expanded = expanded;
  });
};

export const selectNodes = (nodes, { fallback = figma.currentPage.selection, selectPageAndZoom = false } = {}) => {
  const newSelection = !isArrayEmpty(nodes) ? nodes : fallback;

  figma.currentPage = getNodePage(newSelection[0]);

  const selectionExpandedStates = getExpandedStates(newSelection);

  figma.currentPage.selection = newSelection;

  setExpandedStates(newSelection, selectionExpandedStates);

  if (selectPageAndZoom === true) {
    figma.viewport.scrollAndZoomIntoView(newSelection);
  }

  return newSelection;
};
