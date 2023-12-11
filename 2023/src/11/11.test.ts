import { exercise1, exercise2, getShortestPath, parse } from ".";
import { data } from "./data";

const mockData = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

describe("parse", () => {
  test("mockData", () => {
    const galaxies = parse(mockData);

    expect(galaxies).toEqual([
      [4, 0],
      [9, 1],
      [0, 2],
      [8, 5],
      [1, 6],
      [12, 7],
      [9, 10],
      [0, 11],
      [5, 11],
    ]);
  });
});

describe("getShortestPath", () => {
  test("[1, 6] and [5, 11", () => {
    const res = getShortestPath([1, 6], [5, 11]);

    expect(res).toEqual(9);
  });

  test("[ 4, 0 ] and [ 0, 2 ]", () => {
    const res = getShortestPath([4, 0], [0, 2]);

    expect(res).toEqual(6);
  });
});

describe("exercise1", () => {
  test("mockdata", () => {
    const res = exercise1(mockData);

    expect(res).toEqual(374);
  });

  test.skip("data", () => {
    const res = exercise1(data);

    expect(res).toEqual(9403026);
  });
});

describe("exercise2", () => {
  test("10 dis", () => {
    const res = exercise2(mockData, 10);

    expect(res).toEqual(1030);
  });

  test("100 dis", () => {
    const res = exercise2(mockData, 100);

    expect(res).toEqual(8410);
  });

  test.skip("data", () => {
    const res = exercise2(data, 1000000);

    expect(res).toEqual(543018317006);
  });
});
