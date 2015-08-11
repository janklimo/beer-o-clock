jest.dontMock('../src/js/utils/time.js');

describe('formatValue', () => {
  let TimeUtils = require('../src/js/utils/time.js');
  it('processes 1 char input', () => {
    let output = TimeUtils.formatValue(1);
    expect(output).toBe('01');
  });
  it('processes 2 char input', () => {
    let output = TimeUtils.formatValue(12);
    expect(output).toBe(12);
  });
});
