import { memoize } from "../utils/memoize";

interface Spring {
  combo: number[];
  springs: string;
}

export const parse = (text: string): Spring[] =>
  text.split(/\n/).map((i) => {
    const [springs, oC] = i.split(" ");

    const combo = oC.split(",").map(Number);

    return { combo, springs };
  });

export const countPossibilities = memoize(({ springs, combo }: Spring) => {
  if (springs === "") {
    if (combo.length === 0) return 1;

    return 0;
  }

  if (combo.length === 0) {
    if (springs.includes("#")) {
      return 0;
    }
    return 1;
  }

  let result = 0;

  if (springs[0] === "?" || springs[0] === ".") {
    result += countPossibilities({ springs: springs.substring(1), combo });
  }

  if (springs[0] === "?" || springs[0] === "#") {
    if (
      combo[0] <= springs.length &&
      !springs.substring(0, combo[0]).includes(".") &&
      (combo[0] === springs.length || springs[combo[0]] !== "#")
    ) {
      if (combo[0] === springs.length) {
        result += countPossibilities({ springs: "", combo: combo.slice(1) });
      } else {
        result += countPossibilities({
          springs: springs.substring(combo[0] + 1),
          combo: combo.slice(1),
        });
      }
    }
  }

  return result;
});

export const exercise1 = (text: string) => {
  const data = parse(text);

  return data.reduce((acc, curr) => acc + countPossibilities(curr), 0);
};

export const exercise2 = (text: string) => {
  const data = parse(text).map(({ springs, combo }) => {
    return {
      springs: [
        ...springs,
        "?",
        ...springs,
        "?",
        ...springs,
        "?",
        ...springs,
        "?",
        ...springs,
      ].join(""),
      combo: [...combo, ...combo, ...combo, ...combo, ...combo],
    };
  });

  return data.reduce((acc, curr) => acc + countPossibilities(curr), 0);
};
