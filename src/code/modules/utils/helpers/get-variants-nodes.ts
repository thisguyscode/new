import { isInstanceWithVariants } from '../boolean';

export const getVariantsNodes = (node: ComponentNode, suffix = '--'): InstanceNode[] => {
  const isValidName = (name: string) => name.endsWith(suffix);
  const isValidInstance = (node: SceneNode) => isInstanceWithVariants(node) && !isValidName(node.name);

  const instancesWithVariants = node.findAll((node) => isValidInstance(node)) as InstanceNode[];

  return instancesWithVariants;
};
