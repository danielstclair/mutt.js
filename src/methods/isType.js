const { getType } = require('../helpers/getType');
const { checkType } = require('../helpers/checkType');
const { getSharedKeys } = require('../helpers/getSharedKeys');

const matchesObjectSchema = (currentType, target, cb) => {
  const sharedKeys = getSharedKeys(currentType, target);
  if (!sharedKeys.length) return false;

  return sharedKeys.reduce((prev, curr) => {
    const targetA = currentType[curr];
    const targetB = target[curr];
    const nestedType = getType(targetA);
    if (nestedType === 'Function') {
      const assessType = targetA(targetB);
      if (!prev || !assessType) return false;
      return true;
    }
    return cb(targetA)(target[curr]);
  }, true);
};

const matchesArraySchema = (currentType, target) =>
  target.reduce((prev, curr) => {
    const [fn] = currentType;
    const targetType = fn(curr);
    if (!prev || !targetType) return false;
    return true;
  }, true);

const isType = (...types) => (target) => {
  if (!types || !checkType(types, 'array')) {
    throw new Error(
      'At least one or more types should be passed in the "isType" function',
    );
  }
  let matchesType;
  const currentTypes = [].concat(types);
  while (currentTypes.length > 0) {
    const currentType = currentTypes.pop();
    const metaType = getType(currentType);

    switch (metaType) {
      case 'String': {
        const curr = currentType.length ? currentType : metaType;
        matchesType = checkType(target, curr);
        break;
      }

      case 'Object': {
        matchesType = matchesObjectSchema(currentType, target, isType);
        break;
      }

      case 'Array': {
        if (!checkType(target, 'array')) {
          throw new Error('Expected target to be an array');
        }
        matchesType = matchesArraySchema(currentType, target);
        break;
      }

      default: {
        matchesType = checkType(target, metaType);
        break;
      }
    }
    if (matchesType) return matchesType;
  }
  return matchesType;
};

module.exports = { isType };
