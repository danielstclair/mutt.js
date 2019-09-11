const isObject = (target) =>
  !Array.isArray(target) && typeof target === 'object' && target !== null;

module.exports = { isObject };
