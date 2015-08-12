import React from 'react';
import * as TimeUtils from '../utils/time.js';

export default React.createClass({
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
    let { isBeerOClock, hLeft, mLeft, sLeft, msLeft } = this.state;
    let resultStyle, message;
    let messageOn = "Beer o'clock will be over in:";
    let messageOff = "Beer o'clock starts in:";

    // convey urgency when time remaining is < 15 min
    if (msLeft < 900000) {
      resultStyle = 'alert';
      if (isBeerOClock) {
        message = `Hurry up! ${messageOn}`;
      } else {
        message = `Get ready! ${messageOff}`;
      }
    } else {
      if (isBeerOClock) {
        resultStyle = 'win';
        message = messageOn;
      } else {
        resultStyle = 'fail';
        message = messageOff;
      }
    }

    let result = isBeerOClock ? 'YES!' : 'NO :('

    return <div>
      <h1 className={resultStyle}>{result}</h1>
      <h4>{message}</h4>
      <h3>{hLeft} : {mLeft} : {sLeft}</h3>
    </div>
  }
});
