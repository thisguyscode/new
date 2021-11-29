export const saveData = async (key: string, data) => {
  await figma.clientStorage.setAsync(key, data);
};
