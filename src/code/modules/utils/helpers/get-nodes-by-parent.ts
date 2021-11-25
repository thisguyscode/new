import { groupBy } from '../array';

export const getNodesByParent = (nodes): any[] => {
  const groupedByParent = groupBy(nodes, 'parent');

  return Object.values(groupedByParent);
};
