export const getSortedNodes = (nodes) => figma.currentPage.findAll((node) => nodes.includes(node));
