import { exercise1, parse, exercise2 } from ".";
import { data } from "./data";

const mockData = `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`;

describe("exercise1", () => {
  test("mockData", () => {
    const res = exercise1(mockData);

    expect(res).toEqual(7036);
  });

  test("data", () => {
    const res = exercise1(data);

    expect(res).toEqual(72400);
  });
});

describe("exercise2", () => {
  test.only("mockData", () => {
    const res = exercise2(mockData, exercise1(mockData));

    expect(res).toEqual(45);
  });

  test("data", () => {
    const res = exercise2(data, 72400);

    expect(res).toEqual(435);
  });
});
