const mix = (a: bigint, b: bigint) => BigInt(a) ^ BigInt(b);

const prune = (a: bigint) => BigInt(a) % 16777216n;

export const parse = (text: string) => text.split(/\n/).map(BigInt);

const getSecretNumber = (value: bigint, count: number = 0) => {
  if (count === 2000) return value;
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

  return getSecretNumber(secretNumber, count + 1);
};

export const exercise1 = (text: string) => {
  const data = parse(text);

  return data.reduce((acc, item) => acc + getSecretNumber(item), 0n).toString();
};

export const exercise2 = (text: string) => {
  const data = parse(text);
  return data.reduce((acc, item) => acc + getSecretNumber(item), 0n).toString();
};
