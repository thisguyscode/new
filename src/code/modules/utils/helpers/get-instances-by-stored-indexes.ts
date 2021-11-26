import { isComponent } from '../boolean';

/* 
  First I need to save the structure, to not get for all the variants
  I assume that the structure will not change (subject of change)
  This is getting the path to the instance (layer structure)
*/
const getIndexesToInstance = (
  instance: InstanceNode | (BaseNode & ChildrenMixin),
  results: number[][] = [],
): number[] => {
  if (isComponent(instance)) {
    return [].concat(...results.reverse());
  }

  const nodeIndex: number = instance.parent.children.indexOf(instance as SceneNode);

  results.push([nodeIndex]);

  return getIndexesToInstance(instance.parent, results);
};

export const getIndexesToInstances = (instances: InstanceNode[]) => {
  return instances.map((instance) => getIndexesToInstance(instance));
};

/* Get instances by following the saved structure */
export const getInstanceByStoredIndexes = (node: ComponentNode, indexes: number[]) => {
  let result = node as unknown;

  indexes.map((index) => {
    result = result['children'][index];
  });

  return result as InstanceNode;
};

export const getInstancesByStoredIndexes = (node: ComponentNode, indexes: number[][]) => {
  return indexes.map((index) => getInstanceByStoredIndexes(node, index));
};
