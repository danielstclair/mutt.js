const { isFunction } = require('../../src/helpers/isFunction');

describe('isFunction', () => {
  it('checks if value is a function', () => {
    const func1 = () => 'Parliament';
    function func2() {
      return 'James Brown';
    }
    const notFunc = 'Enya';
    expect(isFunction(func1)).toBeTruthy();
    expect(isFunction(func2)).toBeTruthy();
    expect(isFunction(notFunc)).toBeFalsy();
  });
});
