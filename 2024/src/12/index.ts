import { picksTheorom, shoelace } from "../utils";
import { Coord, Grid } from "../utils/Grid";

export const parse = (text: string) => text.split(/\n/).map((i) => i.split(""));

const flood = (
  grid: Grid<string>,
  [x, y]: Coord,
  search: string,
  replaced: Coord[],
  perimeter: Coord[],
  set: Set<string>,
  dir?: "north" | "south" | "east" | "west"
): [Coord[], Coord[], Set<string>] => {
  // if we're out of bounds we're at at an edge
  if (!grid.getInBounds([x, y])) {
    perimeter.push([x, y]);
    set.add(`${x},${y} - ${dir}`);
    return [replaced, perimeter, set];
  }

  // if we've already found the value then we're not hitting an edge
  if (replaced.find(([rX, rY]) => rX === x && rY === y)) {
    return [replaced, perimeter, set];
  }

  // if the grid value doesn't equal the value we're searching for we've hit an internal edge
  if (grid.grid[y][x] !== search) {
    perimeter.push([x, y]);
    set.add(`${x},${y} - ${dir}`);
    return [replaced, perimeter, set];
  }

  replaced.push([x, y]);
  grid.grid[y][x] = "🟨";

  const {
    north: { coord: north },
    south: { coord: south },
    west: { coord: west },
    east: { coord: east },
  } = grid.getSurroundingValues([x, y]);

  const [northR, northP] = flood(
    grid,
    north,
    search,
    replaced,
    perimeter,
    set,
    "north"
  );
  replaced = northR;
  perimeter = northP;

  const [southR, southP] = flood(
    grid,
    south,
    search,
    replaced,
    perimeter,
    set,
    "south"
  );
  replaced = southR;
  perimeter = southP;

  const [westR, westP] = flood(
    grid,
    west,
    search,
    replaced,
    perimeter,
    set,
    "west"
  );
  replaced = westR;
  perimeter = westP;
  const [eastR, eastP] = flood(
    grid,
    east,
    search,
    replaced,
    perimeter,
    set,
    "east"
  );
  replaced = eastR;
  perimeter = eastP;

  return [replaced, perimeter, set];
};

const getRegions = (data: string[][]) => {
  let grid = new Grid(data);

  const regions: [Coord[], Coord[], Set<string>][] = [];
  grid.grid.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== "🟨")
        regions.push(flood(grid, [x, y], value, [], [], new Set<string>()));
    });
  });

  return regions;
};
export const exercise1 = (text: string) =>
  getRegions(parse(text)).reduce(
    (acc: number, [region, perimeter]) =>
      acc + region.length * perimeter.length,
    0
  );

// const getSides = (coords: Coord[]) => {
//   console.log(coords);
//   const grid = new Grid(coords);
//   let sides = 0;
//   let unique = true;
//   let checking = coords[0];
//   const checked = [];

//   let dir: "east" | "south" | "north" | "west" = "east";

//   const changeDir = (newD: "east" | "south" | "north" | "west") => {
//     if (newD !== dir) {
//       sides += 1;
//       dir = newD;
//     }
//   };
//   while (unique) {
//     const surrounding = grid.getSurroundingValues(checking);
//     if (checked.includes(JSON.stringify(checking))) {
//       unique = false;
//     }
//     if (
//       coords.find(
//         (i) => JSON.stringify(i) === JSON.stringify(surrounding.east.coord)
//       )
//     ) {
//       changeDir("east");
//       checked.push(JSON.stringify(checking));
//       checking = surrounding.east.coord;
//       continue;
//     }
//     if (
//       coords.find(
//         (i) => JSON.stringify(i) === JSON.stringify(surrounding.west.coord)
//       )
//     ) {
//       changeDir("west");
//       checked.push(JSON.stringify(checking));
//       checking = surrounding.west.coord;
//       continue;
//     }

//     if (
//       coords.find(
//         (i) => JSON.stringify(i) === JSON.stringify(surrounding.south.coord)
//       )
//     ) {
//       changeDir("south");
//       checked.push(JSON.stringify(checking));
//       checking = surrounding.south.coord;
//       continue;
//     }

//     if (
//       coords.find(
//         (i) => JSON.stringify(i) === JSON.stringify(surrounding.north.coord)
//       )
//     ) {
//       changeDir("north");
//       checked.push(JSON.stringify(checking));
//       checking = surrounding.north.coord;
//       continue;
//     }

//     if (
//       coords.find(
//         (i) => JSON.stringify(i) === JSON.stringify(surrounding.northEast.coord)
//       )
//     ) {
//       changeDir("north");
//       checked.push(JSON.stringify(checking));
//       checking = surrounding.northEast.coord;
//       continue;
//     }
//     if (
//       coords.find(
//         (i) => JSON.stringify(i) === JSON.stringify(surrounding.northWest.coord)
//       )
//     ) {
//       changeDir("north");
//       checked.push(JSON.stringify(checking));
//       checking = surrounding.northEast.coord;
//       continue;
//     }

//     if (
//       coords.find(
//         (i) => JSON.stringify(i) === JSON.stringify(surrounding.southEast.coord)
//       )
//     ) {
//       changeDir("south");
//       checked.push(JSON.stringify(checking));
//       checking = surrounding.northEast.coord;
//       continue;
//     }

//     if (
//       coords.find(
//         (i) => JSON.stringify(i) === JSON.stringify(surrounding.southWest.coord)
//       )
//     ) {
//       changeDir("south");
//       checked.push(JSON.stringify(checking));
//       checking = surrounding.northEast.coord;
//       continue;
//     }

//     unique = false;
//   }
//   return sides;
// };
export const exercise2 = (text: string) => {
  const regions = getRegions(parse(text));
  console.log("regions", regions[0]);

  return regions.reduce((acc: number, [region, perimeter]) => {
    return acc + region.length * perimeter.length;
  }, 0);
};
