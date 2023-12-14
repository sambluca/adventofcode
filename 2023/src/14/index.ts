import { Arr } from "../utils";
import { memoize } from "../utils/memoize";

export const parse = (text: string) => text.split(/\n/).map((i) => i.split(""));

export const moveLineEast = (line: Array<string>) =>
  line
    .join("")
    .split("#")
    .map((needToSort) =>
      needToSort
        .split("")
        .sort((a) => {
          if (a === "O") return 1;
          return -1;
        })
        .join("")
    )
    .join("#")
    .split("");

export const moveUp = memoize((data: Array<Array<string>>) => {
  const movedUp = new Arr(data).rotate().map(moveLineEast);

  const backInPlace = new Arr(movedUp).rotate({ dir: "anticlockwise" });
  return [...backInPlace].map((i) => [...i]);
});

export const cycle = memoize((data: Array<Array<string>>) => {
  // moveUp returns data original way up, rotate it again
  const dataNorth = [...new Arr(moveUp(data)).rotate().map((i) => [...i])];
  const dataWest = [...new Arr(moveUp(dataNorth)).rotate().map((i) => [...i])];
  const dataSouth = [...new Arr(moveUp(dataWest)).rotate().map((i) => [...i])];
  const dataEast = [...new Arr(moveUp(dataSouth)).rotate().map((i) => [...i])];

  return [...dataEast].map((i) => [...i]);
});

const getGridValue = (acc: number, row: string[], i: number) => {
  const rowValue = row.length - i;
  const oInRow = row.filter((x) => x === "O").length;
  const score = oInRow * rowValue;
  return acc + score;
};
export const exercise1 = (text: string) =>
  moveUp(parse(text)).reduce(getGridValue, 0);

export const exercise2 = (text: string, cycles = 0) => {
  const data = parse(text);
  const loops = [];
  let lastCycled = data;
  let loopBreak = 0;

  // cycle until we find the loop
  for (let i = 0; i < cycles; i++) {
    const cycled = cycle(lastCycled);
    lastCycled = cycled;

    if (loops.includes(JSON.stringify(cycled))) {
      loopBreak = i;
      break;
    }

    // acts as a cache
    loops.push(JSON.stringify(cycled));
  }

  // find where the loop starts
  const loopStart = loops.findIndex((i) => i === JSON.stringify(lastCycled));

  // find how long the loop is
  const loopLength = loopBreak - loopStart;

  // how many more times we had to go through the for loop  (-1 because arrays start from 0)
  const iterationsLeft = cycles - 1 - loopBreak;

  // figure out how many more loops we have left
  const remainingIterations = iterationsLeft % loopLength;

  for (let j = 0; j < remainingIterations; j++) {
    lastCycled = cycle(lastCycled);
  }

  return lastCycled.reduce(getGridValue, 0);
};
