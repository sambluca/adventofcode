import { parse, exercise } from ".";
import { data } from "./data";

const mockData = `###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############`;

describe("parse", () => {
  test("mockData", () => {
    const res = parse(mockData);

    expect(res).toEqual(expect.arrayContaining([]));
  });
});

describe("exercise1", () => {
  test("mockData", () => {
    const res = exercise(mockData, 2, 2);

    expect(res).toEqual(44);
  });

  test("data", () => {
    const res = exercise(data);

    expect(res).toEqual(1387);
  });
});

describe("exercise2", () => {
  test("mockData", () => {
    const res = exercise(mockData, 50, 20);

    expect(res).toEqual(285);
  });

  test("data", () => {
    const res = exercise(data, 100, 20);

    expect(res).toEqual(1015092);
  });
});
