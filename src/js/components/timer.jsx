import React from 'react';

export default React.createClass({
  getInitialState(){
    return {
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  },
  componentDidMount(){
    this.tick();
    this.timer = setInterval(this.tick, 1000);
  },
  componentWillUnmount(){
    clearInterval(this.timer);
  },
  isBeerOClock() {
    let currentHour = new Date().getHours();
    return (currentHour > 11 && currentHour < 14) || (currentHour > 17);
  },
  formatValue(val) {
    let formatted;
    if (val.toString().length == 1) {
      formatted = `0${val}`;
      return formatted;
    } else return val;
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
      hours: this.formatValue(hoursLeft),
      minutes: this.formatValue(minutesLeft),
      seconds: this.formatValue(secondsLeft)
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
    let result = this.isBeerOClock() ? 'YES!' : 'NO :('

    return <div>
      <h3>{result}</h3>
      <h4>Time left:</h4>
      <p>{this.state.hours} : {this.state.minutes} : {this.state.seconds}</p>
    </div>
  }
});
