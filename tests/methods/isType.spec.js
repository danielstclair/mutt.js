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
    const schema1 = { name: isType('string') };
    const user1 = { lalala: 'lalala' };
    const user2 = { name: 'jim' };
    const test = isType(schema1)(user2);
    expect(isType(schema1)(user1)).toBeFalsy();
    expect(test).toBeTruthy();
  });

  it('handles a deeply nested object', () => {
    const schema = {
      name: isType('string'),
      meta: { email: isType('string') },
    };
    const user = { name: '1', meta: { email: 'test@test.com' } };
    expect(isType(schema)(user)).toBeTruthy();
  });

  it('handles an array', () => {
    const schema = [isType('string')];
    const target1 = ['Jack', 'Diane'];
    const target2 = ['Jack', 1];
    const test1 = isType(schema)(target1); // true
    const test2 = isType(schema)(target2); // true
    expect(test1).toBeTruthy();
    expect(test2).toBeFalsy();
  });
  it('handles array of schemas', () => {
    const userSchema = {
      user: {
        firstName: isType('string', 'null'),
        lastName: isType('string', 'null'),
      },
      auth: {
        token: isType(''), // shorthand
        tokenExpirationDate: isType('date'),
      },
    };

    const user1 = {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
      auth: {
        token: 'token',
        tokenExpirationDate: new Date(),
      },
    };
    const test = isType([isType(userSchema)])([user1]);
    expect(test).toBeTruthy();
  });
});
