export const parse = (text: string) =>
  text.split(/\n/).map((i) => i.split("").map(Number));

const findFullVoltage = (
  batteries: number[],
  xBatteriesLeft: number,
  finalBatteryLength: number = 12,
  num: number = 0
) => {
  const length = batteries.length - xBatteriesLeft;
  const batteriesToCheck = batteries.slice(0, length + 1);

  const maximum = Math.max(...batteriesToCheck);
  const maxIndex = batteriesToCheck.findIndex((i) => i === maximum);
  const restOfBatteries = batteries.slice(maxIndex + 1, batteries.length);

  const fullNumber = Number(`${num}${maximum}`);

  if (fullNumber.toString().length === finalBatteryLength) return fullNumber;

  return findFullVoltage(
    restOfBatteries,
    xBatteriesLeft - 1,
    finalBatteryLength,
    fullNumber
  );
};

export const exercise1 = (text: string) => {
  const data = parse(text);
  const voltages = data.map((i) => findFullVoltage(i, 2, 2));

  return voltages.reduce((a, b) => a + b, 0);
};

export const exercise2 = (text: string) => {
  const data = parse(text);
  const voltages = data.map((i) => findFullVoltage(i, 12));
  return voltages.reduce((a, b) => a + b, 0);
};
