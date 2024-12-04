import { exercise1, parse, exercise2 } from ".";
import { data } from "./data";

const mockData = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

describe("parse", () => {
  test("mockData", () => {
    const res = parse(mockData);

    expect(res).toEqual(expect.arrayContaining(["MMMSXXMASM".split("")]));
  });
});

describe("exercise1", () => {
  test("mockData", () => {
    const res = exercise1(mockData);

    expect(res).toEqual(18);
  });

  test("data", () => {
    const res = exercise1(data);

    expect(res).toEqual(2578);
  });
});

describe("exercise2", () => {
  test("mockData", () => {
    const res = exercise2(mockData);

    expect(res).toEqual(9);
  });

  test("data", () => {
    const res = exercise2(data);

    expect(res).toEqual(1972);
  });
});
