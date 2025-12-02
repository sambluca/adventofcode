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
    numbersLoop: for (let id = lower; id <= upper; id++) {
      const num = id.toString();

      // part 1
      if (num.length % 2 === 0) {
        const half = Math.floor(num.length / 2);
        const firstHalf = num.slice(0, half);
        const secondHalf = num.slice(half, num.length);
        if (firstHalf === secondHalf) {
          part1 += id;
        }
      }

      // part 2
      for (let index = 0; index <= num.length / 2; index++) {
        if (num.length % index != 0) continue;
        const slice = num.slice(0, index);

        if (num === slice.repeat(num.length / index)) {
          part2 += id;
          continue numbersLoop;
        }
      }
    }
  });

  return [part1, part2];
};
