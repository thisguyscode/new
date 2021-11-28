import { getInstanceByStoredIndexes } from './get-instances-by-stored-indexes';
import { getNewVariantNameByProps } from './get-new-variant-name-by-props';
import { VariantProperties } from './get-variant-group-props';

export const createVariant = (
  node: ComponentNode,
  properties: VariantProperties[],
  instancesIndexes: number[][] = [],
) => {
  const isMatch = instancesIndexes.every((instanceIndex, idx) => {
    const instance = getInstanceByStoredIndexes(node, instanceIndex);

    return JSON.stringify(instance.variantProperties) === JSON.stringify(properties[idx]);
  });

  let newVariant = node;

  if (!isMatch) {
    newVariant = node.clone();

    node.parent.appendChild(newVariant);
  }

  console.log('🚀 ~ isMatch', isMatch);
  // debugger;

  instancesIndexes.map((instanceIndex, idx) => {
    const instance = getInstanceByStoredIndexes(newVariant, instanceIndex);

    return instance.setProperties(properties[idx]);
  });

  newVariant.name = getNewVariantNameByProps(node, properties);

  return newVariant;
};
