export const parse = (text: string) =>
  text.split(",").map((i) => {
    const [id1, id2] = i.split("-");

    return {
      lower: Number(id1),
      upper: Number(id2),
    };
  });

export const exercise = (text: string) => {
  const data = parse(text);
  let part1 = 0;
  let part2 = 0;

  data.forEach(({ lower, upper }) => {
    for (let id = lower; id <= upper; id++) {
      const stringId = id.toString();
      const half = Math.floor(stringId.length / 2);

      // part 1: split in half, if theyre the same then add that ID to the answer
      if (stringId.length % 2 === 0) {
        const firstHalf = stringId.slice(0, half);
        const secondHalf = stringId.slice(half, stringId.length);
        if (firstHalf === secondHalf) {
          part1 += id;
        }
      }
      // part2, go through each pattern in the first half of the id (so for 121212, i loop through, 1, 12, 121), create an id based on repeating those (so 111111, 121212, 121121) and if any of those match its invalid add to answer
      for (let patternLength = 0; patternLength <= half; patternLength++) {
        // if the pattern we're won't create a valid ID skip
        if (stringId.length % patternLength != 0) continue;

        const pattern = stringId.slice(0, patternLength);
        const repeatingId = pattern.repeat(stringId.length / patternLength);

        if (stringId === repeatingId) {
          part2 += id;
          break;
        }
      }
    }
  });

  return [part1, part2];
};
