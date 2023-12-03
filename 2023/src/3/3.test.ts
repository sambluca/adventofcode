import {
  exercise1,
  exercise2,
  getFullNumberFromLeft,
  getFullNumberFromRight,
  isSymbol,
} from ".";
import { data } from "./data";

const mockData = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

const mockData2 = `
*****.....
*234*.....
*****.....
`;

const mockData3 = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
..........
........*.
.664.598.2
`;

const mockData4 = `
......755.
...$.*....
.664.598..`;

const mockData5 = `
.....75...
...$.*....
.664.598..`;

const mockData6 = `
....755...
...$.*....
.664.598..`;

const mockData7 = `
.......755
...$....*.
bb.....755
...$....*.
.664...598`;

const mockData8 = `
..1.9......
..3*4.....
bb.5.......`;

const mockData9 = `12.......*..
+.........34
.......-12..
..78........
..*....60...
78.........9
.5.....23..$
8...90*12...
............
2.2......12.
.*.........*
1.1..503+.56
`;

const mockData10 = `12.......*..
+.........34
.......-12..
..78........
..*....60...
78..........
.......23...
....90*12...
............
2.2......12.
.*.........*
1.1.......56
`;

const mockData11 = `23.4
..*.
`;
describe("isSymbol", () => {
  test("A", () => {
    const res = isSymbol("A");

    expect(res).toEqual(false);
  });
  test("1", () => {
    const res = isSymbol("1");

    expect(res).toEqual(false);
  });

  test("4", () => {
    const res = isSymbol("4");

    expect(res).toEqual(false);
  });

  test(".", () => {
    const res = isSymbol(".");

    expect(res).toEqual(false);
  });

  test("!", () => {
    const res = isSymbol("!");

    expect(res).toEqual(true);
  });

  test("=", () => {
    const res = isSymbol("=");

    expect(res).toEqual(true);
  });
});
describe("exercise 1", () => {
  test("mockData", () => {
    const res = exercise1(mockData);
    expect(res).toEqual(4361);
  });

  test("mockData2", () => {
    const res = exercise1(mockData2);

    expect(res).toEqual(234);
  });

  test("mockData3", () => {
    const res = exercise1(mockData3);

    expect(res).toEqual(4961);
  });

  test("data", () => {
    const res = exercise1(data);

    expect(res).toEqual(551094);
  });
});

describe.only("exercise 2", () => {
  test("mockData", () => {
    const res = exercise2(mockData);

    expect(res).toEqual(467835);
  });

  test("mockData4", () => {
    const res = exercise2(mockData4);

    expect(res).toEqual(451490);
  });

  test("mockData7", () => {
    const res = exercise2(mockData7);

    expect(res).toEqual(1021515);
  });

  test("mockData5", () => {
    const res = exercise2(mockData5);

    expect(res).toEqual(44850);
  });

  test("mockData8", () => {
    const res = exercise2(mockData8);

    expect(res).toEqual(0);
  });

  test("mockData9", () => {
    const res = exercise2(mockData9);

    expect(res).toEqual(6756);
  });

  test("mockData10", () => {
    const res = exercise2(mockData10);

    expect(res).toEqual(6756);
  });

  test("mockData11", () => {
    const res = exercise2(mockData11);

    expect(res).toEqual(92);
  });

  test("realData", () => {
    const res = exercise2(data);

    expect(res).toEqual(80179647);
  });
});
describe("getFullNumberFromRight", () => {
  test("617*......", () => {
    const data = ["6", "1", "7", "*", ".", ".", ".", ".", ".", "."];

    const res = getFullNumberFromRight(data, 2);

    expect(res).toEqual("617");
  });

  test("....12*....", () => {
    const data = [".", ".", ".", ".", "1", "2", "*", ".", ".", "."];

    const res = getFullNumberFromRight(data, 5);

    expect(res).toEqual("12");
  });

  test("....12*...4.", () => {
    const data = [".", ".", ".", ".", "1", "2", ".", ".", "4", "."];

    const res = getFullNumberFromRight(data, 5);

    expect(res).toEqual("12");
  });

  test("....12....4*", () => {
    const data = [".", ".", ".", ".", "1", "2", ".", ".", "4", "*"];

    const res = getFullNumberFromRight(data, 8);

    expect(res).toEqual("4");
  });
});

describe("getFullNumberFromLeft", () => {
  test("617*......", () => {
    const data = ["6", "1", "7", "*", ".", ".", ".", ".", ".", "."];

    const res = getFullNumberFromLeft(data, 0);

    expect(res).toEqual("617");
  });

  test("....12*....", () => {
    const data = [".", ".", ".", ".", "1", "2", "*", ".", ".", "."];

    const res = getFullNumberFromLeft(data, 4);

    expect(res).toEqual("12");
  });

  test("....12*...4.", () => {
    const data = [".", "2", ".", ".", "1", "2", ".", ".", "4", "."];

    const res = getFullNumberFromLeft(data, 4);

    expect(res).toEqual("12");
  });

  test("....12....4*", () => {
    const data = [".", ".", ".", ".", "1", "2", ".", ".", "4", "*"];

    const res = getFullNumberFromLeft(data, 8);

    expect(res).toEqual("4");
  });
});
