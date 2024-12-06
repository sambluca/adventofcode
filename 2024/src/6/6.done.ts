import { parse, exercise } from ".";
import { data } from "./data";

const mockData = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

describe("parse", () => {
  test("mockData", () => {
    const res = parse(mockData);

    expect(res).toEqual([
      [".", ".", ".", ".", "#", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", "#", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "#", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", "#", ".", ".", "^", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "#", "."],
      ["#", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", "#", ".", ".", "."],
    ]);
  });
});

describe("exercise1", () => {
  test("mockData", () => {
    const res = exercise(mockData, 1);

    expect(res).toEqual(41);
  });

  test("data", () => {
    const res = exercise(data, 1);

    expect(res).toEqual(4602);
  });
});

describe("exercise2", () => {
  test("mockData", () => {
    const res = exercise(mockData, 2);

    expect(res).toEqual(6);
  });

  test("data", () => {
    const res = exercise(data, 2);

    expect(res).toEqual(1703);
  });
});
