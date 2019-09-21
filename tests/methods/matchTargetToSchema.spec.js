const {
  matchTargetToSchema,
} = require('../../src/methods/matchTargetToSchema');

describe('matchTargetToSchema', () => {
  it('accepts a target and a schema and returns a new object with the shape of the schema', () => {
    const schema = {
      firstName: { _type: 'String' },
    };
    const officeWorker = {
      firstName: 'jim',
      lastName: 'halpert',
    };
    const newWorker = matchTargetToSchema(schema)(officeWorker);
    expect(newWorker.firstName).toBe('jim');
    expect(newWorker.lastName).toBeFalsy();
  });
  it('should handle deeply nested objects', () => {
    const schema = {
      firstName: { _type: 'String' },
      _meta: {
        actor: {
          name: { _type: 'String' },
          currentRole: { _type: 'String' },
        },
      },
      hobbies: { _type: 'Array' },
    };
    const officeWorker = {
      firstName: 'jim',
      lastName: 'halpert',
      hobbies: ['sports'],
      _meta: {
        actor: {
          name: 'John Krazinsky',
          currentRole: 'Jack Ryan',
          spouse: 'Emily Blunt',
        },
        test: 1,
      },
    };
    const newWorker = matchTargetToSchema(schema)(officeWorker);
    expect(newWorker.hobbies[0]).toBe('sports');
    // eslint-disable-next-line
    expect(newWorker._meta.actor.name).toBe('John Krazinsky');
    // eslint-disable-next-line
    expect(newWorker._meta.actor.spouse).toBeFalsy();
  });
  it('should throw an error if a type does not match', () => {
    const schema = {
      id: { _type: 'String' },
    };
    const officeWorker = {
      id: 1,
    };
    expect(() => matchTargetToSchema(schema)(officeWorker)).toThrow(
      'Error! Expected key "id" to be of type "String" but got type "Number"',
    );
  });
});
