import { seal } from '../../src/methods/seal';

describe('seal', () => {
  const test = {
    firstName: 'Dan',
    email: 'test@tes.com',
    meta: {
      role: 'admin',
      _meta: {
        type: 'hidden',
      },
    },
  };
  const sealedTest = seal(test);
  it('Prevents object extension', () => {
    try {
      sealedTest.lastName = 'St. Clair';
    } catch (err) {
      expect(err.message).toBe(
        'Cannot add property lastName, object is not extensible',
      );
    }
  });
  it('Allows existing keys to be reassigned', () => {
    sealedTest.firstName = 'jim';
    expect(sealedTest.firstName).toBe('jim');
  });
});
