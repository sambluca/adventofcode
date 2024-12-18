export const parse = (text: string) =>
  text.split(/\n/).map((line) => line.split("x").map(Number)) as [
    number,
    number,
    number
  ][];

const add = (acc: number, i: number) => acc + 2 * i;

export const exercise1 = (text: string) =>
  parse(text).reduce(
    (acc, [l, w, h]) =>
      acc +
      [l * w, w * h, h * l].reduce(add, 0) +
      Math.min(...[l * w, w * h, h * l]),
    0
  );

export const exercise2 = (text: string) =>
  parse(text).reduce(
    (acc, [l, w, h]) =>
      acc +
      l * w * h +
      [l, w, h]
        .sort((a, b) => a - b)
        .slice(0, 2)
        .reduce(add, 0),
    0
  );
