module.exports = function ordinalize(num) {
  const n = parseInt(num);
  const twoDigits = n % 100;
  const num11to13 = twoDigits >= 11 && twoDigits <= 13;
  if (num11to13) {
    return n + 'th';
  }

  const oneDigits = n % 10;
  if (oneDigits === 1) {
    return n + 'st';
  }
  if (oneDigits === 2) {
    return n + 'nd';
  }
  if (oneDigits === 3) {
    return n + 'rd';
  }

  return n + 'th';
}
