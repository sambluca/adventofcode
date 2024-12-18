const moves = {
  "(": 1,
  ")": -1,
};

export const parse = (text: string) => text.split("") as ("(" | ")")[];

export const exercise1 = (text: string) =>
  parse(text).reduce((acc, dir) => acc + moves[dir], 0);

export const exercise2 = (text: string) => {
  const data = parse(text);
  let floor = 0;
  for (let [index, dir] of data.entries()) {
    floor += moves[dir];
    if (floor < 0) return index + 1;
  }
};
