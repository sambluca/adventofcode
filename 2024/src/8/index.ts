import { Arr, makeNegative, makePositive } from "../utils";
import { Coord, Grid } from "../utils/Grid";
import { deepCopy } from "../utils/Object";

export const parse = (text: string) => text.split(/\n/).map((i) => i.split(""));

const printGrid = (arr: Arr, grid: string[][]) => {
  console.log(
    grid
      .map((row, columnIndex) => {
        const newRow = row.map((value, rowIndex) => {
          return arr.contains(JSON.stringify([rowIndex, columnIndex]))
            ? "#"
            : value;
        });

        return newRow.join("");
      })
      .join("\n")
  );
};

const getCounts = (grid: string[][]): { [key: string]: [number, number][] } =>
  grid.reduce((acc: { [key: string]: [number, number][] }, row, columnI) => {
    const copy = deepCopy(acc);
    const values = row.reduce((valuesAcc: [string, number][], value, rowI) => {
      if (value === ".") return valuesAcc;

      return [...valuesAcc, [value, rowI]];
    }, []);

    values.forEach(([value, rowI]) => {
      if (!copy[value]) copy[value] = [];

      copy[value].push([rowI, columnI]);
    });
    return copy;
  }, {});

const getNextAntenna = (
  [x, y]: Coord,
  [diffX, diffY]: Coord,
  up: boolean,
  left: boolean
) => {
  if (up) {
    return [
      x + (left ? makeNegative(diffX) : makePositive(diffX)),
      y + makeNegative(diffY),
    ] as Coord;
  }

  return [
    x + (left ? makePositive(diffX) : makeNegative(diffX)),
    y + makePositive(diffY),
  ] as Coord;
};

const checkIfInBounds = ([x, y]: Coord, grid: string[][]) => {
  if (x <= -1 || y <= -1) return false;
  if (y >= grid.length || x >= grid[0].length) return false;

  return true;
};

export const exercise = (text: string, part2?: boolean) => {
  const grid = parse(text);

  const tryGrid = new Grid(grid);
  const antennas = new Arr(
    Object.values(getCounts(grid))
      .reduce((acc: Coord[], value) => {
        const coords = [...value];

        const nodes = [];
        while (coords.length !== 1) {
          const [x, y] = coords.pop();

          const newNodes = coords
            .map(([compX, compY]) => {
              const diffX = compX - x;
              const diffY = compY - y;

              const startLowerNode = getNextAntenna(
                [x, y],
                [diffX, diffY],
                false,
                x > compX
              );

              const startUpperNode = getNextAntenna(
                [compX, compY],
                [diffX, diffY],
                true,
                x > compX
              );

              if (!part2) return [startLowerNode, startUpperNode];

              const upperNodes: Coord[] = [startUpperNode];
              const lowerNodes: Coord[] = [startUpperNode];

              let upperInBounds = true;

              while (upperInBounds) {
                const [nextCompX, nextCompY] =
                  upperNodes[upperNodes.length - 1];
                const nextUpper = getNextAntenna(
                  [nextCompX, nextCompY],
                  [diffX, diffY],
                  true,
                  x > compX
                );

                upperNodes.push(nextUpper);

                upperInBounds = tryGrid.getInBounds(nextUpper);
              }

              let lowerInBounds = true;

              while (lowerInBounds) {
                const [nextCompX, nextCompY] =
                  lowerNodes[lowerNodes.length - 1];

                const nextLower = getNextAntenna(
                  [nextCompX, nextCompY],
                  [diffX, diffY],
                  false,
                  x > compX
                );

                lowerNodes.push(nextLower);

                lowerInBounds = tryGrid.getInBounds(nextLower);
              }

              return [...upperNodes, ...lowerNodes];
            })
            .flat();

          nodes.push(...newNodes);
        }

        return [...acc, ...nodes.filter((i) => checkIfInBounds(i, grid))];
      }, [])
      .map((i) => JSON.stringify(i))
  );

  // printGrid(antennas, grid);

  return antennas.unique.length;
};
