export const getNodesById = (nodes = []) => {
  return nodes.map((node) => figma.getNodeById(node.id)).filter((node) => node != null);
};
