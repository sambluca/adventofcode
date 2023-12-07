import { between, isNumber, isOdd } from "../utils";

type MapData = {
  startingNumber: number;
  rangeStart: number;
  rangeLength: number;
};

type RangeData = {
  rangeStart: number;
  rangeEnd: number;
  rangeOffsetStart: number;
};

type SeedRangeData = {
  rangeStart: number;
  rangeEnd: number;
};

export const splitLine = (text: string): MapData => {
  const [startingNumber, rangeStart, rangeLength] = text
    .split(/\s/)
    .map(Number);

  return {
    startingNumber,
    rangeStart,
    rangeLength,
  };
};

export const getRange = (text: string): RangeData => {
  const { startingNumber, rangeStart, rangeLength } = splitLine(text);

  return {
    rangeStart,
    rangeEnd: rangeStart + (rangeLength - 1),
    rangeOffsetStart: startingNumber,
  };
};
export const getSeeds = (text: string) =>
  text
    .replace(/(seeds:)/, "")
    .split(/\s/)
    .filter(isNumber)
    .map(Number);

export const getSeedsRanges = (seeds: number[]): SeedRangeData[] =>
  seeds
    .reduce((acc, curr, index) => {
      const [...copy]: any = acc;
      if (!isOdd(index)) {
        copy[index] = {
          rangeStart: curr,
        };
      } else {
        const obj = copy[index - 1];
        copy[index - 1] = {
          ...obj,
          rangeEnd: curr - 1 + obj.rangeStart,
        };
      }

      return copy;
    }, [])
    .filter((i) => i);

export const getMaps = (data: string[]) => {
  let prevId = "";
  const res: { [key: string]: RangeData[] } = {};

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
  ranges: RangeData[]
): number => {
  const [...copyRanges] = ranges;
  return copyRanges.reduce((acc, curr) => {
    const { rangeStart, rangeEnd, rangeOffsetStart } = curr;

    if (between(seed, rangeStart, rangeEnd)) {
      copyRanges.splice(1);
      return seed - rangeStart + rangeOffsetStart;
    }

    return seed;
  }, 0);
};

export const goThroughSteps = (
  seed: number,
  steps: string[],
  maps: { [key: string]: RangeData[] }
) => {
  const v = steps.reduce(
    (acc, curr) => getSoilNumberFromSeeds(acc, maps[curr]),
    seed
  );

  return v;
};
export const exercise1 = (text: string) => {
  const [seed, ...rest] = text
    .trim()
    .split(/\n/g)
    .filter((i) => i !== "");

  const seedArray = getSeeds(seed);
  const maps = getMaps(rest);
  const steps = Object.keys(maps);

  const values = seedArray.map((seed) => goThroughSteps(seed, steps, maps));

  return Math.min(...values);
};

export const getSeedRangeValues = ({ rangeStart, rangeEnd }: SeedRangeData) => {
  const rangeLength = rangeEnd - rangeStart + 1;

  return [...Array(rangeLength).keys()].map((x) => x + rangeStart);
};

export const getAllSeedRangeValues = (seedRanges: SeedRangeData[]): number[] =>
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

export const exercise2 = (text: string) => {
  const [seed, ...rest] = text
    .trim()
    .split(/\n/g)
    .filter((i) => i !== "");

  const seedArray = getSeeds(seed);
  const seedRanges = getSeedsRanges(seedArray);
  const maps = getMaps(rest);
  const steps = Object.keys(maps);

  const values: number[] = [];

  for (let i = 0; i < seedRanges.length; i++) {
    const seedValues = getAllSeedRangeValues([seedRanges[i]]);

    const value = seedValues.reduce((acc, seed) => {
      const v = goThroughSteps(seed, steps, maps);
      return acc < v ? acc : v;
    }, goThroughSteps(seedArray[0], steps, maps));
    values.push(value);
  }

  return Math.min(...values);
};
