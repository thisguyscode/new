import { allPossibleCases } from '../array';
import { getVariantGroupProps, VariantProperties } from './get-variant-group-props';

const fixVariantValues = (possibleCases, array: number[]) => {
  const results = possibleCases.map((possibleCases) => {
    let start = 0;

    return array.map((item) => {
      const results = possibleCases.slice(start, start + item);

      start += item;

      return results;
    });
  });

  return results as string[][][];
};

const remapVariantProps = (propsArray: string[][], valuesArray: string[][][]): VariantProperties[][] => {
  return valuesArray.map((values) => {
    return propsArray.map((props, idx) => {
      const results = {};
      props.map((prop, index) => {
        results[prop] = values[idx][index];
      });

      return results;
    });
  });
};

export const getVariantsAllPosibleCases = (instances: InstanceNode[]) => {
  const groupProps = getVariantGroupProps(instances);

  const props = groupProps.map((group) => Object.keys(group));
  const values = [].concat(...groupProps.map((group) => Object.values(group)));

  const cases = allPossibleCases(values);

  const groupLength = groupProps.map((group) => Object.keys(group).length);

  const valuesFixed = fixVariantValues(cases, groupLength);

  return remapVariantProps(props, valuesFixed);
};
