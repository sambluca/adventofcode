import { copy, findDiffs, getDiff } from "../utils";

// const toObject = (obj: any) => {
//   return JSON.parse(
//     JSON.stringify(
//       obj,
//       (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
//     )
//   );
// };

// function memoize<Args extends unknown[], Result>(
//   func: (...args: Args) => Result
// ): (...args: Args) => Result {
//   const stored = new Map<string, Result>();

//   return (...args) => {
//     const key = JSON.stringify(toObject(args));
//     if (stored.has(key)) {
//       return stored.get(key)!;
//     }
//     const result = func(...args);
//     stored.set(key, result);
//     return result;
//   };
// }

const mix = (a: bigint, b: bigint) => BigInt(a) ^ BigInt(b);

const prune = (a: bigint) => BigInt(a) % 16777216n;

export const parse = (text: string) => text.split(/\n/).map(BigInt);

const getSecretNumber = (
  value: bigint,
  count: number,
  digits: number[]
): [bigint, number[]] => {
  const lastDigit = Number(String(value).slice(-1));
  digits.push(lastDigit);
  if (count === 2000) return [value, digits];
  //   Calculate the result of multiplying the secret number by 64.
  let multiply = value * 64n;
  //  Then, mix this result into the secret number.
  // Finally, prune the secret number.
  let secretNumber = prune(mix(value, multiply));

  // Calculate the result of dividing the secret number by 32.
  let divide = secretNumber / 32n;
  // Round the result down to the nearest integer.
  let rounded = BigInt(Math.floor(Number(divide)));
  // Then, mix this result into the secret number.
  // Finally, prune the secret number.
  secretNumber = prune(mix(secretNumber, rounded));

  // Calculate the result of multiplying the secret number by 2048
  multiply = secretNumber * 2048n;
  // Then, mix this result into the secret number.
  // Finally, prune the secret number.
  secretNumber = prune(mix(secretNumber, multiply));

  return getSecretNumber(secretNumber, count + 1, digits);
};

export const exercise1 = (text: string) =>
  parse(text)
    .reduce((acc, item) => acc + getSecretNumber(item, 0, [])[0], 0n)
    .toString();

export const exercise2 = (text: string) => {
  const check: { [key: string]: number } = {};

  parse(text).forEach((v) => {
    const [value, digits] = getSecretNumber(v, 0, []);

    const diffs = [0, ...findDiffs(digits)];
    const numberCheck: { [key: string]: number } = {};
    for (let diffI = 0; diffI <= diffs.length; diffI++) {
      if (diffI + 4 > diffs.length) break;

      const firstDiff = diffs[diffI];
      const secondDiff = diffs[diffI + 1];
      const thirdDiff = diffs[diffI + 2];
      const fourthDiff = diffs[diffI + 3];

      const stringy = [firstDiff, secondDiff, thirdDiff, fourthDiff].join("");

      if (!numberCheck[stringy]) {
        const digit = digits[diffI + 3];
        numberCheck[stringy] = digit;
        if (!check[stringy]) {
          check[stringy] = 0;
        }

        check[stringy] += digit;
      }
    }
  });

  return Math.max(...Object.values(check));
};
