const { assertType } = require('../../src/helpers/assertType');

describe('assertType', () => {
  it('returns a boolean if expected type and received types match', () => {
    expect(assertType([], 'array')).toBeTruthy();
    expect(assertType({}, 'array')).toBeFalsy();
    expect(assertType(() => ({}), 'function')).toBeTruthy();
    expect(assertType(() => ({}), 'object')).toBeFalsy();
    expect(assertType(null, 'null')).toBeTruthy();
    expect(assertType(null, 'boolean')).toBeFalsy();
    expect(assertType(true, 'boolean')).toBeTruthy();
    expect(assertType(true, 'string')).toBeFalsy();
    expect(assertType(1, 'number')).toBeTruthy();
    expect(assertType(1, 'array')).toBeFalsy();
  });
});
