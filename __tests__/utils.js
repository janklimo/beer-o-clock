jest.dontMock('../src/js/utils/time.js');

describe('Utils', () => {
  let TimeUtils = require('../src/js/utils/time.js');
  describe('formatValue', () => {
    it('processes 1 char input', () => {
      let output = TimeUtils.formatValue(1);
      expect(output).toBe('01');
    });
    it('processes 2 char input', () => {
      let output = TimeUtils.formatValue(12);
      expect(output).toBe(12);
    });
  });

  describe('nearestLimit', () => {
    it('identifies the 1st limit of the day as 11', () => {
      let time = new Date(2015, 8, 11, 0, 5, 1);
      let output = TimeUtils.nearestLimit(time);
      expect(output.getTime()).toEqual(new Date(2015, 8, 11, 11).getTime());
    });
    it('identifies the 2nd limit of the day as 14', () => {
      let time = new Date(2015, 8, 11, 11, 5, 1);
      let output = TimeUtils.nearestLimit(time);
      expect(output.getTime()).toEqual(new Date(2015, 8, 11, 14).getTime());
    });
    it('identifies the 3rd limit of the day as 17', () => {
      let time = new Date(2015, 8, 11, 14, 0, 1);
      let output = TimeUtils.nearestLimit(time);
      expect(output.getTime()).toEqual(new Date(2015, 8, 11, 17).getTime());
    });
    it('identifies the last limit of the day as midnight', () => {
      let time = new Date(2015, 8, 11, 17, 0, 1);
      let output = TimeUtils.nearestLimit(time);
      expect(output.getTime()).toEqual(new Date(2015, 8, 12).getTime());
    });
  });
});
