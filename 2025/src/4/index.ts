import { Coord, Grid } from "../utils/Grid";

export const parse = (text: string) =>
  text.split(/\n/).map((line) => line.split(""));

function getForkliftWorthySpaces(grid: Grid<string>) {
  const forkliftWorthSpace = grid.getAllPoints("@").filter((coord) => {
    const surroundingPaper = grid
      .getBaseSurroundingValues(coord)
      .filter((i) => i === "@");

    return surroundingPaper.length < 4;
  });

  return forkliftWorthSpace;
}

const findForkliftWorthyPapers = (
  grid: Grid<string>,
  removedPapers: Coord[] = [],
  removePaper = true
) => {
  const forkliftWorthSpace = getForkliftWorthySpaces(grid);

  if (forkliftWorthSpace.length === 0 || !removePaper)
    return [...removedPapers, ...forkliftWorthSpace].length;

  forkliftWorthSpace.forEach(([x, y]) => {
    grid.grid[y][x] = ".";
  });
  return findForkliftWorthyPapers(grid, [
    ...removedPapers,
    ...forkliftWorthSpace,
  ]);
};

export const exercise1 = (text: string) =>
  findForkliftWorthyPapers(new Grid(parse(text)), [], false);

export const exercise2 = (text: string) =>
  findForkliftWorthyPapers(new Grid(parse(text)));
