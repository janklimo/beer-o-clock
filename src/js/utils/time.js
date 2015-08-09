export function formatValue(val) {
  let formatted;
  if (val.toString().length == 1) {
    formatted = `0${val}`;
    return formatted;
  } else return val;
}
