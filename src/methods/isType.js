const { matchesSchema } = require('../helpers/matchesSchema');
const { getType } = require('../helpers/getType');
const { checkType } = require('../helpers/checkType');
// const {
//   yieldError,
//   typeErrorMessage,
// } = require('../helpers/typeErrorMessages');

const isType = (...types) => (target, options) => {
  if (!types || !checkType(types, 'array')) {
    throw new Error(
      'At least one or more types should be passed in the "isType" function',
    );
  }
  // const errorMethod = options ? options.errorMethod :
  let matchesType;
  while (types.length > 0) {
    const currentType = types.pop();
    const metaType = getType(currentType);
    switch (metaType) {
      case 'String': {
        const curr = currentType.length ? currentType : metaType;
        matchesType = checkType(target, curr);
        break;
      }
      case 'Object': {
        const prefix = options ? options.prefix : '_type';
        // TODO this is messy
        matchesType = matchesSchema(currentType, prefix)(target).success;
        break;
      }
      case 'Array': {
        // TODO
        matchesType = true;
        break;
      }
      default: {
        matchesType = checkType(target, metaType);
        break;
      }
    }
    if (matchesType) return matchesType;
  }
  return matchesType;
};

module.exports = { isType };
