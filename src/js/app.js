import React from 'react';
import * as TimeUtils from './utils/time.js';
import Timer from './components/timer.jsx'

const App = React.createClass({
  getInitialState(){
    return {
      hLeft: 0,
      mLeft: 0,
      sLeft: 0,
      isBeerOClock: false,
      msLeft: 0
    };
  },
  componentDidMount(){
    this.tick();
    this.timer = setInterval(this.tick, 250);
  },
  componentWillUnmount(){
    clearInterval(this.timer);
  },
  tick() {
    let currentTime = new Date();
    let endTime = TimeUtils.nearestLimit(currentTime);

    let { hLeft, mLeft, sLeft, msLeft,
      isBeerOClock } = TimeUtils.fetchCountdown(currentTime, endTime);

    this.setState({ hLeft, mLeft, sLeft, msLeft, isBeerOClock });
  },
  render() {
    return <div>
      <h2>Is it beer o'clock yet?</h2>
      <Timer {...this.state} />
    </div>
  }
});

React.render( <App />, document.getElementById('app'));
