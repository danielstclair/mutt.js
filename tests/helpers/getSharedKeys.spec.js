const { getSharedKeys } = require('../../src/helpers/getSharedKeys');

describe('getSharedKeys', () => {
  it('returns an array of shared keys between two objects', () => {
    const objA = { a: true };
    const objB = { a: false };
    const objC = { hi: 'there' };
    expect(getSharedKeys(objA, objB)).toHaveLength(1);
    expect(getSharedKeys(objA, objC)).toHaveLength(0);
  });
});
