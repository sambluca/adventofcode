export const parse = (text: string) =>
  text.split(/\n\n/).map((i) => {
    const [a, b, p] = i.split(/\n/);

    const [prizeX, prizeY] = p.replace("Prize: ", "").split(", ");
    const prize = {
      x: Number(prizeX.replace("X=", "")),
      y: Number(prizeY.replace("Y=", "")),
    };

    const [ax, ay] = a.replace("Button A: ", "").split(", ");
    const [bx, by] = b.replace("Button B: ", "").split(", ");

    const aButton = {
      x: Number(ax.replace("X+", "")),
      y: Number(ay.replace("Y+", "")),
    };

    const bButton = {
      x: Number(bx.replace("X+", "")),
      y: Number(by.replace("Y+", "")),
    };

    return { aButton, bButton, prize };
  });

const solve =
  (pM: number) =>
  (item: {
    aButton: {
      x: number;
      y: number;
    };
    bButton: {
      x: number;
      y: number;
    };
    prize: {
      x: number;
      y: number;
    };
  }) => {
    const {
      prize: { x: px, y: py },
      aButton: { x: ax, y: ay },
      bButton: { x: bx, y: by },
    } = item;

    const prizeX = px + pM;
    const prizeY = py + pM;

    const aPresses = (prizeX * by - prizeY * bx) / (ax * by - ay * bx);
    const bPresses = (ax * prizeY - ay * prizeX) / (ax * by - ay * bx);

    return {
      aPresses,
      bPresses,
      valid: !(aPresses % 1 || bPresses % 1),
    };
  };

export const exercise = (text: string, part: 1 | 2) =>
  parse(text)
    .map(solve(part === 1 ? 0 : 10000000000000))
    .filter(({ valid }) => valid)
    .reduce((acc, item) => {
      const aTokens = item.aPresses * 3;

      return acc + aTokens + item.bPresses;
    }, 0);
