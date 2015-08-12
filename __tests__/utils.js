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
      expect(output).toEqual(new Date(2015, 8, 11, 11));
    });
    it('identifies the 2nd limit of the day as 14', () => {
      let time = new Date(2015, 8, 11, 11, 5, 1);
      let output = TimeUtils.nearestLimit(time);
      expect(output).toEqual(new Date(2015, 8, 11, 14));
    });
    it('identifies the 3rd limit of the day as 17', () => {
      let time = new Date(2015, 8, 11, 14, 0, 1);
      let output = TimeUtils.nearestLimit(time);
      expect(output).toEqual(new Date(2015, 8, 11, 17));
    });
    it('identifies the last limit of the day as midnight', () => {
      let time = new Date(2015, 8, 11, 17, 0, 1);
      let output = TimeUtils.nearestLimit(time);
      expect(output).toEqual(new Date(2015, 8, 12));
    });
  });

  describe('isBeerOClock', () => {
    it('identifies the 1st period as falsy', () => {
      let time = new Date(2015, 8, 11, 0, 5, 1);
      let output = TimeUtils.isBeerOClock(time);
      expect(output).toBeFalsy();
    });
    it('identifies the 2nd period as truthy', () => {
      let time = new Date(2015, 8, 11, 11, 5, 1);
      let output = TimeUtils.isBeerOClock(time);
      expect(output).toBeTruthy();
    });
    it('identifies the 3rd period as falsy', () => {
      let time = new Date(2015, 8, 11, 14, 0, 1);
      let output = TimeUtils.isBeerOClock(time);
      expect(output).toBeFalsy();
    });
    it('identifies the last limit of the day as midnight', () => {
      let time = new Date(2015, 8, 11, 17, 0, 1);
      let output = TimeUtils.isBeerOClock(time);
      expect(output).toBeTruthy();
    });
  });
  describe('fetchCountdown', () => {
    it('returns the right object', () => {
      let current = new Date(2015, 8, 11, 20, 10, 5);
      let limit = new Date(2015, 8, 12);
      let output = TimeUtils.fetchCountdown(current, limit);
      let { hLeft, mLeft, sLeft, msLeft, isBeerOClock } = output;
      expect(hLeft).toEqual('03');
      expect(mLeft).toEqual(49);
      expect(sLeft).toEqual(55);
      expect(msLeft).toEqual(13795000);
      expect(isBeerOClock).toBeTruthy();
    });
  });
});
