export const parse = (text: string) => text.split(/\n/);

export const exercise1 = (text: string) => {
  const data = parse(text);

  const connections = data.reduce(
    (acc: { [key: string]: Set<string> }, item) => {
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
    },
    {}
  );

  const interconnected: string[] = [];
  const visited = new Set<string>();
  Object.entries(connections).forEach(([first, set]) => {
    const connected = Array.from(set);
    while (connected.length !== 0) {
      const second = connected.pop();
      for (let thid of connected) {
        const toCheck = [first, second, thid].sort().join("-");

        visited.add(toCheck);
      }
    }
  });

  const startsWith = (i: string) =>
    i
      .split("-")
      .reduce((acc: boolean, c) => (acc ? acc : c.startsWith("t")), false);

  Array.from(visited).forEach((connection) => {
    const [first, second, third] = connection.split("-");
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
      interconnected.push(connection);
    }
  });

  // doesn't check if starts with

  return interconnected.length;
};

export const exercise2 = (text: string) => {
  const data = parse(text);
};
