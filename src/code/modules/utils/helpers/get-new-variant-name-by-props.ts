import { VariantProperties } from './get-variant-group-props';

export const getNewVariantNameByProps = (variant: ComponentNode, props: VariantProperties[]) => {
  const { name } = variant;

  const newProps = []
    .concat(...props.map((prop) => Object.entries(prop)))
    .map((item) => item.join('='))
    .join(',');

  return name + ',' + newProps;
};
