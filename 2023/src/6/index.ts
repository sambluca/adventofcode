import { checkForValidNumber } from "../utils";

type Race = {
  time: number;
  distance: number;
};

export const setUpData = (text: string): { part1: Race[]; part2: Race } => {
  const [times, distances] = text.split(/\n/g).map((line) =>
    line
      .replace(/(Time:|Distance:)/g, "")
      .split(/ /g)
      .filter(checkForValidNumber)
      .map(Number)
  );

  const part1 = times.reduce((acc: Race[], curr, index) => {
    const race: Race = {
      time: curr,
      distance: distances[index],
    };

    acc.push(race);

    return acc;
  }, []);

  const part2: Race = {
    time: Number(times.join("")),
    distance: Number(distances.join("")),
  };
  return { part1, part2 };
};

export const findRecordButtonPress = ({ time, distance }: Race) =>
  time -
  2 * Math.ceil((time - Math.sqrt(time * time - 4 * (distance + 1))) / 2) +
  1;

export const exercise1 = (text: string) => {
  const { part1 } = setUpData(text);

  return part1.reduce((acc, num) => findRecordButtonPress(num) * acc, 1);
};

export const exercise2 = (text: string) => {
  const { part2 } = setUpData(text);

  return findRecordButtonPress(part2);
};
