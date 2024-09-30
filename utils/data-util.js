export const replaceIdInArray = (array) => {
  return array.map((item) => ({ ...item, id: item._id.toString() }));
  // .map((item) => {
  //   delete item._id;
  //   return item;
  // });
};

export const replaceIdInObject = (object) => {
  // return { ...object, id: object._id.toString();
  const { _id, ...rest } = { ...object, id: object._id.toString() };
  return rest;
};
