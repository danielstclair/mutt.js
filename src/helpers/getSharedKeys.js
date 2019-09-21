const getSharedKeys = (schema, target) => {
  const sharedKeys = [];
  const schemaKeys = Object.keys(schema);
  while (schemaKeys.length > 0) {
    const key = schemaKeys.pop();
    if (key in target) sharedKeys.push(key);
  }
  return sharedKeys;
};

module.exports = { getSharedKeys };
