import { isComponent } from '../boolean';
/* 
const getNodeProps = (node) => {
  return {
    name: node.name,
    type: node.type,
    isVariant: isInstanceWithVariants(node),
  };
};

export const getVariantStructure = (node) => {
  const data = getNodeProps(node);

  if (!node.children) {
    return data;
  }

  data['children'] = node.children.map(getVariantStructure);

  return data;
};
 */

/* This is getting the path to the instance (layer structure) */
export const getIndexesToInstance = (
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

export const getInstanceByStoredIndexes = (node: ComponentNode, indexes: number[]) => {
  let result = node as unknown;

  indexes.map((index) => (result = result['children'][index]));

  return result as InstanceNode;
};
