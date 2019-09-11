const { readOnly } = require('./readOnly');

const createEnum = (target) =>
  readOnly(
    new Proxy(target, {
      get: (obj, prop) => {
        if (prop in obj) {
          return Reflect.get(obj, prop);
        }
        throw new ReferenceError(`Unknown prop "${prop}"`);
      },
    }),
  );

module.exports = { createEnum };
