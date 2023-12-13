import { Arr } from "../utils";

export const parse = (text: string) =>
  text.split(/\n\n/).map((i) => i.split(/\n/).map((i) => i.split("")));

export const lineRefects = (
  pattern: Array<string[]>,
  startIndex: number
): boolean => {
  let reflects = false;

  let rowAIndex = startIndex - 1;
  let rowBIndex = startIndex;
  while (true) {
    if (rowAIndex === -1 || rowBIndex === pattern.length) {
      break;
    }
    const rowA = new Arr(pattern[rowAIndex]);
    const rowB = new Arr(pattern[rowBIndex]);

    if (rowA.equals(rowB)) {
      reflects = true;
    } else {
      reflects = false;
      break;
    }

    rowAIndex -= 1;
    rowBIndex += 1;
  }

  return reflects;
};

export const patternReflects = (pattern: Array<string[]>, dir: "h" | "v") => {
  const calc = dir === "h" ? (x: number) => 100 * x : (x: number) => x;
  let val = 0;

  for (let i = 0; i < pattern.length; i++) {
    if (lineRefects(pattern, i)) {
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
};
