import { VariantProperties } from './get-variant-group-props';

const convertNameToVariantProps = (string = '') => {
  const results = {};

  const array = string.split(', ');

  array.map((item) => {
    const entry = item.split('=');

    results[entry[0]] = entry[1];
  });

  return results;
};

const convertVariantPropsToName = (variantProps: VariantProperties) => {
  const entries = Object.entries(variantProps);

  const joinedEntries = entries.map((entry) => entry.join('='));

  return [].concat(...joinedEntries).join(', ');
};

const addSuffixToDuplicatedProps = (array: string[]) => {
  const props = array.map((item) => item.split('='));

  const propKeysBucket = [];
  const results = props.map((prop) => {
    const [key, value] = prop;

    if (propKeysBucket.includes(key)) {
      const keyDuplicate = `${key}`.repeat(2);

      propKeysBucket.push(keyDuplicate);

      return `${keyDuplicate}=${value}`;
    }

    propKeysBucket.push(key);
    return `${key}=${value}`;
  });

  return results;
};

export const getNewVariantNameByProps = (variant: ComponentNode, props: VariantProperties[]) => {
  const currentVariantProperties = convertNameToVariantProps(variant.name);

  const newProps = [].concat(...props.map((prop) => Object.entries(prop))).map((item) => item.join('='));
  const fixedNewProps = addSuffixToDuplicatedProps(newProps);
  const newVariantProperties = convertNameToVariantProps(fixedNewProps.join(', '));

  const resultProps = currentVariantProperties;
  Object.keys(newVariantProperties).map((key) => (resultProps[key] = newVariantProperties[key]));

  const resultName = convertVariantPropsToName(resultProps);

  return resultName;
};
