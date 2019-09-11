const {
  matchTargetToSchema,
} = require('../../src/methods/matchTargetToSchema');

describe('matchTargetToSchema', () => {
  it('accepts a target and a schema and returns a new object with the shape of the schema', () => {
    const schema = {
      firstName: { _type: 'string' },
    };
    const officeWorker = {
      firstName: 'jim',
      lastName: 'halpert',
    };
    const newWorker = matchTargetToSchema(officeWorker, schema);
    expect(newWorker.firstName).toBe('jim');
    expect(newWorker.lastName).toBeFalsy();
  });
  it('should handle deeply nested objects', () => {
    const schema = {
      firstName: { _type: 'string' },
      _meta: {
        actor: {
          name: { _type: 'string' },
          currentRole: { _type: 'string' },
        },
      },
      hobbies: { _type: 'array' },
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
    const newWorker = matchTargetToSchema(officeWorker, schema);
    expect(newWorker.hobbies[0]).toBe('sports');
    expect(newWorker._meta.actor.name).toBe('John Krazinsky');
    expect(newWorker._meta.actor.spouse).toBeFalsy();
  });
  it('should throw an error if a type does not match', () => {
    const schema = {
      id: { _type: 'string' },
    };
    const officeWorker = {
      id: 1,
    };
    expect(() => matchTargetToSchema(officeWorker, schema)).toThrow(
      'Error! Expected key "id" to be of type "string" but got type "number"',
    );
  });
});
