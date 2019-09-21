import { matchesSchema } from '../../src/helpers/matchesSchema';

describe('matchesSchema', () => {
  it('detects if an object matches the provided schema', () => {
    const schema = {
      firstName: { _type: 'String' },
    };
    const target = {
      firstName: 'Daniel',
    };
    const badTarget = {
      firstName: 1,
    };
    const match = matchesSchema(schema)(target);
    const badMatch = matchesSchema(schema)(badTarget);
    expect(match.success).toBeTruthy();
    expect(match.error).toBeNull();
    expect(badMatch.success).toBeFalsy();
    expect(badMatch.error).toBe(
      'Error! Expected key "firstName" to be of type "String" but got type "Number"',
    );
  });
  it('deeply checks objects', () => {
    const schema = {
      meta: {
        config: {
          role: { _type: 'string' },
        },
      },
    };
    const target = {
      meta: {
        config: {
          role: 'admin',
        },
      },
    };
    const match = matchesSchema(schema)(target);
    expect(match.success).toBeTruthy();
    expect(match.error).toBeNull();
  });
  it('accepts a typeKey for the user to use in their schema', () => {
    const schema = {
      name: { '*type': 'String' },
    };
    const target = {
      name: 'Jim',
    };
    const match = matchesSchema(schema, '*type')(target);
    expect(match.success).toBeTruthy();
  });
  it('checks is schema and target share any keys', () => {
    const schema = { firstName: { _type: 'string' } };
    const target = { lastName: 'Schrute' };
    const match = matchesSchema(schema)(target);
    expect(match.success).toBeFalsy();
    expect(match.error).toBe('No keys are shared.');
  });
});
