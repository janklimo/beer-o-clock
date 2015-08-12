import React from 'react';

export default React.createClass({
  render() {
    let { isBeerOClock, hLeft, mLeft, sLeft, msLeft } = this.props;
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
