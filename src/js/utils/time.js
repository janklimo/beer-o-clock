export function formatValue(val) {
  let formatted;
  if (val.toString().length == 1) {
    formatted = `0${val}`;
    return formatted;
  } else return val;
}

export function nearestLimit(date) {
  let currentYear = date.getFullYear();
  let currentMonth = date.getMonth();
  let currentDay = date.getDate();
  let currentHour = date.getHours();
  if (currentHour < 11) {
    return new Date(currentYear, currentMonth, currentDay, 11);
  } else if (currentHour >= 11 && currentHour < 14) {
    return new Date(currentYear, currentMonth, currentDay, 14);
  } else if (currentHour >= 14 && currentHour < 17) {
    return new Date(currentYear, currentMonth, currentDay, 17);
  } else if (currentHour >= 17) {
    return new Date(currentYear, currentMonth, currentDay + 1);
  }
}

export function isBeerOClock(date) {
  let currentHour = date.getHours();
  return (currentHour >= 11 && currentHour < 14) || (currentHour >= 17);
}

export function fetchCountdown(currentTime, limitTime) {
  let msLeft = limitTime - currentTime;
  let hLeft = parseInt((msLeft)/3600000);
  let mLeft = parseInt((msLeft)/60000);
  let sLeft = parseInt((msLeft)/1000);

  mLeft = mLeft - hLeft*60;
  sLeft = sLeft - hLeft*3600 - mLeft*60;

  return {
    hLeft: formatValue(hLeft),
    mLeft: formatValue(mLeft),
    sLeft: formatValue(sLeft),
    msLeft,
    isBeerOClock: isBeerOClock(currentTime)
  }
}
