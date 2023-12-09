import { extrapolate } from "../utils";

export const parse = (text: string) =>
  text.split(/\n/).map((item) => item.split(" ").map(Number));

export const exercise1 = (text: string) => {
  return parse(text)
    .map(extrapolate)
    .reduce((a, b) => a + b, 0);
};

export const exercise2 = (text: string) => {
  return parse(text)
    .map((arr) => arr.reverse())
    .map(extrapolate)
    .reduce((a, b) => a + b, 0);
};
