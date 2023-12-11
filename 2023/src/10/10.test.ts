import {
  buildValidPath,
  exercise1,
  findStart,
  parse,
  getNextValidPipe,
  exercise2,
} from ".";
import { data } from "./data";

const mockData = `-L|F7
7S-7|
L|7||
-L-J|
L|-JF`;

const mockData2 = `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`;

describe("parse", () => {
  test("mockData", () => {
    const res = parse(mockData);

    expect(res).toEqual([
      ["-", "L", "|", "F", "7"],
      ["7", "S", "-", "7", "|"],
      ["L", "|", "7", "|", "|"],
      ["-", "L", "-", "J", "|"],
      ["L", "|", "-", "J", "F"],
    ]);
  });

  test("mockData", () => {
    const res = parse(mockData2);

    console.log("res", res);
    expect(res).toEqual([
      ["7", "-", "F", "7", "-"],
      [".", "F", "J", "|", "7"],
      ["S", "J", "L", "L", "7"],
      ["|", "F", "-", "-", "J"],
      ["L", "J", ".", "L", "J"],
    ]);
  });
});

describe("findStart", () => {
  test("mockData", () => {
    const res = findStart([
      ["-", "L", "|", "F", "7"],
      ["7", "S", "-", "7", "|"],
      ["L", "|", "7", "|", "|"],
      ["-", "L", "-", "J", "|"],
      ["L", "|", "-", "J", "F"],
    ]);

    expect(res).toEqual([1, 1]);
  });

  test("mockData", () => {
    const res = findStart([
      ["7", "-", "F", "7", "-"],
      [".", "F", "J", "|", "7"],
      ["S", "J", "L", "L", "7"],
      ["|", "F", "-", "-", "J"],
      ["L", "J", ".", "L", "J"],
    ]);

    expect(res).toEqual([2, 0]);
  });
});

describe("getNextValidPipe", () => {
  test("S in mockData", () => {
    const res = getNextValidPipe(
      [
        ["-", "L", "|", "F", "7"],
        ["7", "S", "-", "7", "|"],
        ["L", "|", "7", "|", "|"],
        ["-", "L", "-", "J", "|"],
        ["L", "|", "-", "J", "F"],
      ],
      [1, 1],
      "S",
      [1, 1]
    );

    expect(res).toEqual([[2, 1], "|"]);
  });

  test("ignores previous", () => {
    const res = getNextValidPipe(
      [
        ["-", "L", "|", "F", "7"],
        ["7", "S", "-", "7", "|"],
        ["L", ".", "7", "|", "|"],
        ["-", "L", "-", "J", "|"],
        ["L", "|", "-", "J", "F"],
      ],
      [2, 1],
      "|",
      [1, 1]
    );

    expect(res).toEqual([[3, 1], "L"]);
  });

  test("edge case", () => {
    const res = getNextValidPipe(
      [
        ["7", "-", "F", "7", "-"],
        [".", "F", "J", "|", "7"],
        ["S", "J", "L", "L", "7"],
        [".", "F", "-", "-", "J"],
        [".", ".", ".", "L", "J"],
      ],
      [4, 1],
      "J",
      [4, 0]
    );

    expect(res).toEqual([[3, 1], "F"]);
  });
});
describe("buildValidPath", () => {
  test("mockData", () => {
    const res = buildValidPath(
      [
        ["-", "L", "|", "F", "7"],
        ["7", "S", "-", "7", "|"],
        ["L", "|", "7", "|", "|"],
        ["-", "L", "-", "J", "|"],
        ["L", "|", "-", "J", "F"],
      ],
      [1, 1]
    );

    expect(res).toEqual(
      expect.arrayContaining([
        [1, 1],
        [1, 2],
        [1, 3],
        [2, 3],
        [3, 3],
        [3, 2],
        [3, 1],
        [2, 1],
      ])
    );
  });

  // test("mockData", () => {
  //   const res = findStart([
  //     ["7", "-", "F", "7", "-"],
  //     [".", "F", "J", "|", "7"],
  //     ["S", "J", "L", "L", "7"],
  //     ["|", "F", "-", "-", "J"],
  //     ["L", "J", ".", "L", "J"],
  //   ]);

  //   expect(res).toEqual([2, 0]);
  // });
});
describe("exercise1", () => {
  test("mockData", () => {
    const res = exercise1(mockData);

    expect(res).toEqual(4);
  });

  test("mockData2", () => {
    const res = exercise1(mockData2);

    expect(res).toEqual(8);
  });

  test.skip("data", () => {
    const res = exercise1(data);

    expect(res).toEqual(6714);
  });
});

describe("exercise2", () => {
  test("mockData", () => {
    const res = exercise2(`...........
    .S-------7.
    .|F-----7|.
    .||.....||.
    .||.....||.
    .|L-7.F-J|.
    .|..|.|..|.
    .L--J.L--J.
    ...........`);

    expect(res).toEqual(4);
  });

  test.skip("real data", () => {
    const res = exercise2(data);

    expect(res).toEqual(429);
  });
});
