import { Arr, between, findDiffs, getDiff } from "../utils";

export const parse = (text: string) =>
  text.split(/\n/).map((line) => line.split(" ").map(Number));

export const isSafe = (items: number[]) => {
  const differences: number[] = findDiffs(items);

  const increasing = differences.every((item) => item >= 1 && item <= 3);
  const decreasing = differences.every((item) => item <= -1 && item >= -3);

  return increasing || decreasing;
};

export const exercise1 = (text: string) => {
  const data = parse(text);

  return data.reduce((acc: number, line) => (isSafe(line) ? acc + 1 : acc), 0);
};

export const exercise2 = (text: string) => {
  const data = parse(text);

  return data.reduce((acc: number, line) => {
    const lineIsSafe = isSafe(line);
    let problemDampended = false;
    for (let i = 0; i < line.length; i++) {
      const removedLevel = [...line.slice(0, i), ...line.slice(i + 1)];
      if (isSafe(removedLevel)) {
        problemDampended = true;
        break;
      }
    }

    return lineIsSafe || problemDampended ? acc + 1 : acc;
  }, 0);
};
