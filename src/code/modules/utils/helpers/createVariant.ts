import { getInstanceByStoredIndexes } from './get-instances-by-stored-indexes';
import { getNewVariantNameByProps } from './get-new-variant-name-by-props';
import { VariantProperties } from './get-variant-group-props';

export const createVariant = (
  node: ComponentNode,
  variantProperties: VariantProperties[],
  instancesIndexes: number[][] = [],
) => {
  const newVariant = node.clone();

  node.parent.appendChild(newVariant);

  instancesIndexes.map((instanceIndex, idx) => {
    const instance = getInstanceByStoredIndexes(newVariant, instanceIndex);

    return instance.setProperties(variantProperties[idx]);
  });

  newVariant.name = getNewVariantNameByProps(node, variantProperties);

  return newVariant;
};

export const updateVariant = (
  node: ComponentNode,
  variantProperties: VariantProperties[],
  instancesIndexes: number[][] = [],
) => {
  const newVariant = node;

  node.parent.appendChild(newVariant);

  instancesIndexes.map((instanceIndex, idx) => {
    const instance = getInstanceByStoredIndexes(newVariant, instanceIndex);

    return instance.setProperties(variantProperties[idx]);
  });

  newVariant.name = getNewVariantNameByProps(node, variantProperties);

  return newVariant;
};
