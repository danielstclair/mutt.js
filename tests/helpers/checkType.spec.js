const { checkType } = require('../../src/helpers/checkType');

describe('checkType', () => {
  it('returns a boolean if expected type and received types match', () => {
    expect(checkType([], 'array')).toBeTruthy();
    expect(checkType({}, 'array')).toBeFalsy();
    expect(checkType(() => ({}), 'function')).toBeTruthy();
    expect(checkType(() => ({}), 'object')).toBeFalsy();
    expect(checkType(null, 'null')).toBeTruthy();
    expect(checkType(null, 'boolean')).toBeFalsy();
    expect(checkType(true, 'boolean')).toBeTruthy();
    expect(checkType(true, 'string')).toBeFalsy();
    expect(checkType(1, 'number')).toBeTruthy();
    expect(checkType(1, 'array')).toBeFalsy();
  });
});
