import { isNumber } from "../utils";

export const parse = (text: string) => {
  const splitUp = text.split("");

  const values: { spaces: number; file: boolean }[] = [];

  splitUp.forEach((item, index) => {
    const file = index % 2 === 0;
    const value = Number(item);

    values.push({ spaces: value, file });
  });

  const data: (string | number)[] = [];

  let fileIndex = 0;
  for (let i = 0; i <= values.length - 1; i++) {
    const curr = values[i];

    for (let j = 0; j < curr.spaces; j++) {
      if (curr.file) {
        data.push(fileIndex);
      } else {
        data.push(".");
      }
    }

    if (curr.file) fileIndex++;
  }

  return data;
};

export const getSorted = (data: (string | number)[]) => {
  let sortedData: (string | number)[] = [];
  let sorted = false;

  while (!sorted) {
    const firstDotIndex = data.findIndex((i) => i === ".");
    const lastNumberIndex = data.findLastIndex((i) => i !== ".");

    if (firstDotIndex > lastNumberIndex) {
      sortedData = [...data];
      sorted = true;
    }

    const value = data[lastNumberIndex];

    data[firstDotIndex] = value;
    data[lastNumberIndex] = ".";
  }

  return sortedData.filter((i) => typeof i === "number");
};
export const exercise1 = (text: string) => {
  const data = [...parse(text)];

  let sortedData = getSorted(data);
  return sortedData.reduce((acc: number, item, index) => {
    const value = item * index;

    return acc + value;
  }, 0);
};

export const exercise2 = (text: string) => {
  const values = text.trim().split("").map(Number);

  let id = 0;
  let data: { id: string | number; length: number }[] = [];

  values.forEach((value, index) => {
    if (index % 2 === 0) {
      data.push({ id, length: value });
      id += 1;
    } else {
      data.push({ id: ".", length: value });
    }
  });

  for (let i = id - 1; i >= 0; i--) {
    const fileIndex = data.findIndex((block) => block.id == i);

    const firstFreeGapIndex = data.findIndex(
      (block) => block.id == "." && block.length >= data[fileIndex].length
    );

    if (!data[firstFreeGapIndex] || fileIndex < firstFreeGapIndex) continue;

    if (data[firstFreeGapIndex].length > data[fileIndex].length) {
      data = [
        ...data.slice(0, firstFreeGapIndex),
        { id: data[fileIndex].id, length: data[fileIndex].length },
        {
          id: ".",
          length: data[firstFreeGapIndex].length - data[fileIndex].length,
        },
        ...data.slice(firstFreeGapIndex + 1),
      ];
      data[fileIndex + 1].id = ".";
    } else if (data[firstFreeGapIndex].length == data[fileIndex].length) {
      data[firstFreeGapIndex].id = data[fileIndex].id;
      data[fileIndex].id = ".";
    }
  }

  let currentIndex = 0;
  return data.reduce((acc: number, item) => {
    const { id, length } = item;
    if (typeof id === "number") {
      let check = length;
      let value = 0;
      while (check !== 0) {
        value += currentIndex * id;
        check += -1;
        currentIndex += 1;
      }

      return acc + value;
    }

    currentIndex += length;
    return acc;
  }, 0);
};
