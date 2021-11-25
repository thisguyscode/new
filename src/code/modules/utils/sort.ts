/*  
  a - current node
  b - next node
 */
export const sortNodesByParentIndex = (nodes: SceneNode[] | readonly SceneNode[]) => {
  return [...nodes].sort((a, b) => b.parent.children.indexOf(b) - a.parent.children.indexOf(a));
};

export const sortNodesByParentIndexReverse = (nodes: SceneNode[] | readonly SceneNode[]) => {
  return [...nodes].sort((a, b) => a.parent.children.indexOf(a) - b.parent.children.indexOf(b));
};

export const sortNodesReverse = (nodes) => nodes.slice().reverse();
