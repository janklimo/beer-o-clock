import React from 'react';
import * as TimeUtils from '../utils/time.js';

export default React.createClass({
  getInitialState(){
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
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
  isBeerOClock() {
    let currentHour = new Date().getHours();
    return (currentHour > 11 && currentHour < 14) || (currentHour >= 17);
  },
  tick() {
    let endTime = this.nearestTreshold();
    let currentTime = new Date();
    let remainingTime = endTime - currentTime;

    let hoursLeft = parseInt((remainingTime)/3600000);
    let minutesLeft = parseInt((remainingTime)/60000);
    let secondsLeft = parseInt((remainingTime)/1000);

    minutesLeft = minutesLeft-hoursLeft*60;
    secondsLeft = secondsLeft-hoursLeft*3600-minutesLeft*60;

    this.setState({
      hours: TimeUtils.formatValue(hoursLeft),
      minutes: TimeUtils.formatValue(minutesLeft),
      seconds: TimeUtils.formatValue(secondsLeft),
      msLeft: remainingTime,
      isBeerOClock: this.isBeerOClock()
    });
  },
  nearestTreshold() {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();
    let currentDay = currentDate.getDate();
    let currentHour = currentDate.getHours();
    if (currentHour < 11) {
      return new Date(currentYear, currentMonth, currentDay, 11);
    } else if (currentHour >= 11 && currentHour < 14) {
      return new Date(currentYear, currentMonth, currentDay, 14);
    } else if (currentHour >= 14 && currentHour < 17) {
      return new Date(currentYear, currentMonth, currentDay, 17);
    } else if (currentHour >= 17) {
      return new Date(currentYear, currentMonth, currentDay + 1);
    }
  },
  render() {
    let { isBeerOClock, hours, minutes, seconds, msLeft } = this.state;
    let counterStyle, message;
    let messageOn = "Beer o'clock will be over in:";
    let messageOff = "Beer o'clock starts in:";

    // convey urgency when time remaining is < 15 min
    if (msLeft < 900000) {
      counterStyle = 'alert';
      if (isBeerOClock) {
        message = `Hurry up! ${messageOn}`;
      } else {
        message = `Get ready! ${messageOff}`;
      }
    } else {
      if (isBeerOClock) {
        counterStyle = 'win';
        message = messageOn;
      } else {
        counterStyle = 'fail';
        message = messageOff;
      }
    }

    let result = isBeerOClock ? 'YES!' : 'NO :('

    return <div>
      <h1 className={counterStyle}>{result}</h1>
      <h4>{message}</h4>
      <h3>{hours} : {minutes} : {seconds}</h3>
    </div>
  }
});
