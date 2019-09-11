const { isObject } = require('../helpers/isObject');

const NOPE = () => {
  throw new Error("Can't modify read only values");
};

const READ_ONLY_HANDLER = {
  set: NOPE,
  defineProperty: NOPE,
  deleteProperty: NOPE,
  preventExtensions: NOPE,
  setPrototypeOf: NOPE,
};

const readOnly = (target) => {
  return new Proxy(target, {
    get(obj, propKey, receiver) {
      const temp = Reflect.get(obj, propKey, receiver);
      if (isObject(temp)) return readOnly(temp);
      return temp;
    },
    ...READ_ONLY_HANDLER,
  });
};

module.exports = { readOnly };
