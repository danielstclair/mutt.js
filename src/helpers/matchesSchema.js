const { isObject } = require('./isObject');
const { getType } = require('./getType');

const receivedMatchesTarget = ({ target, curr, targetType }) => {
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
  return {
    success: true,
    error: null,
  };
};

const findMismatchInObject = ({ target, schema = {}, typeKey }) => {
  return Object.keys(schema).reduce((prev, curr) => {
    const targetType = schema[curr][typeKey];
    if (!targetType && targetType !== undefined) {
      findMismatchInObject(target[curr], schema[curr], typeKey);
    }
    return receivedMatchesTarget({ target, curr, targetType });
  }, {});
};

const matchesSchema = (schema, typeKey = '_type') => (target) => {
  if (isObject(target)) {
    return findMismatchInObject({ target, schema, typeKey });
  }
  return true;
};

module.exports = { matchesSchema };
