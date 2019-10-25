function getType(val) {
  const typeOf = typeof val;

  if (val === null) {
    return 'Null';
  }
  if (val === undefined) {
    return 'Undefined';
  }
  if (typeOf === 'boolean') {
    return 'Boolean';
  }
  if (typeOf === 'number') {
    return Number.isNaN(val) ? 'NaN' : 'Number';
  }
  if (typeOf === 'string') {
    return 'String';
  }
  if (Array.isArray(val)) {
    return 'Array';
  }
  if (val instanceof RegExp) {
    return 'RegExp';
  }

  if (val instanceof Date) {
    return 'Date';
  }

  const asStr = val.toString();

  if (asStr.startsWith('async')) {
    return 'Async';
  }
  if (asStr === '[object Promise]') {
    return 'Promise';
  }
  if (typeOf === 'function') {
    return 'Function';
  }
  return 'Object';
}

module.exports = { getType };
