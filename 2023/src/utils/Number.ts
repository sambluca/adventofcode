export const isNumber = (val: any) => val && !Number.isNaN(Number(val));

export const between = (x: number, min: number, max: number) =>
  x >= min && x <= max;

export const isOdd = (x: number) => !!(x % 2);

export const findGcd = (a, b) => {
  if (a == 0) return b;
  return findGcd(b % a, a);
};

export const findLcm = (a, b) => (a * b) / findGcd(a, b);
