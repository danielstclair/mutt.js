const cloneDeep = require('lodash.clonedeep');
const { matchesSchema } = require('../helpers/matchesSchema');
const { isObject } = require('../helpers/isObject');
const { yieldError } = require('../helpers/typeErrorMessages');

const matchTargetToSchema = (schema, options) => (target) => {
  const targetKey = options ? options.targetKey : '_type';
  const mismatch = matchesSchema(schema, targetKey)(target);

  if (!mismatch.success) {
    return yieldError(mismatch.error, true)();
  }

  return Object.keys(target).reduce((obj, key) => {
    const clone = cloneDeep(obj);

    if (key in schema) {
      clone[key] = isObject(target[key])
        ? matchTargetToSchema(schema[key])(target[key])
        : target[key];
    }

    return clone;
  }, {});
};

module.exports = { matchTargetToSchema };
