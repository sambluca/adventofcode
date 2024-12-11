import { memoize } from "../utils/memoize";

const calculateStone = memoize((stone: number) => {
  if (stone === 0) return [1];
  if (stone.toString().length % 2 === 0) {
    const half1 = stone.toString().substring(0, stone.toString().length / 2);
    const half2 = stone.toString().substring(stone.toString().length / 2);

    return [Number(half1), Number(half2)];
  }

  return [stone * 2024];
});

export const parse = (text: string) => {
  const stones = text.split(" ").map(Number);

  const stonesMap = new Map<number, number>();

  stones.forEach((stone) => {
    const value = stonesMap.get(stone) ?? 0;
    stonesMap.set(stone, value + 1);
  });

  return stonesMap;
};

const parseStones = (stones: Map<number, number>) => {
  const nextStones = new Map<number, number>();

  const addCount = (stone: number, count: number) => {
    const value = nextStones.get(stone) || 0;
    nextStones.set(stone, value + count);
  };

  for (const [stone, count] of stones) {
    const nextStones = calculateStone(stone);
    nextStones.forEach((newStone) => {
      addCount(newStone, count);
    });
  }

  return nextStones;
};

export const exercise = (text: string, loops: number) => {
  const data = parse(text);

  let stones = new Map(data);
  for (let i = 0; i < loops; ++i) {
    stones = parseStones(stones);
  }

  return [...stones].reduce((acc, [, count]) => acc + count, 0);
};
