import { Arr, getDiff } from "../utils";

export const parse = (text: string) =>
  text
    .split(/\n/)
    .map((line) => line.split(/[ ]+/))
    .reduce(
      (acc: [number[], number[]], curr) => {
        const [item1, item2] = curr;
        const [list1, list2] = acc;

        list1.push(Number(item1));
        list2.push(Number(item2));

        return [list1, list2];
      },
      [[], []]
    );

export const exercise1 = (text: string) => {
  const [list1, list2] = parse(text);

  const soretedList1 = list1.sort();
  const soretedList2 = list2.sort();

  return soretedList1.reduce((acc: number, list1Item, index) => {
    const list2Item = soretedList2[index];
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
