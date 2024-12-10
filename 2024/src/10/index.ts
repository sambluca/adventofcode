import { Arr } from "../utils";
import { Coord, Grid } from "../utils/Grid";

export const parse = (text: string) =>
  text.split(/\n/).map((line) => line.split("").map(Number));

export const getPath = (
  coord: Coord,
  value: number,
  grid: Grid,
  paths: Coord[]
) => {
  let newPaths = [...paths];
  if (value === 9) return [...newPaths, coord];
  const { north, east, south, west } = grid.getSurroundingValues(coord);

  if (north.value === value + 1)
    newPaths = getPath(north.coord, north.value, grid, newPaths);

  if (east.value === value + 1)
    newPaths = getPath(east.coord, east.value, grid, newPaths);

  if (south.value === value + 1)
    newPaths = getPath(south.coord, south.value, grid, newPaths);

  if (west.value === value + 1)
    newPaths = getPath(west.coord, west.value, grid, newPaths);

  return newPaths;
};
export const exercise = (text: string, part2?: boolean) => {
  const data = parse(text);

  const grid = new Grid(data);
  const trailheads = grid.getAllPoints(0);

  return trailheads.reduce((acc: number, trail) => {
    const values = getPath(trail, 0, grid, []);

    return (
      acc +
      (part2
        ? values.length
        : [...new Set(values.map((i) => JSON.stringify(i)))].length)
    );
  }, 0);
};
