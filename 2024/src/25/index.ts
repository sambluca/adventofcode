import { Arr } from "../utils";

export const parse = (text: string) => {
  const data = text
    .split(/\n\n/)
    .map((i) => i.split(/\n/).map((i) => i.split("")));

  const locks = data
    .filter((i) => i[0].includes("#"))
    .map((l) => new Arr(l).rotate())
    .map((i) => i.map((x) => new Arr(x).getInstances()["#"] - 1));
  const keys = data
    .filter((i) => i[0].includes("."))
    .map((l) => new Arr(l).rotate())
    .map((i) => i.map((x) => new Arr(x).getInstances()["#"] - 1));

  return { locks, keys };
};

export const exercise1 = (text: string) => {
  const { locks, keys } = parse(text);

  let overlaps = 0;

  locks.forEach((lock) => {
    keys.forEach((key) => {
      let good = true;
      key.forEach((number, kIndex) => {
        const lockNumber = lock[kIndex];
        if (lockNumber + number > 5) good = false;
      });
      if (good) overlaps += 1;
    });
  });

  return overlaps;
};
