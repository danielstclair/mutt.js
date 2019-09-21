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
      '"hi" must be of type Object but received Array',
    );
  });
  describe('strings', () => {
    it('should log', () => {
      stringLog('path', 1);
      expect(global.console.error).toHaveBeenCalledWith(
        '"path" must be of type String but received Number',
      );
    });
    it('should throw error', () => {
      expect(() => stringError('path', 1)).toThrowError(
        '"path" must be of type String but received Number',
      );
    });
  });
});
