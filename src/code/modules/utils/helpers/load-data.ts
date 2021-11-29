export const loadData = async (key: string) => await figma.clientStorage.getAsync(key);
