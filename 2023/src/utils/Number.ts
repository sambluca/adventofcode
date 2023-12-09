import { Arr } from ".";

export const isNumber = (val: any) => val && !Number.isNaN(Number(val));

export const between = (x: number, min: number, max: number) =>
  x >= min && x <= max;

export const isOdd = (x: number) => !!(x % 2);

// find greateset common divisor
export const findGcd = (a, b) => {
  if (a == 0) return b;
  return findGcd(b % a, a);
};

// find lowest common multiplier between two numbers
export const findLcm = (a, b) => (a * b) / findGcd(a, b);

// returns array of diffs between numbers which is used to extrapolate
export const findDiffs = (numbers: number[]) => {
  const diffs = [];
  numbers.forEach((num, i) => {
    if (i !== numbers.length - 1) {
      const diff = numbers[i + 1] - num;
      diffs.push(diff);
    }
  });

  return diffs;
};

// returns next item in sequence
export const extrapolate = (numbers: number[]) => {
  const history = new Arr([numbers]);
  let diffs = new Arr([]);

  while (true) {
    if (
      Object.keys(diffs.instances).length === 1 &&
      Object.keys(diffs.instances)[0] === "0"
    ) {
      break;
    }

    const diff = findDiffs(history[history.length - 1]);
    history.push(diff);
    diffs = new Arr(diff);
  }

  return history.reverse().reduce((acc, curr) => {
    return acc + curr[curr.length - 1];
  }, 0);
};
