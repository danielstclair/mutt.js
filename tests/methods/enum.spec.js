const { createEnum } = require('../../src/methods/enum');

describe('createEnum', () => {
  it('should create an enum', () => {
    const sizes = {
      s: 'small',
      m: 'medium',
      l: 'large',
    };
    const sizesEnum = createEnum(sizes);
    expect(sizesEnum.s).toBeTruthy();
    expect(() => console.log(sizesEnum.fail)).toThrow('Unknown prop "fail"');
    expect(() => (sizesEnum.s = 'Small')).toThrow(
      "Can't modify read only values",
    );
  });
});
