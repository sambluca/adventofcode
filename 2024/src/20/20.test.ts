import { exercise1, parse, exercise2 } from ".";
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
    const res = exercise1(mockData, 2);

    expect(res).toEqual(44);
  });

  test("data", () => {
    const res = exercise1(data);

    expect(res).toEqual(1387);
  });
});

describe("exercise2", () => {
  test("mockData", () => {
    const res = exercise2(mockData, 50);

    expect(res).toEqual(285);
  });

  test.skip("data", () => {
    const res = exercise2(data);

    expect(res).toEqual(1015092);
  });
});
