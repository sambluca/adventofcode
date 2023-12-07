import { isNumber } from "../utils";

export const isSymbol = (text: string) =>
  !text.match(/([a-zA-Z]|[\d]|[.]|\s)/g);

export const checkForStar = (text: string) => text.match(/([*])/g);

const getNumberFromArray = (row: string[]) =>
  row.reduce((acc: string[], curr) => {
    if (isNumber(curr)) {
      acc.push(curr);
    } else {
      row.splice(1);
    }

    return acc;
  }, []);

export const getFullNumberFromRight = (row: string[], rowI: number) =>
  getNumberFromArray([...row].slice(0, rowI + 1).reverse())
    .reverse()
    .join("");

export const getFullNumberFromLeft = (row: string[], rowI: number) =>
  getNumberFromArray([...row].slice(rowI, row.length + 1)).join("");

export const exercise1 = (text: string) => {
  const grid = text.split(/\n/g).map((i) => i.split(""));

  return grid.reduce((acc, row, gridI) => {
    let previousNumber = -1;

    return (
      acc +
      row.reduce((rowAcc, item, rowI) => {
        const itemNumber = isNumber(item);
        if (itemNumber) {
          const symbolEitherSide =
            isSymbol(row[rowI - 1] || "A") || isSymbol(row[rowI + 1] || "A");

          const startNumber = !isNumber(row[rowI - 1]);
          const endNumber = !isNumber(row[rowI + 1]);

          const getNumber = startNumber
            ? getFullNumberFromLeft
            : getFullNumberFromRight;

          const rowAbove = grid[gridI - 1] || [];
          const rowBelow = grid[gridI + 1] || [];

          const symbolUpDownLeft =
            isSymbol(rowAbove[rowI - 1] || "A") ||
            isSymbol(rowBelow[rowI - 1] || "A");

          const symbolUpDownMidRight =
            isSymbol(rowAbove[rowI] || "A") ||
            isSymbol(rowAbove[rowI + 1] || "A") ||
            isSymbol(rowBelow[rowI] || "A") ||
            isSymbol(rowBelow[rowI + 1] || "A");

          if (
            symbolEitherSide ||
            (symbolUpDownLeft && startNumber) ||
            (symbolUpDownMidRight && (startNumber || endNumber))
          ) {
            const num = Number(getNumber(row, rowI));

            if (previousNumber !== num) {
              previousNumber = num;
              return rowAcc + num;
            }
          }

          if (endNumber) previousNumber = -1;
        }

        return rowAcc;
      }, 0)
    );
  }, 0);
};

export const exercise2 = (text: string) => {
  const grid = text.split(/\n/g).map((i) => i.split(""));

  let total = 0;
  grid.forEach((row, gridI) => {
    row.forEach((item, rowI) => {
      let touching: number[] = [];

      const isStar = checkForStar(item);
      if (isStar) {
        const rowAbove = grid[gridI - 1] || [];
        const rowBelow = grid[gridI + 1] || [];
        const numberLeft: number =
          (isNumber(row[rowI - 1]) &&
            Number(getFullNumberFromRight(row, rowI - 1))) ||
          0;

        const numberRight: number =
          (isNumber(row[rowI + 1]) &&
            Number(getFullNumberFromLeft(row, rowI + 1))) ||
          0;

        const downLeft = isNumber(rowBelow[rowI - 1]);
        const downRight = isNumber(rowBelow[rowI + 1]);
        const downMiddle = isNumber(rowBelow[rowI]);

        const upLeft = isNumber(rowAbove[rowI - 1]);
        const upRight = isNumber(rowAbove[rowI + 1]);
        const upMiddle = isNumber(rowAbove[rowI]);

        // check around the start and get the right numbers
        if (downLeft && !downMiddle) {
          const num = Number(getFullNumberFromRight(rowBelow, rowI - 1));
          touching.push(num);
        }

        if (downRight && !downMiddle) {
          const num = Number(getFullNumberFromLeft(rowBelow, rowI + 1));
          touching.push(num);
        }

        if (downLeft && downMiddle && !downRight) {
          const num = Number(getFullNumberFromRight(rowBelow, rowI));
          touching.push(num);
        }

        if (!downLeft && downMiddle && downRight) {
          const num = Number(getFullNumberFromLeft(rowBelow, rowI));
          touching.push(num);
        }

        if (!downLeft && downMiddle && !downRight) {
          const num = Number(getFullNumberFromLeft(rowBelow, rowI));
          touching.push(num);
        }

        if (downLeft && downRight && downMiddle) {
          const num = Number(getFullNumberFromRight(rowBelow, rowI + 1));
          touching.push(num);
        }

        if (upLeft && !upMiddle) {
          const num = Number(getFullNumberFromRight(rowAbove, rowI - 1));
          touching.push(num);
        }

        if (upRight && !upMiddle) {
          const num = Number(getFullNumberFromLeft(rowAbove, rowI + 1));
          touching.push(num);
        }

        if (upLeft && upMiddle && !upRight) {
          const num = Number(getFullNumberFromRight(rowAbove, rowI));
          touching.push(num);
        }

        if (!upLeft && upMiddle && upRight) {
          const num = Number(getFullNumberFromLeft(rowAbove, rowI));
          touching.push(num);
        }

        if (!upLeft && upMiddle && !upRight) {
          const num = Number(getFullNumberFromLeft(rowAbove, rowI));
          touching.push(num);
        }
        if (upLeft && upRight && upMiddle) {
          const num = Number(getFullNumberFromRight(rowAbove, rowI + 1));
          touching.push(num);
        }

        touching = [...touching, numberLeft, numberRight].filter(
          (i) => i !== 0
        );

        if (touching.length === 2) {
          const starTotal = touching.reduce((a, b) => a * b);
          total += starTotal;
        }
      }
    });
  });
  return total;
};
