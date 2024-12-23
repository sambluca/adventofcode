export const parse = (text: string) =>
  text.split(/\n/).reduce((acc: { [key: string]: Set<string> }, item) => {
    const [first, second] = item.split("-");
    if (!acc[first]) {
      acc[first] = new Set();
    }

    if (!acc[second]) {
      acc[second] = new Set();
    }

    acc[first].add(second);
    acc[second].add(first);
    return acc;
  }, {});

const startsWith = (i: string) =>
  i
    .split("-")
    .reduce((acc: boolean, c) => (acc ? acc : c.startsWith("t")), false);

// https://en.wikipedia.org/wiki/Bron%E2%80%93Kerbosch_algorithm
// algorithm BronKerbosch1(R, P, X) is
//     if P and X are both empty then
//         report R as a maximal clique
//     for each vertex v in P do
//         BronKerbosch1(R ⋃ {v}, P ⋂ N(v), X ⋂ N(v))
//         P := P \ {v}
//         X := X ⋃ {v}

// clique: Set<string> = R,
// options: Set<string> = P,
// excluded: Set<string> = X,
const bronKerbosch = (
  clique: Set<string>,
  options: Set<string>,
  excluded: Set<string>,
  graph: { [key: string]: Set<string> },
  cliques: string[]
) => {
  if (options.size === 0 && excluded.size === 0) {
    cliques.push(Array.from(clique).sort().join(","));
    return cliques;
  }

  const arr = Array.from(options);
  for (const vertex of arr) {
    clique.add(vertex);
    const neighbors = graph[vertex] || new Set();

    cliques = [
      ...bronKerbosch(
        clique,
        new Set([...options].filter((v) => neighbors.has(v))),
        new Set([...excluded].filter((v) => neighbors.has(v))),
        graph,
        cliques
      ),
    ];
    clique.delete(vertex);
    options.delete(vertex);
    excluded.add(vertex);
  }

  return cliques;
};

export const exercise1 = (text: string) => {
  const connections = parse(text);
  const visited = new Set<string>();
  Object.entries(connections).forEach(([first, set]) => {
    const connected = Array.from(set);
    while (connected.length !== 0) {
      const second = connected.pop();
      for (let third of connected) {
        const firstConnected =
          connections[first].has(second) && connections[first].has(third);
        const secondConnected =
          connections[second].has(first) && connections[second].has(third);
        const thirdConnected =
          connections[third].has(first) && connections[third].has(second);
        const startsWithT = [first, second, third].filter(startsWith);

        if (
          firstConnected &&
          secondConnected &&
          thirdConnected &&
          startsWithT.length !== 0
        ) {
          const connected = [first, second, third].sort().join("-");
          visited.add(connected);
        }
      }
    }
  });

  return visited.size;
};

export const exercise2 = (text: string) => {
  const data = parse(text);
  const cliques = bronKerbosch(
    new Set(),
    new Set(Object.keys(data)),
    new Set(),
    data,
    []
  );

  return cliques.reduce(
    (acc: string, item) => (item.length > acc.length ? item : acc),
    ""
  );
};
