const isFunction = (targetFunction) =>
  targetFunction && {}.toString.call(targetFunction) === '[object Function]';

module.exports = { isFunction };
