const { isObject } = require('../helpers/isObject');
const { getType } = require('../helpers/getType');

const findMismatchInObject = (target, schema = {}, typeKey = '_type') => {
  const seed = {
    success: true,
    error: null,
  };
  return Object.keys(schema).reduce((prev, curr) => {
    const targetType = schema[curr][typeKey];
    if (!targetType && targetType !== undefined) {
      findMismatchInObject(target[curr], schema[curr], typeKey);
    }
    const receivedType = getType(target[curr]);
    if (
      targetType &&
      curr in target &&
      target[curr] &&
      receivedType !== targetType
    ) {
      return {
        success: false,
        error: `Error! Expected key "${curr}" to be of type "${targetType}" but got type "${receivedType}"`,
      };
    }
    return prev;
  }, seed);
};

const matchesSchema = (target, schema) => {
  if (isObject(target)) {
    return findMismatchInObject(target, schema);
  }
  return true;
};

module.exports = { matchesSchema };
