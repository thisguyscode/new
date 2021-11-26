import { getInstancesByStoredIndexes } from './get-instances-by-stored-indexes';
import { getNewVariantNameByProps } from './get-new-variant-name-by-props';
import { VariantProperties } from './get-variant-group-props';

export const createVariant = (
  node: ComponentNode,
  properties: VariantProperties[],
  instancesIndexes: number[][] = [],
) => {
  const { parent } = node;

  const newVariant = node.clone();
  parent.appendChild(newVariant);

  const newInstances = getInstancesByStoredIndexes(newVariant, instancesIndexes);
  newVariant.name = getNewVariantNameByProps(node, properties);

  newInstances.map((instance, idx) => instance.setProperties(properties[idx]));

  return newVariant;
};
