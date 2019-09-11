const { isObject } = require('./isObject');
const { isFunction } = require('./isFunction');
const { isNull } = require('./isNull');

const getType = (target) => {
  if (Array.isArray(target)) return 'array';
  if (isObject(target)) return 'object';
  if (isNull(target)) return 'null';
  if (isFunction(target)) return 'function';
  return typeof target;
};

module.exports = { getType };
