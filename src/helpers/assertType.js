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
});

const assertType = (value, expectedType) => {
  const expected = typeEnum[expectedType.toLowerCase()];
  return getType(value) === expected;
};

module.exports = { assertType, typeEnum };
