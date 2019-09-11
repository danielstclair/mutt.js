const { getType } = require('../../src/helpers/getType');

describe('getType', () => {
  it('returns the type of the target', () => {
    expect(getType([])).toBe('array');
    expect(getType({})).toBe('object');
    expect(getType(() => ({}))).toBe('function');
    expect(getType(null)).toBe('null');
    expect(getType(1)).toBe('number');
    expect(getType('1')).toBe('string');
    expect(getType(false)).toBe('boolean');
  });
});
