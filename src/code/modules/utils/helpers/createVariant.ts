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
  newVariant.name = getNewVariantNameByProps(node, properties);
  console.log('🚀 ~ newVariant.name', newVariant.name);

  const newInstances = getInstancesByStoredIndexes(newVariant, instancesIndexes);

  newInstances.map((instance, idx) => {
    console.log(properties);
    console.log(properties[idx]);

    return instance.setProperties(properties[idx]);
  });

  parent.appendChild(newVariant);

  return newVariant;
};
