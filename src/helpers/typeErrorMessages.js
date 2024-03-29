const { getType } = require('./getType');
const { typeEnum, checkType } = require('./checkType');

const yieldError = (message, shouldThrow) => (...args) => {
  const messageToYield = checkType(message, 'function')
    ? message(...args)
    : message;
  if (shouldThrow) {
    throw new Error(messageToYield);
  }
  // eslint-disable-next-line
  console.error(messageToYield);
};

const typeErrorMessage = (expectedType) => (param, value) => {
  return `"${param}" must be of type ${expectedType} but received ${getType(
    value,
  )}`;
};

const stringMessage = typeErrorMessage(typeEnum.string);
const objectMessage = typeErrorMessage(typeEnum.object);
const arrayMessage = typeErrorMessage(typeEnum.array);
const numberMessage = typeErrorMessage(typeEnum.number);
const boolMessage = typeErrorMessage(typeEnum.boolean);
const funcMessage = typeErrorMessage(typeEnum.function);

const stringLog = (param, value) => yieldError(stringMessage)(param, value);
const objectLog = (param, value) => yieldError(objectMessage)(param, value);
const arrayLog = (param, value) => yieldError(arrayMessage)(param, value);
const numberLog = (param, value) => yieldError(numberLog)(param, value);
const boolLog = (param, value) => yieldError(boolMessage)(param, value);
const funcLog = (param, value) => yieldError(funcMessage)(param, value);

const stringError = (param, value) =>
  yieldError(stringMessage, true)(param, value);
const objectError = (param, value) =>
  yieldError(objectMessage, true)(param, value);
const arrayError = (param, value) =>
  yieldError(arrayMessage, true)(param, value);
const numberError = (param, value) => yieldError(numberLog, true)(param, value);
const boolError = (param, value) => yieldError(boolMessage, true)(param, value);
const funcError = (param, value) => yieldError(funcMessage, true)(param, value);

module.exports = {
  yieldError,
  typeErrorMessage,
  stringMessage,
  objectMessage,
  arrayMessage,
  numberMessage,
  boolMessage,
  funcMessage,
  stringLog,
  objectLog,
  arrayLog,
  numberLog,
  boolLog,
  funcLog,
  stringError,
  objectError,
  arrayError,
  numberError,
  boolError,
  funcError,
};
