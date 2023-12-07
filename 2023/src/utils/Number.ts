export const isNumber = (val: any) => val && !Number.isNaN(Number(val));

export const between = (x: number, min: number, max: number) =>
  x >= min && x <= max;

export const isOdd = (x: number) => !!(x % 2);
