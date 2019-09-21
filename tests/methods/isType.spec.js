const { isType } = require('../../src/methods/isType');

describe('isType', () => {
  it('determines if base types match', () => {
    expect(isType('number', 'string')(1)).toBeTruthy();
    expect(isType('number', 'string')('1')).toBeTruthy();
    expect(isType('null', 'string')('hi')).toBeTruthy();
    expect(isType('null', 'string')(null)).toBeTruthy();
    expect(isType('number', 'string')(false)).toBeFalsy();
    expect(isType('undefined')(undefined)).toBeTruthy();
    expect(isType('number', 'string', 'array')([])).toBeTruthy();
  });
  it('determines if an object matches a schema', () => {
    const schema1 = { name: { _type: 'string' } };
    const user1 = { lalala: 'lalala' };
    const user2 = { name: 'jim' };
    expect(isType(schema1)(user1)).toBeFalsy();
    expect(isType(schema1)(user2)).toBeTruthy();
  });
});
