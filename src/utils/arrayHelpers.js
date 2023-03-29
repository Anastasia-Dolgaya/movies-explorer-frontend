export const updateItem = (array, id, updatedFields, idKey = 'id') => {
  const foundIndex = array.findIndex((item) => item[idKey] === id);

  if (foundIndex < 0) {
    throw new Error('ну как же так, такого не должно быть!');
  }

  const foundItem = array[foundIndex];

  const updatedItem = { ...foundItem, ...updatedFields };

  const updatedArray = [...array];

  updatedArray[foundIndex] = updatedItem;

  return updatedArray;
};
