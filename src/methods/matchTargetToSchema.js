const { matchesSchema } = require('./matchesSchema');
const { isObject } = require('../helpers/isObject');
const { yieldError } = require('../helpers/typeErrorMessages');
const { cloneObject } = require('../helpers/cloneObject');

const matchTargetToSchema = (target, schema) => {
  const mismatch = matchesSchema(target, schema);
  if (!mismatch.success) {
    return yieldError(mismatch.error, true)();
  }
  return Object.keys(target).reduce((obj, key) => {
    const clone = cloneObject(obj);
    if (key in schema) {
      clone[key] = isObject(target[key])
        ? matchTargetToSchema(target[key], schema[key])
        : target[key];
    }
    return clone;
  }, {});
};

module.exports = { matchTargetToSchema };
