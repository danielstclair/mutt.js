const { isObject } = require('../helpers/isObject');
const { cloneObject } = require('../helpers/cloneObject');

const sealDeepObject = (target) => {
  return Object.seal(
    Object.entries(target).reduce((prev, [key, value]) => {
      const newTarget = cloneObject(prev);
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
