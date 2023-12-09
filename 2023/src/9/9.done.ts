import { exercise1, parse, exercise2 } from ".";
import { data } from "./data";

const mockData = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

describe("parse", () => {
  test("mockData", () => {
    const res = parse(mockData);

    expect(res).toEqual(
      expect.arrayContaining([
        [0, 3, 6, 9, 12, 15],
        [1, 3, 6, 10, 15, 21],
        [10, 13, 16, 21, 30, 45],
      ])
    );
  });
});

describe("exercise1", () => {
  test("mockData", () => {
    const res = exercise1(mockData);

    expect(res).toEqual(114);
  });

  test("data", () => {
    const res = exercise1(data);

    expect(res).toEqual(1938731307);
  });
});

describe("exercise2", () => {
  test("mockData", () => {
    const res = exercise2(mockData);

    expect(res).toEqual(2);
  });

  test("data", () => {
    const res = exercise2(data);

    expect(res).toEqual(948);
  });
});
