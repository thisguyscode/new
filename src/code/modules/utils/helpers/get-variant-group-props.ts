export const getVariantGroupProps = (instances: InstanceNode[]) => {
  return instances.map((instance) => {
    const parent = instance.mainComponent.parent as ComponentSetNode;

    return parent.variantGroupProperties;
  });
};
