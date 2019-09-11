const { getType } = require('./getType');
const { createEnum } = require('../methods/enum');

const typeEnum = createEnum({
  object: 'object',
  array: 'array',
  number: 'number',
  string: 'string',
  boolean: 'boolean',
  function: 'function',
  null: 'null',
});

const assertType = (value, expectedType) => {
  const expected = typeEnum[expectedType.toLowerCase()];
  return getType(value) === expected;
};

module.exports = { assertType };
