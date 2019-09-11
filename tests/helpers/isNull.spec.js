const { isNull } = require('../../src/helpers/isNull');

describe('isNull', () => {
  it('returns a boolean telling is the target is null', () => {
    expect(isNull(null)).toBeTruthy();
    expect(isNull('')).toBeFalsy();
  });
});
