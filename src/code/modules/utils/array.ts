import { isArrayEmpty } from './boolean';

export const pairwise = (array, func, skips = 1) => {
  for (let i = 0; i < array.length - skips; i++) {
    func(array[i], array[i + skips]);
  }
};

// [1, 2, 3, 4] => [[1, 2], [3, 4]]
export const chunkArrayInGroups = (array: any[], size = 2) => {
  var myArray = [];
  for (var i = 0; i < array.length; i += size) {
    myArray.push(array.slice(i, i + size));
  }
  return myArray;
};

// groupBy(array, key): group array by key
export const groupBy = (inputArray, key, removeKey = false, outputType = {}) => {
  return inputArray.reduce(
    (previous, current) => {
      // Get the current value that matches the input key and remove the key value for it.
      const { [key]: keyValue } = current;
      // remove the key if option is set
      removeKey && keyValue && delete current[key];
      // If there is already an array for the user provided key use it else default to an empty array.
      const { [keyValue]: reducedValue = [] } = previous;

      // Create a new object and return that merges the previous with the current object
      return Object.assign(previous, {
        [keyValue]: reducedValue.concat(current),
      });
    },
    // Replace the object here to an array to change output object to an array
    outputType,
  );
};

// nestGroupsBy(nodes, ['propOne', 'propTwo'])
export const nestGroupsBy = (arr: {}[], properties: string[]) => {
  properties = Array.from(properties);
  if (properties.length === 1) {
    return groupBy(arr, properties[0]);
  }
  const property = properties.pop();
  let grouped = groupBy(arr, property);

  Object.keys(grouped).map((key) => (grouped[key] = nestGroupsBy(grouped[key], Array.from(properties))));

  return grouped;
};

// get unique value from an array
export const uniq = (array: any[], sort = false) => {
  return isArrayEmpty(array) ? [] : !sort ? [...new Set(array)] : [...new Set(array)].sort();
};
