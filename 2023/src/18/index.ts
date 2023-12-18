import { picksTheorom, shoelace } from "../utils";

type Dir = "D" | "U" | "R" | "L";
interface Instruction {
  dir: Dir;
  length: number;
}

const dirs: { [key: string]: Dir } = {
  "0": "R",
  "1": "D",
  "2": "L",
  "3": "U",
};

export const parse = (text: string, two?: boolean): Array<Instruction> =>
  text.split(/\n/).map((i) => {
    const [d, l, col] = i.split(" ");
    const fullHex = col.split("").filter((i) => !i.match(/(\(|#|\))/g));

    const dir = two ? dirs[fullHex[fullHex.length - 1]] : (d as Dir);

    const length = two
      ? parseInt(fullHex.splice(0, 5).join(""), 16)
      : Number(l);
    const instruction: Instruction = {
      dir,
      length: length,
    };

    return instruction;
  });

export const dig = (data: Array<Instruction>) => {
  const paths: Array<[number, number]> = [[0, 0]];

  let boundaryPoints = 0;

  data.forEach(({ dir, length }) => {
    const [x, y] = paths[paths.length - 1];
    let nextX = x;
    let nextY = y;

    if (dir === "R") nextX += length;
    if (dir === "D") nextY += length;
    if (dir === "L") nextX -= length;
    if (dir === "U") nextY -= length;

    paths.push([nextX, nextY]);
    boundaryPoints += length;
  });

  return { paths, boundaryPoints };
};

export const exercise1 = (text: string) => {
  const data = parse(text);
  const { paths, boundaryPoints } = dig(data);

  const area = shoelace(paths);

  const interiorPoints = picksTheorom({ area, boundaryPoints });
  return interiorPoints + boundaryPoints;
};

export const exercise2 = (text: string) => {
  const data = parse(text, true);
  const { paths, boundaryPoints } = dig(data);

  const area = shoelace(paths);

  const interiorPoints = picksTheorom({ area, boundaryPoints });
  return interiorPoints + boundaryPoints;
};
