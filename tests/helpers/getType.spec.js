const { getType } = require('../../src/helpers/getType');

describe('getType', () => {
  it('returns the type of the target', () => {
    expect(getType([])).toBe('Array');
    expect(getType({})).toBe('Object');
    expect(getType(() => ({}))).toBe('Function');
    expect(getType(null)).toBe('Null');
    expect(getType(1)).toBe('Number');
    expect(getType('1')).toBe('String');
    expect(getType(false)).toBe('Boolean');
  });
});
