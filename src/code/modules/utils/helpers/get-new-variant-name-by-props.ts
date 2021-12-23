import { VariantProperties } from './get-variant-group-props';

const INHERITED_PROPS_SYMBOL = '◆';
const OLD_INHERITED_PROPS_SYMBOL = '◆';
const SPACER = ' ';

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

const addSuffixToDuplicatedProps = (array: string[][]) => {
  const propKeysBucket = [];
  const results = array.map((prop) => {
    const [key, value] = prop;
    const modifiedKey = INHERITED_PROPS_SYMBOL + SPACER + key;

    if (propKeysBucket.includes(modifiedKey)) {
      const keyDuplicate = `${key}`.repeat(2);
      const resultKey = INHERITED_PROPS_SYMBOL + SPACER + keyDuplicate;

      propKeysBucket.push(resultKey);

      return `${resultKey}=${value}`;
    }

    propKeysBucket.push(modifiedKey);
    return `${modifiedKey}=${value}`;
  });

  return results;
};

export const getNewVariantNameByProps = (variant: ComponentNode, props: VariantProperties[]) => {
  const currentVariantProperties = convertNameToVariantProps(variant.name);

  // remove inherited props before adding new ones (avoiding duplicates)
  const inheritedProps = Object.keys(currentVariantProperties).filter((key) => {
    return key.startsWith(OLD_INHERITED_PROPS_SYMBOL);
  });
  inheritedProps.map((item) => delete currentVariantProperties[item]);

  const propsEntries: string[][] = [].concat(...props.map((prop) => Object.entries(prop)));

  const fixedNewProps = addSuffixToDuplicatedProps(propsEntries);

  const newVariantProperties = convertNameToVariantProps(fixedNewProps.join(', '));

  const resultProps = currentVariantProperties;
  Object.keys(newVariantProperties).map((key) => (resultProps[key] = newVariantProperties[key]));

  const resultName = convertVariantPropsToName(resultProps);

  return resultName;
};
