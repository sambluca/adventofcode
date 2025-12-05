export const parse = (text: string): [[number, number][], number[]] => {
  const [r, ig] = text.split(/\n\n/).map((i) => i.split(/\n/));

  const ranges = r.map((i) => {
    const parts = i.split("-");
    return [Number(parts[0]), Number(parts[1])] as [number, number];
  });
  const ingredients = ig.map(Number);
  return [ranges, ingredients];
};

export const exercise1 = (text: string) => {
  const [ranges, ingredients] = parse(text);
  return ingredients.filter((i) =>
    ranges.some(([low, high]) => i >= low && i <= high)
  ).length;
};

export const exercise2 = (text: string) => {
  const [ranges] = parse(text);

  return ranges
    .sort((a, b) => a[0] - b[0])
    .reduce((acc: [number, number][], currRange) => {
      const overlaps = acc.filter(
        (r) => currRange[0] <= r[1] && r[0] <= currRange[1]
      );
      if (overlaps.length === 0) return [...acc, currRange];

      const [cLower, cHigher] = currRange;

      for (const overlap of overlaps) {
        const [oLower, oHigher] = overlap;

        const lower = oLower < cLower ? oLower : cLower;
        const higher = oHigher > cHigher ? oHigher : cHigher;

        const newRange: [number, number] = [lower, higher];
        const accIndex = acc.findIndex(
          ([l, h]) => l === oLower && h === oHigher
        );
        acc[accIndex] = newRange;
      }

      return acc;
    }, [])
    .reduce((acc, i) => acc + (i[1] - i[0] + 1), 0);
};
