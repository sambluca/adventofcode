import { extrapolate, findDiffs, picksTheorom, shoelace } from "..";

describe("findDiffs", () => {
  test("0 3 6 9 12 15", () => {
    const res = findDiffs([0, 3, 6, 9, 12, 15]);

    expect(res).toEqual([3, 3, 3, 3, 3]);
  });

  test("1 3 6 10 15 21", () => {
    const res = findDiffs([1, 3, 6, 10, 15, 21]);

    expect(res).toEqual([2, 3, 4, 5, 6]);
  });

  test("10 13 16 21 30 45", () => {
    const res = findDiffs([10, 13, 16, 21, 30, 45]);

    expect(res).toEqual([3, 3, 5, 9, 15]);
  });

  test("[3, 3, 3, 3, 3]", () => {
    const res = findDiffs([3, 3, 3, 3, 3]);

    expect(res).toEqual([0, 0, 0, 0]);
  });
});

describe("extrapolate", () => {
  test("0 3 6 9 12 15", () => {
    const res = extrapolate([0, 3, 6, 9, 12, 15]);

    expect(res).toEqual(18);
  });

  test("[1, 3, 6, 10, 15, 21]", () => {
    const res = extrapolate([1, 3, 6, 10, 15, 21]);

    expect(res).toEqual(28);
  });

  test("10 13 16 21 30 45", () => {
    const res = extrapolate([10, 13, 16, 21, 30, 45]);

    expect(res).toEqual(68);
  });

  test("10 13 16 21 30 45 backwards", () => {
    const res = extrapolate([10, 13, 16, 21, 30, 45].reverse());

    expect(res).toEqual(5);
  });
});

describe("picks theorom", () => {
  test("find interior points", () => {
    const res = picksTheorom({ boundaryPoints: 8, area: 10 });

    expect(res).toEqual(7);
  });

  test("find area", () => {
    const res = picksTheorom({ boundaryPoints: 8, interiorPoints: 7 });

    expect(res).toEqual(10);
  });

  test("find boundary points", () => {
    const res = picksTheorom({ area: 10, interiorPoints: 7 });

    expect(res).toEqual(8);
  });
});

describe("shoelace", () => {
  test("this example https://www.101computing.net/the-shoelace-algorithm/", () => {
    const vertices: Array<[number, number]> = [
      [2, 7],
      [10, 1],
      [8, 6],
      [11, 7],
      [7, 10],
    ];

    const res = shoelace(vertices);

    expect(res).toEqual(32);
  });
});
