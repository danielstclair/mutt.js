import { readOnly } from '../../src/methods/readOnly';

describe('readOnly', () => {
  it('creates a read only proxy', () => {
    const test = {
      firstName: 'jim',
      _meta: {
        actor: 'John Krazinsky',
      },
    };
    const readOnlyTest = readOnly(test);
    try {
      // eslint-disable-next-line
      readOnlyTest._meta.actor = 'dwight';
    } catch (e) {
      expect(e.message).toBe("Can't modify read only values");
    }
  });
});
