import {
  createRange,
  cut,
  findIntersectionRange,
  intersects,
} from "../range/utils";
import { IRange } from "../types";
import { between, checkForValidNumber, isOdd } from "../utils";

type MapData = {
  startingNumber: number;
  start: number;
  rangeLength: number;
};

export const splitLine = (text: string): MapData => {
  const [startingNumber, start, length] = text.split(/\s/).map(Number);

  return {
    startingNumber,
    start,
    rangeLength: length,
  };
};

export const getRange = (text: string): IRange => {
  const { startingNumber, start, rangeLength } = splitLine(text);

  return createRange({ start, rangeLength, offset: startingNumber });
};
export const getSeeds = (text: string) =>
  text
    .replace(/(seeds:)/, "")
    .split(/\s/)
    .filter(checkForValidNumber)
    .map(Number);

export const getSeedsRanges = (seeds: number[]): IRange[] =>
  seeds
    .reduce((acc: IRange[], curr, index) => {
      const [...copy] = acc;
      if (!isOdd(index)) {
        const obj = copy[index - 1];

        copy[index] = {
          ...obj,
          start: curr,
        };
      } else {
        const obj = copy[index - 1];
        copy[index - 1] = {
          ...obj,
          end: curr - 1 + obj.start,
        };
      }

      return copy;
    }, [])
    .filter((i) => i);

export const getMaps = (data: string[]) => {
  let prevId = "";
  const res: { [key: string]: IRange[] } = {};

  data.forEach((line) => {
    if (line.includes("map:")) {
      prevId = line;
    } else {
      const arr = res[prevId] || [];
      arr.push(getRange(line));
      res[prevId] = arr;
    }
  });

  return res;
};

export const getSoilNumberFromSeeds = (
  seed: number,
  ranges: IRange[]
): number => {
  const [...copyRanges] = ranges;
  return copyRanges.reduce((acc, curr) => {
    const { start, end, offset } = curr;

    if (between(seed, start, end) && offset) {
      copyRanges.splice(1);
      return seed - start + offset;
    }

    return seed;
  }, 0);
};

export const goThroughSteps = (
  seed: number,
  steps: string[],
  maps: { [key: string]: IRange[] }
) => {
  console.log("seed", seed);
  const v = steps.reduce((acc, curr) => {
    console.log("curr", curr);
    console.log("acc", acc);

    return getSoilNumberFromSeeds(acc, maps[curr]);
  }, seed);

  return v;
};
export const getSeedRangeValues = ({ start, end }: IRange) => {
  const rangeLength = end - start + 1;

  return [...Array(rangeLength).keys()].map((x) => x + start);
};

export const getAllSeedRangeValues = (seedRanges: IRange[]): number[] =>
  seedRanges
    .reduce((acc: number[], curr) => {
      const values = getSeedRangeValues(curr);

      return [...acc, ...values];
    }, [])
    .reduce((acc: number[], val) => {
      if (!acc.includes(val)) {
        return [...acc, val];
      }

      return [...acc];
    }, []);

export const setUpData = (input: string) => {
  const [seed, ...rest] = input
    .trim()
    .split(/\n/g)
    .filter((i) => i !== "");
  const seedArray = getSeeds(seed);
  const maps = getMaps(rest);
  const steps = Object.keys(maps);

  return { seedArray, steps, maps };
};
export const exercise1 = (input: string) => {
  const { seedArray, steps, maps } = setUpData(input);

  const values = seedArray.map((seed) => goThroughSteps(seed, steps, maps));

  return Math.min(...values);
};

export const exercise2 = (input: string) => {
  const { seedArray, steps, maps } = setUpData(input);
  const seedRanges = getSeedsRanges(seedArray);

  const mapRanges = Object.keys(maps).reduce(
    (acc, key) => [...acc, ...maps[key]],
    []
  );

  const values: number[] = [];

  const xValue: IRange[] = seedRanges.reduce(
    (acc, range) => [
      ...acc,
      ...mapRanges.reduce((acc: IRange[], curr) => {
        // console.log("here?", curr, range, findIntersectionRange(curr, range));
        if (intersects(curr, range))
          acc.push(findIntersectionRange(curr, range));
        return acc;
      }, []),
    ],
    []
  );

  const curr = { start: 0, end: 68, offset: 1 };
  const range = { start: 55, end: 67 };
  // console.log("cut(curr, range)", cut(curr, range));
  // [ { start: 0, end: 54 }, { start: 68, end: 68 } ]
  // console.log("xValue", xValue);
  for (let i = 0; i < xValue.length; i++) {
    // console.log("xValue[i]", xValue[i]);

    const seedValues = getAllSeedRangeValues([xValue[i]]);
    // console.log("seedValues", seedValues);

    const value = seedValues.reduce((acc, seed) => {
      const v = goThroughSteps(seed, steps, maps);
      // console.log("seed", seed);
      // console.log("v", v);

      return acc < v ? acc : v;
    }, goThroughSteps(seedArray[0], steps, maps));
    values.push(value);
  }

  // console.log("values", values);
  return Math.min(...values);
};
