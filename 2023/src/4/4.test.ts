import {
  exercise1,
  exercise2,
  getCardMatches,
  getCardPoints,
  parseData,
  parseNumbers,
  splitNumbers,
  stripCard,
} from ".";
import { data } from "./data";

const mockData = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

const mockData2 = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1`;

const mockData3 = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83`;

const mockData4 = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36`;

describe("exercise 1", () => {
  test("mockData", () => {
    const res = exercise1(mockData);

    expect(res).toEqual(13);
  });

  test("data", () => {
    const res = exercise1(data);

    expect(res).toEqual(22488);
  });
});

describe("parseData", () => {
  test("stripCard", () => {
    const res = stripCard("Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53");

    expect(res).toEqual("41 48 83 86 17 | 83 86  6 31 17  9 48 53");
  });

  test("splitNumbers", () => {
    const res = splitNumbers("41 48 83 86 17 | 83 86  6 31 17  9 48 53");

    expect(res).toEqual(
      expect.arrayContaining(["41 48 83 86 17 ", " 83 86  6 31 17  9 48 53"])
    );
  });

  test("parseNumbers", () => {
    const res = parseNumbers("41 48 83 86 17 ");

    expect(res).toEqual([41, 48, 83, 86, 17]);
  });
  test("parseNumbers blank space", () => {
    const res = parseNumbers(" 83 86  6 31 17  9 48 53");

    expect(res).toEqual([83, 86, 6, 31, 17, 9, 48, 53]);
  });

  test("seperateCards", () => {
    const res = parseData(mockData);

    expect(res).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          winningNumbers: [41, 48, 83, 86, 17],
          chosenNumbers: [83, 86, 6, 31, 17, 9, 48, 53],
          copies: 1,
        }),
      ])
    );
  });
});

describe("getCardPoints", () => {
  test("Card 1", () => {
    const res = getCardPoints({
      winningNumbers: [41, 48, 83, 86, 17],
      chosenNumbers: [83, 86, 6, 31, 17, 9, 48, 53],
      copies: 1,
    });

    expect(res).toEqual(8);
  });

  test("Card 2", () => {
    const res = getCardPoints({
      winningNumbers: [13, 32, 20, 16, 61],
      chosenNumbers: [61, 30, 68, 82, 17, 32, 24, 19],
      copies: 1,
    });

    expect(res).toEqual(2);
  });

  test("Card 3", () => {
    const res = getCardPoints({
      winningNumbers: [1, 21, 53, 59, 44],
      chosenNumbers: [69, 82, 63, 72, 16, 21, 14, 1],
      copies: 1,
    });

    expect(res).toEqual(2);
  });

  test("Card 4", () => {
    const res = getCardPoints({
      winningNumbers: [41, 92, 73, 84, 69],
      chosenNumbers: [59, 84, 76, 51, 58, 5, 54, 83],
      copies: 1,
    });

    expect(res).toEqual(1);
  });

  test("Card 5", () => {
    const res = getCardPoints({
      winningNumbers: [87, 83, 26, 28, 32],
      chosenNumbers: [88, 30, 70, 12, 93, 22, 82, 36],
      copies: 1,
    });

    expect(res).toEqual(0);
  });

  test("Card 6", () => {
    const res = getCardPoints({
      winningNumbers: [31, 18, 13, 56, 72],
      chosenNumbers: [74, 77, 10, 23, 35, 67, 36, 11],
      copies: 1,
    });

    expect(res).toEqual(0);
  });
});

describe("getCardMatches", () => {
  test("Card 1", () => {
    const res = getCardMatches({
      winningNumbers: [41, 48, 83, 86, 17],
      chosenNumbers: [83, 86, 6, 31, 17, 9, 48, 53],
      copies: 1,
    });

    expect(res).toEqual(4);
  });

  test("Card 2", () => {
    const res = getCardMatches({
      winningNumbers: [13, 32, 20, 16, 61],
      chosenNumbers: [61, 30, 68, 82, 17, 32, 24, 19],
      copies: 1,
    });

    expect(res).toEqual(2);
  });

  test("Card 3", () => {
    const res = getCardMatches({
      winningNumbers: [1, 21, 53, 59, 44],
      chosenNumbers: [69, 82, 63, 72, 16, 21, 14, 1],
      copies: 1,
    });

    expect(res).toEqual(2);
  });

  test("Card 4", () => {
    const res = getCardMatches({
      winningNumbers: [41, 92, 73, 84, 69],
      chosenNumbers: [59, 84, 76, 51, 58, 5, 54, 83],
      copies: 1,
    });

    expect(res).toEqual(1);
  });

  test("Card 5", () => {
    const res = getCardMatches({
      winningNumbers: [87, 83, 26, 28, 32],
      chosenNumbers: [88, 30, 70, 12, 93, 22, 82, 36],
      copies: 1,
    });

    expect(res).toEqual(0);
  });

  test("Card 6", () => {
    const res = getCardMatches({
      winningNumbers: [31, 18, 13, 56, 72],
      chosenNumbers: [74, 77, 10, 23, 35, 67, 36, 11],
      copies: 1,
    });

    expect(res).toEqual(0);
  });
});

describe("exercise 2", () => {
  test("mockData", () => {
    const res = exercise2(mockData);

    expect(res).toEqual(30);
  });

  test("mockData2", () => {
    const res = exercise2(mockData2);

    expect(res).toEqual(7);
  });

  test("mockData3", () => {
    const res = exercise2(mockData3);

    expect(res).toEqual(15);
  });

  test("mockData4", () => {
    const res = exercise2(mockData4);

    expect(res).toEqual(29);
  });

  test("data", () => {
    const res = exercise2(data);

    expect(res).toEqual(7013204);
  });
});
