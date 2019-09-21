const cloneDeep = require('lodash.clonedeep');
const { isObject } = require('../helpers/isObject');

const sealDeepObject = (target) => {
  return Object.seal(
    Object.entries(target).reduce((prev, [key, value]) => {
      const newTarget = cloneDeep(prev);
      newTarget[key] = isObject(value) ? sealDeepObject(value) : value;
      return newTarget;
    }, {}),
  );
};

const seal = (target) => {
  if (isObject(target)) {
    return sealDeepObject(target);
  }
  return target;
};

module.exports = { seal };
