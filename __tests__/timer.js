jest.dontMock('../src/js/components/timer.jsx');

describe('Timer', () => {
  let Timer = require('../src/js/components/timer.jsx');
  let React = require('react/addons');
  let TestUtils = React.addons.TestUtils;
  describe('countdown', () => {
    it('displays time correctly', () => {
      let data = { hLeft: '01', mLeft: '02', sLeft: '03' };
      let testTimer = TestUtils.renderIntoDocument(<Timer {...data} />);
      expect(React.findDOMNode(testTimer).textContent)
        .toContain('01 : 02 : 03');
    });;
  });
  describe('result', () => {
    it('displays time correctly', () => {
      let data = { hLeft: '01', mLeft: '02', sLeft: '03' };
      let testTimer = TestUtils.renderIntoDocument(<Timer {...data} />);
      expect(React.findDOMNode(testTimer).textContent)
        .toContain('01 : 02 : 03');
    });
    describe('is it beer oclock?', () => {
      it('displays YES correctly', () => {
        let data = { isBeerOClock: true };
        let testTimer = TestUtils.renderIntoDocument(<Timer {...data} />);
        expect(React.findDOMNode(testTimer).textContent).toContain('YES!');
      });
      it('displays NO correctly', () => {
        let data = { isBeerOClock: false };
        let testTimer = TestUtils.renderIntoDocument(<Timer {...data} />);
        expect(React.findDOMNode(testTimer).textContent).toContain('NO :(');
      });
    });
    describe('styling', () => {
      it('renders red when beer oclock is off', () => {
        let data = { isBeerOClock: false };
        let testTimer = TestUtils.renderIntoDocument(<Timer {...data} />);
        let res = TestUtils.findRenderedDOMComponentWithTag(testTimer, 'h1');
        let mes = TestUtils.findRenderedDOMComponentWithTag(testTimer, 'h4');
        expect(res.props.className).toEqual('fail');
        expect(mes.props.children).toEqual('Beer o\'clock starts in:');
      });
      it('renders green when beer oclock is on', () => {
        let data = { isBeerOClock: true };
        let testTimer = TestUtils.renderIntoDocument(<Timer {...data} />);
        let res = TestUtils.findRenderedDOMComponentWithTag(testTimer, 'h1');
        let mes = TestUtils.findRenderedDOMComponentWithTag(testTimer, 'h4');
        expect(res.props.className).toEqual('win');
        expect(mes.props.children).toEqual('Beer o\'clock will be over in:');
      });
      describe('limit is near', () => {
        it('renders orange and shows Hurry up message', () => {
          let data = { isBeerOClock: true, msLeft: 400000 };
          let testTimer = TestUtils.renderIntoDocument(<Timer {...data} />);
          let res = TestUtils.findRenderedDOMComponentWithTag(testTimer, 'h1');
          let mes = TestUtils.findRenderedDOMComponentWithTag(testTimer, 'h4');
          expect(res.props.className).toEqual('alert');
          expect(mes.props.children).toContain('Hurry up!');
        });
        it('renders orange and shows Get ready message', () => {
          let data = { isBeerOClock: false, msLeft: 400000 };
          let testTimer = TestUtils.renderIntoDocument(<Timer {...data} />);
          let res = TestUtils.findRenderedDOMComponentWithTag(testTimer, 'h1');
          let mes = TestUtils.findRenderedDOMComponentWithTag(testTimer, 'h4');
          expect(res.props.className).toEqual('alert');
          expect(mes.props.children).toContain('Get ready!');
        });
      });
    });
  });
});
