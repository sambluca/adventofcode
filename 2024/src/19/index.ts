export const parse = (text: string) => {
  const [c, t] = text.trim().split(/\n\n/);
  const combos = c.split(", ");

  return { combos, towels: t.split("\n") };
};

export const checkValid = (combos: string[], towel: string) => {
  let count = [1];
  for (
    let firstColourIndex = 0;
    firstColourIndex < towel.length;
    firstColourIndex++
  ) {
    if (!count[firstColourIndex]) continue;
    for (
      let endColourIndex = firstColourIndex + 1;
      endColourIndex <= towel.length;
      endColourIndex++
    ) {
      if (firstColourIndex == 0) count[endColourIndex] = 0;
      if (combos.includes(towel.substring(firstColourIndex, endColourIndex)))
        count[endColourIndex] += count[firstColourIndex];
    }
  }

  return count[towel.length];
};

export const exercise1 = (text: string) => {
  const { combos, towels } = parse(text);

  return towels.reduce((acc, towel) => {
    const valid = checkValid(combos, towel);

    return valid ? acc + 1 : acc;
  }, 0);
};

export const exercise2 = (text: string) => {
  const { combos, towels } = parse(text);

  return towels.reduce((acc, towel) => {
    return acc + checkValid(combos, towel);
  }, 0);
};
