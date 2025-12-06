import { Arr, isNumber } from "../utils";

const operators = {
  "*": (a: number, b: number) => a * b,
  "+": (a: number, b: number) => a + b,
};
export const parse = (text: string) =>
  text
    .trim()
    .split(/\n/)
    .map((i) =>
      i
        .split(" ")
        .filter((i) => i !== "")
        .map((i) => (isNumber(i) ? Number(i) : i))
    );

export const exercise1 = (text: string) => {
  const data = parse(text);
  const arr = new Arr(data);
  const values = arr.rotate({ dir: "clockwise" });

  return values.reduce((acc, row: Array<any>) => {
    const o = row.shift();
    const operator = operators[o];

    const value = row.reduce(
      (acc, curr) => operator(acc, curr),
      o === "*" ? 1 : 0
    );

    return acc + value;
  }, 0);
};

export const parseSupportGaps = (text: string) => {
  const data = text.split(/\n/);

  const operatorRow = data.pop().split("");

  let columnWidths = [];
  let previousOpIndex = 0;

  operatorRow.forEach((curr, index) => {
    if (curr.trim() !== "" && index !== 0) {
      const colWidth = index - 1 - previousOpIndex;
      previousOpIndex = index;
      columnWidths.push(colWidth);
    }
    if (index === operatorRow.length - 1) {
      const colWidth = index + 1 - previousOpIndex;
      columnWidths.push(colWidth);
    }
  });

  const rows = [];
  data.forEach((row) => {
    let currRow = [];
    let ind = 0;
    columnWidths.forEach((width) => {
      const value = row.slice(ind, ind + width);
      currRow.push(value);
      ind = ind + width + 1;
    });

    rows.push(currRow);
  });

  return [...rows, operatorRow.filter((i) => i.trim() !== "")];
};

const splitIntoColumns = (arr: Array<any>) => {
  const values = [];

  arr.forEach((row: string) => {
    row.split("").forEach((item, columnIndex) => {
      if (!values[columnIndex] || values[columnIndex] === undefined) {
        values[columnIndex] = [item];
      } else {
        values[columnIndex] = [...values[columnIndex], item];
      }
    });
  });

  return values;
};
export const exercise2 = (text: string) => {
  const data = parseSupportGaps(text);
  const arr = new Arr(data);

  const values = arr.rotate({ dir: "clockwise" });

  return values.reduce((acc, row: Array<any>) => {
    const o = row.shift();
    const operator = operators[o];
    const sorted = row.reverse();

    const columns = splitIntoColumns(sorted);
    const value = columns.reverse().reduce(
      (acc, curr) => {
        const number = Number(curr.join(""));

        return operator(acc, number);
      },
      o === "*" ? 1 : 0
    );

    return acc + value;
  }, 0);
};
