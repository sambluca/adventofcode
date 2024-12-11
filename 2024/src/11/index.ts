import { splitHalf, sum } from "../utils";
import { memoize } from "../utils/memoize";

const calculateStone = memoize((stone: number) => {
  if (stone === 0) return [1];
  if (String(stone).length % 2 === 0) return splitHalf(stone);
  return [stone * 2024];
});

export const parse = (text: string) => {
  const stonesMap = new Map<number, number>();
  text
    .split(" ")
    .map(Number)
    .forEach((stone) => {
      const value = stonesMap.get(stone) ?? 0;
      stonesMap.set(stone, value + 1);
    });
  return stonesMap;
};

const parseStones = (stones: Map<number, number>) => {
  const calculatedStones = new Map<number, number>();
  for (const [stone, count] of stones) {
    calculateStone(stone).forEach((newStone) => {
      calculatedStones.set(
        newStone,
        (calculatedStones.get(newStone) ?? 0) + count
      );
    });
  }
  return calculatedStones;
};

export const exercise = (text: string, loops: number) => {
  let data = parse(text);
  for (let i = 0; i < loops; ++i) data = parseStones(data);
  return sum([...data.values()]);
};
