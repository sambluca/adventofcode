import { Arr } from "../utils";

export const parse = (text: string) =>
  text.split(/\n\n/).map((i) => i.split(/\n/).map((i) => i.split("")));

export const lineRefects = (
  pattern: Array<string[]>,
  startIndex: number,
  smudge?: boolean
): boolean => {
  let reflects = false;
  let smudgeFound = false;
  let rowAIndex = startIndex - 1;
  let rowBIndex = startIndex;

  while (true) {
    if (rowAIndex === -1 || rowBIndex === pattern.length) {
      if (smudge && smudgeFound) {
        reflects = true;
      }
      break;
    }
    const rowA = new Arr(pattern[rowAIndex]);
    const rowB = new Arr(pattern[rowBIndex]);

    if (!smudge) {
      if (rowA.equals(rowB)) {
        reflects = true;
      } else {
        reflects = false;
        break;
      }
    } else {
      if (
        !smudgeFound &&
        rowA.shallowDiffs(rowB, { orderMatters: true }).length === 2
      ) {
        smudgeFound = true;

        rowAIndex -= 1;
        rowBIndex += 1;
        continue;
      }

      if (smudgeFound) {
        if (rowA.equals(rowB)) {
          reflects = true;
        } else {
          reflects = false;
          break;
        }
      } else {
        if (!rowA.equals(rowB)) {
          break;
        }
      }
    }

    rowAIndex -= 1;
    rowBIndex += 1;
  }

  return reflects;
};

export const patternReflects = (
  pattern: Array<string[]>,
  dir: "h" | "v",
  smudge?: boolean
) => {
  const calc = dir === "h" ? (x: number) => 100 * x : (x: number) => x;
  let val = 0;

  for (let i = 0; i < pattern.length; i++) {
    if (lineRefects(pattern, i, smudge)) {
      val = calc(i);
      break;
    }
  }

  return val;
};
export const exercise1 = (text: string) =>
  parse(text).reduce((acc, pattern, i) => {
    const tranposed = new Arr(pattern).transpose();
    const h = patternReflects(pattern, "h");

    if (h !== 0) {
      return acc + h;
    }
    const v = patternReflects([...tranposed], "v");
    return acc + v;
  }, 0);

export const exercise2 = (text: string) => {
  const data = parse(text);
  const patterns = data.map((pattern) => {
    const h = patternReflects(pattern, "h", true);

    if (h !== 0) {
      return h;
    }
    const tranposed = new Arr(pattern).transpose();
    const v = patternReflects([...tranposed], "v", true);
    return v;
  });

  return patterns.reduce((acc, c) => acc + c, 0);
};

const me = [
  1100, 800, 1, 300, 1300, 9, 9, 4, 500, 1100, 600, 6, 15, 200, 700, 500, 400,
  1200, 9, 1600, 500, 4, 1500, 1, 400, 1000, 300, 7, 8, 10, 100, 1, 400, 700, 5,
  600, 6, 9, 12, 900, 500, 6, 500, 6, 100, 100, 600, 6, 3, 8, 1, 8, 8, 3, 900,
  400, 2, 200, 10, 600, 1000, 900, 8, 6, 700, 1400, 1, 9, 200, 2, 100, 1, 9,
  1200, 1, 5, 1, 1, 500, 1000, 1, 2, 100, 4, 14, 700, 3, 1100, 1200, 4, 400, 13,
  4, 1000, 3, 800, 400, 200, 11, 12,
];

const them = [
  1100, 800, 1, 300, 1300, 9, 9, 4, 500, 1100, 600, 6, 15, 200, 5, 500, 800,
  1200, 9, 1600, 500, 4, 1500, 1, 2, 1000, 300, 7, 8, 10, 100, 1, 400, 700, 5,
  600, 6, 9, 14, 900, 500, 6, 500, 6, 100, 100, 600, 6, 6, 10, 1, 8, 8, 3, 900,
  400, 2, 200, 10, 600, 1000, 900, 8, 6, 700, 1400, 1, 9, 200, 2, 100, 1, 9,
  1200, 1, 5, 1, 1, 500, 1000, 1, 2, 100, 4, 14, 700, 3, 1100, 1200, 4, 400, 13,
  4, 1000, 3, 800, 400, 200, 11, 12,
];
