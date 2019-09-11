const {
  stringLog,
  stringError,
  yieldError,
  objectMessage,
} = require('../../src/helpers/typeErrorMessages');

global.console = {
  error: jest.fn(),
};
describe('typeErrorMessages', () => {
  it('should log or throw', () => {
    yieldError(objectMessage)('hi', []);
    expect(global.console.error).toHaveBeenCalledWith(
      '"hi" must be of type object but received array',
    );
  });
  describe('strings', () => {
    it('should log', () => {
      stringLog('path', 1);
      expect(global.console.error).toHaveBeenCalledWith(
        '"path" must be of type string but received number',
      );
    });
    it('should throw error', () => {
      expect(() => stringError('path', 1)).toThrowError(
        '"path" must be of type string but received number',
      );
    });
  });
});
