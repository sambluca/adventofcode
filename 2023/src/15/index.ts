export const parse = (text: string) => text.split(",");

export const HASH = (value: string) =>
  value
    .split("")
    .reduce((acc, curr) => ((acc + curr.charCodeAt(0)) * 17) % 256, 0);

export const exercise1 = (text: string) =>
  parse(text).reduce((acc, curr) => acc + HASH(curr), 0);

export const HASHMAP = (data: string[]) => {
  const boxes: Array<Array<{ label: string; length: number }>> = Array.from(
    { length: 256 },
    () => []
  );

  data.forEach((instruction) => {
    if (instruction.includes("-")) {
      const label = instruction.replace("-", "");
      const hash = HASH(label);
      boxes[hash] = boxes[hash].filter((item) => item.label !== label);
    } else {
      const [label, l] = instruction.split("=");
      const hash = HASH(label);
      const index = boxes[hash].findIndex((item) => item.label === label);

      if (index !== -1) {
        boxes[hash][index] = { label, length: Number(l) };
      } else {
        boxes[hash].push({ label, length: Number(l) });
      }
    }
  });

  return boxes;
};

export const exercise2 = (text: string) =>
  HASHMAP(parse(text)).reduce(
    (acc, box, boxIndex) =>
      acc +
      box.reduce(
        (acc, { length }, itemIndex) =>
          acc + (boxIndex + 1) * (itemIndex + 1) * length,
        0
      ),
    0
  );
