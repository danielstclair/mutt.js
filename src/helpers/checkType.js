const { getType } = require('./getType');
const { createEnum } = require('../methods/enum');

const typeEnum = createEnum({
  object: 'Object',
  array: 'Array',
  number: 'Number',
  string: 'String',
  boolean: 'Boolean',
  function: 'Function',
  null: 'Null',
  regexp: 'RegExp',
  async: 'Async',
  promise: 'Promise',
  undefined: 'Undefined',
});

const checkType = (value, expectedType) => {
  const expected = typeEnum[expectedType.toLowerCase()];
  return getType(value) === expected;
};

module.exports = { checkType, typeEnum };
