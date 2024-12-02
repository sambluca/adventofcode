import { exercise1, parse, exercise2 } from ".";
import { data } from "./data";

const mockData = `3   4
4   3
2   5
1   3
3   9
3   3`;

describe("parse", () => {
  test("mockData", () => {
    const res = parse(mockData);

    expect(res).toEqual([
      [3, 4, 2, 1, 3, 3],
      [4, 3, 5, 3, 9, 3],
    ]);
  });
});

describe("exercise1", () => {
  test("mockData", () => {
    const res = exercise1(mockData);

    expect(res).toEqual(11);
  });

  test("data", () => {
    const res = exercise1(data);

    expect(res).toEqual(2904518);
  });
});

describe("exercise2", () => {
  test("mockData", () => {
    const res = exercise2(mockData);

    expect(res).toEqual(31);
  });

  test("data", () => {
    const res = exercise2(data);

    expect(res).toEqual(18650129);
  });
});
