import { Arr } from "../utils";

type Map = {
  left: string;
  right: string;
};

type Maps = {
  [key: string]: Map;
};
type Data = {
  directions: string[];
  maps: Maps;
};

export const parse = (text: string): Data => {
  const [lr, ...rest] = text.split(/\n/);
  const maps: Maps = rest
    .filter((i) => i !== "")
    .reduce((acc, curr) => {
      const [k, d] = curr
        .split(/([A-Z\d][A-Z\d][A-Z\d]) =/g)
        .filter((i) => i !== "");
      const key = k.replace(" ", "").replace("=", "");

      const [left, right] = d
        .replace("(", "")
        .replace(")", "")
        .replaceAll(" ", "")
        .split(",");
      acc[key] = { left, right };
      return acc;
    }, {});

  const directions = lr
    .split("")
    .map((i) => i.replace("L", "left").replace("R", "right"));
  return { directions: directions, maps };
};

export const findSteps = (
  { directions, maps }: Data,
  start: string,
  startStep = 0
) => {
  let steps = startStep;
  let next = start;
  let map = maps[next];

  while (true) {
    const direction = directions[steps % directions.length];
    next = map[direction];
    map = maps[next];
    steps += 1;

    if (next[2] === "Z") {
      break;
    }
  }

  return steps;
};

export const exercise1 = (text: string) => {
  const { directions, maps } = parse(text);

  return findSteps({ directions, maps }, "AAA");
};

export const exercise2 = (text: string) => {
  const { directions, maps } = parse(text);
  const steps = Object.keys(maps).filter((i) => i[2] === "A");
  const values = new Arr(steps.map((n) => findSteps({ directions, maps }, n)));

  return values.lcm;
};
