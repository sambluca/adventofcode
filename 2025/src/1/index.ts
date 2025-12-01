import { makePositive } from "../utils";

export const parse = (text: string) =>
  text.split(/\n/).map((i) => {
    const num = i.replace(/L|R/, "");

    const dir: "right" | "left" = i.includes("R") ? "right" : "left";

    return { num: Number(num), dir };
  });

const getNumber = (
  dir: "left" | "right",
  position: number,
  numberOfTurns: number
): [number, number] => {
  const positionDistanceToZero =
    dir === "right" ? (100 - position) % 100 : position % 100;

  const distanceToNextZero =
    positionDistanceToZero === 0 ? 100 : positionDistanceToZero;

  let crossingsPastZero = 0;
  if (numberOfTurns >= distanceToNextZero) {
    crossingsPastZero =
      1 + Math.floor((numberOfTurns - distanceToNextZero) / 100);
  }

  const finalPosition =
    dir === "right"
      ? (position + numberOfTurns) % 100
      : (position - numberOfTurns + 10000) % 100;

  return [finalPosition, crossingsPastZero];
};

export const exercise = (text: string) =>
  parse(text).reduce(
    (
      [crossingsPastZero, clicksOntoZero, currentPosition]: [
        number,
        number,
        number
      ],
      { dir, num }
    ) => {
      const [nextValue, clicksPastZero] = getNumber(dir, currentPosition, num);

      return [
        crossingsPastZero + clicksPastZero,
        nextValue === 0 ? clicksOntoZero + 1 : clicksOntoZero,
        nextValue,
      ];
    },
    [0, 0, 50]
  );
