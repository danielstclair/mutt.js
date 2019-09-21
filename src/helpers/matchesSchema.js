const { getSharedKeys } = require('./getSharedKeys');
const { getType } = require('./getType');
const { checkType } = require('./checkType');

const receivedMatchesTarget = ({ target, curr, targetType }) => {
  if (targetType && !checkType(target[curr], targetType)) {
    const receivedType = getType(target[curr]);
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
  const sharedKeys = getSharedKeys(schema, target);
  return sharedKeys.reduce(
    (prev, curr) => {
      const targetType = schema[curr][typeKey];
      if (!targetType && targetType !== undefined) {
        findMismatchInObject(target[curr], schema[curr], typeKey);
      }
      return receivedMatchesTarget({ target, curr, targetType });
    },
    {
      success: false,
      error: 'No keys are shared.',
    },
  );
};

const matchesSchema = (schema, typeKey = '_type') => (target) => {
  if (checkType(target, 'object')) {
    return findMismatchInObject({ target, schema, typeKey });
  }
  return true;
};

module.exports = { matchesSchema };
