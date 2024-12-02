import { Arr, getDiff } from "../utils";

export const parse = (text: string) =>
  text
    .split(/\n/)
    .map((line) => line.split(/[ ]+/))
    .reduce(
      ([list1, list2]: [number[], number[]], [item1, item2]) => [
        [...list1, Number(item1)],
        [...list2, Number(item2)],
      ],
      [[], []]
    );

export const exercise1 = (text: string) => {
  const [list1, list2] = parse(text);

  const sortedList1 = list1.sort();
  const sortedList2 = list2.sort();

  return sortedList1.reduce((acc: number, list1Item, index) => {
    const list2Item = sortedList2[index];
    const distance = getDiff(list1Item, list2Item);
    return acc + distance;
  }, 0);
};

export const exercise2 = (text: string) => {
  const [list1, list2] = parse(text);

  const countedList2 = new Arr(list2).getInstances();

  return list1.reduce((acc: number, item) => {
    const list2Item = countedList2[item] || 0;
    const res = Number(item) * list2Item;

    return acc + res;
  }, 0);
};
