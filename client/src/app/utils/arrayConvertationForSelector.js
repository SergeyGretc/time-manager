export const convertArrForSelector = (array) => {
  const changedArray = array.map((el, index) => {
    return {
      value: index,
      label: el.projectName,
      _id: el._id,
      userId: el.userId,
    };
  });
  return changedArray;
};
