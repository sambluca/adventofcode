const stored = new Map<string, any>();

export function memoize<Args extends unknown[], Result>(
  func: (...args: Args) => Result
): (...args: Args) => Result {
  return (...args) => {
    const key = JSON.stringify(args);
    if (stored.has(key)) {
      return stored.get(key)!;
    }
    const result = func(...args);
    stored.set(key, result);
    return result;
  };
}

export const parse = (text: string) => text.split(/\n/).map((i) => i.split(""));

type Dir = "east" | "west" | "north" | "south";
interface Beam {
  coords: [number, number];
  dir: Dir;
}

const move = memoize((node: [number, number], dir: Dir): [number, number] => {
  const [x, y] = node;
  if (dir === "east") return [x + 1, y];
  if (dir === "west") return [x - 1, y];
  if (dir === "north") return [x, y - 1];

  return [x, y + 1];
});

const east = (node: number[]): [number, number] => {
  const [x, y] = node;

  return [x + 1, y];
};

const west = (node: number[]): [number, number] => {
  const [x, y] = node;

  return [x - 1, y];
};

const north = (node: number[]): [number, number] => {
  const [x, y] = node;

  return [x, y - 1];
};

const south = (node: number[]): [number, number] => {
  const [x, y] = node;

  return [x, y + 1];
};

export const next = memoize(
  (
    node: [number, number],
    dir: Dir,
    path: string,
    grid: string[][]
  ): Beam[] => {
    if (path === ".") {
      if (dir === "east") {
        const nextNode = move(node, "east");
        if (nextNode[0] >= grid[0].length) return [];
        return [{ coords: nextNode, dir: "east" }];
      }

      if (dir === "west") {
        const nextNode = move(node, "west");
        if (nextNode[0] < 0) return [];
        return [{ coords: nextNode, dir: "west" }];
      }

      if (dir === "north") {
        const nextNode = move(node, "north");
        if (nextNode[1] < 0) return [];
        return [{ coords: nextNode, dir: "north" }];
      }

      if (dir === "south") {
        const nextNode = move(node, "south");
        if (nextNode[1] >= grid.length) return [];
        return [{ coords: nextNode, dir: "south" }];
      }
    }

    if (path === "/") {
      if (dir === "east") {
        const nextNode = north(node);
        if (nextNode[1] < 0) return [];
        return [{ coords: nextNode, dir: "north" }];
      }

      if (dir === "west") {
        const nextNode = south(node);
        if (nextNode[1] >= grid.length) return [];
        return [{ coords: nextNode, dir: "south" }];
      }

      if (dir === "north") {
        const nextNode = east(node);
        if (nextNode[0] >= grid[0].length) return [];
        return [{ coords: nextNode, dir: "east" }];
      }

      if (dir === "south") {
        const nextNode = west(node);
        if (nextNode[0] < 0) return [];
        return [{ coords: nextNode, dir: "west" }];
      }
    }
    if (path === "A") {
      if (dir === "east") {
        const nextNode = south(node);
        if (nextNode[1] >= grid.length) return [];
        return [{ coords: nextNode, dir: "south" }];
      }

      if (dir === "west") {
        const nextNode = north(node);
        if (nextNode[1] < 0) return [];
        return [{ coords: nextNode, dir: "north" }];
      }

      if (dir === "north") {
        const nextNode = west(node);
        if (nextNode[0] < 0) return [];
        return [{ coords: nextNode, dir: "west" }];
      }

      if (dir === "south") {
        const nextNode = east(node);
        if (nextNode[0] >= grid[0].length) return [];
        return [{ coords: nextNode, dir: "east" }];
      }
    }

    if (path === "-") {
      if (dir === "east") {
        const nextNode = east(node);
        if (nextNode[0] >= grid[0].length) return [];
        return [{ coords: nextNode, dir: "east" }];
      }

      if (dir === "west") {
        const nextNode = west(node);
        if (nextNode[0] < 0) return [];
        return [{ coords: nextNode, dir: "west" }];
      }

      if (dir === "north" || dir === "south") {
        const eastNode = east(node);
        const westNode = west(node);
        const nodes = [];
        if (!(eastNode[0] >= grid[0].length))
          nodes.push({ coords: eastNode, dir: "east" });
        if (!(westNode[1] < 0)) nodes.push({ coords: westNode, dir: "west" });

        return nodes;
      }
    }

    if (path === "|") {
      if (dir === "north") {
        const nextNode = north(node);
        if (nextNode[1] < 0) return [];
        return [{ coords: nextNode, dir: "north" }];
      }

      if (dir === "south") {
        const nextNode = south(node);
        if (nextNode[1] >= grid.length) return [];
        return [{ coords: nextNode, dir: "south" }];
      }

      if (dir === "west" || dir === "east") {
        const northNode = north(node);
        const southNode = south(node);
        const nodes = [];
        if (!(northNode[1] < 0))
          nodes.push({ coords: northNode, dir: "north" });
        if (!(southNode[1] >= grid.length))
          nodes.push({ coords: southNode, dir: "south" });

        return nodes;
      }
    }
  }
);

const activeBeamLength = (
  start: [number, number],
  dir: Dir,
  data: string[][]
) => {
  const activeBeams: string[] = [JSON.stringify({ coords: start, dir: dir })];
  const beamsToCheck: Beam[] = [{ coords: start, dir: dir }];

  while (true) {
    if (beamsToCheck.length === 0) break;
    const beam = beamsToCheck.pop();
    const [x, y] = beam.coords;
    const path = data[y][x];
    const nextBeams = next(beam.coords, beam.dir, path, data);

    nextBeams.forEach((b) => {
      if (!activeBeams.includes(JSON.stringify(b))) {
        activeBeams.push(JSON.stringify(b));
        beamsToCheck.push(b);
      }
    });
  }

  const finalData = new Set(
    activeBeams.map((i) => JSON.stringify(JSON.parse(i).coords))
  );

  return finalData.size;
};
export const exercise1 = (text: string) => {
  const data = parse(text);

  return activeBeamLength([0, 0], "east", data);
};

export const exercise2 = (text: string) => {
  const data = parse(text);
  const topRow = Array(data[0].length)
    .fill("")
    .map((_, i) => [i, 0]);

  const bottomRow = Array(data[0].length)
    .fill("")
    .map((_, i) => [i, data.length - 1]);

  const leftCol = Array(data.length)
    .fill("")
    .map((_, i) => [0, i]);

  const rightCol = Array(data.length)
    .fill("")
    .map((_, i) => [data[0].length - 1, i]);

  const topRowCalcs = topRow.map((c: [number, number]) =>
    activeBeamLength(c, "south", data)
  );

  const bottomRowCalcs = bottomRow.map((c: [number, number]) =>
    activeBeamLength(c, "north", data)
  );

  const leftColCalcs = leftCol.map((c: [number, number]) =>
    activeBeamLength(c, "east", data)
  );

  const rightColCalcs = rightCol.map((c: [number, number]) =>
    activeBeamLength(c, "west", data)
  );

  return Math.max(
    ...[...bottomRowCalcs, ...topRowCalcs, ...leftColCalcs, ...rightColCalcs]
  );
};
