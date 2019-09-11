import { matchesSchema } from '../../src/methods/matchesSchema';

describe('matchesSchema', () => {
  it('detects if an object matches the provided schema', () => {
    const schema = {
      firstName: { _type: 'string' },
    };
    const target = {
      firstName: 'Daniel',
    };
    const badTarget = {
      firstName: 1,
    };
    const match = matchesSchema(target, schema);
    const badMatch = matchesSchema(badTarget, schema);
    expect(match.success).toBeTruthy();
    expect(match.error).toBeNull();
    expect(badMatch.success).toBeFalsy();
    expect(badMatch.error).toBe(
      'Error! Expected key "firstName" to be of type "string" but got type "number"',
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
    const match = matchesSchema(target, schema);
    expect(match.success).toBeTruthy();
    expect(match.error).toBeNull();
  });
});
