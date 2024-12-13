import { picksTheorom, shoelace } from "../utils";
import { Coord, Grid } from "../utils/Grid";

export const parse = (text: string) => text.split(/\n/).map((i) => i.split(""));

const flood = (
  grid: Grid<string>,
  [x, y]: Coord,
  search: string,
  replaced: Coord[],
  perimeter: Coord[],
  edges: Set<string>,
  [prevX, prevY]: Coord,
  dir?: "north" | "south" | "east" | "west"
): [Coord[], Coord[], Set<string>] => {
  // if we're out of bounds we're at at an edge
  if (!grid.getInBounds([x, y])) {
    perimeter.push([x, y]);
    edges.add(`${search}-${prevX}-${prevY}-${dir}`);
    return [replaced, perimeter, edges];
  }

  // if we've already found the value then we're not hitting an edge
  if (replaced.find(([rX, rY]) => rX === x && rY === y)) {
    return [replaced, perimeter, edges];
  }

  // if the grid value doesn't equal the value we're searching for we've hit an internal edge
  if (grid.grid[y][x] !== search) {
    // perimeter.push([x, y]);
    edges.add(`${search}-${prevX}-${prevY}-${dir}`);
    return [replaced, perimeter, edges];
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
    edges,
    [x, y],
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
    edges,
    [x, y],
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
    edges,
    [x, y],
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
    edges,
    [x, y],
    "east"
  );
  replaced = eastR;
  perimeter = eastP;

  return [replaced, perimeter, edges];
};

const getRegions = (data: string[][]) => {
  let grid = new Grid(data);

  const regions: [Coord[], Coord[], Set<string>][] = [];
  grid.grid.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== "🟨")
        regions.push(
          flood(grid, [x, y], value, [], [], new Set<string>(), [x, y])
        );
    });
  });

  return regions;
};
export const exercise1 = (text: string) =>
  getRegions(parse(text)).reduce((acc: number, [region, perimeter, edges]) => {
    return acc + region.length * edges.size;
  }, 0);

const getCorners = (e: Set<string>) => {
  const edges = new Set(e);
  let corners = 0;
  for (let edge of edges) {
    const [search, xs, ys, dir] = edge.split("-");
    const x = Number(xs);
    const y = Number(ys);

    if (dir === "south" && !edges.has(`${search}-${x - 1}-${y}-south`)) {
      corners += 1;
      continue;
    }

    if (dir === "north" && !edges.has(`${search}-${x + 1}-${y}-north`)) {
      corners += 1;
      continue;
    }

    if (dir === "east" && !edges.has(`${search}-${x}-${y + 1}-east`)) {
      corners += 1;
      continue;
    }

    if (dir === "west" && !edges.has(`${search}-${x}-${y - 1}-west`)) {
      corners += 1;
      continue;
    }
  }

  return corners;
};

export const exercise2 = (text: string) =>
  getRegions(parse(text)).reduce((acc: number, [region, perimeter, edges]) => {
    const corners = getCorners(edges);
    const value = region.length * corners;
    return acc + value;
  }, 0);
