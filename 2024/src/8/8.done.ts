import { parse, exercise } from ".";
import { data } from "./data";

const mockData = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

describe("parse", () => {
  test("mockData", () => {
    const res = parse(mockData);

    expect(res).toEqual(expect.arrayContaining([]));
  });
});

describe("exercise1", () => {
  test("mockData", () => {
    const res = exercise(mockData);

    expect(res).toEqual(14);
  });

  test("data", () => {
    const res = exercise(data);

    expect(res).toEqual(303);
  });
});

describe("exercise2", () => {
  test("mockData", () => {
    const res = exercise(mockData, true);

    expect(res).toEqual(34);
  });

  test("data", () => {
    const res = exercise(data, true);

    expect(res).toEqual(1045);
  });
});
