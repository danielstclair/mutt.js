const { isObject } = require('../../src/helpers/isObject');

describe('isObject', () => {
  it('checks if a target is an object', () => {
    class Test {}
    expect(isObject({})).toBeTruthy();
    expect(isObject('')).toBeFalsy();
    expect(isObject([])).toBeFalsy();
    expect(isObject(1)).toBeFalsy();
    expect(isObject(new Test())).toBeTruthy();
    expect(isObject(null)).toBeFalsy();
  });
});
