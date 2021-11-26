const fixVariantGroupProperties = (props: defaultVariantGroupProperties) => {
  const keys = Object.keys(props);
  const result = {};

  keys.map((key) => {
    result[key] = props[key].values;
  });

  return result as customVariantGroupProperties;
};

export const getVariantGroupProps = (instances: InstanceNode[]) => {
  return instances.map((instance) => {
    const parent = instance.mainComponent.parent as ComponentSetNode;

    return fixVariantGroupProperties(parent.variantGroupProperties);
  });
};

type customVariantGroupProperties = { [property: string]: string[] };
export type VariantProperties = { [property: string]: string };
type defaultVariantGroupProperties = { [property: string]: { values: string[] } };
