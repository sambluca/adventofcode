import { exercise1, parse, exercise2 } from ".";
import { data } from "./data";

const mockData = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

describe("parse", () => {
  test("mockData", () => {
    const res = parse(mockData);

    expect(res).toEqual(
      expect.arrayContaining([
        {
          testValue: 190,
          values: [10, 19],
        },
      ])
    );
  });
});

describe("exercise1", () => {
  test("mockData", () => {
    const res = exercise1(mockData);
    expect(res).toEqual(3749);
  });

  test("data", () => {
    const res = exercise1(data);

    expect(res).toEqual(4364915411363);
  });
});

describe("exercise2", () => {
  test("mockData", () => {
    const res = exercise2(mockData);

    expect(res).toEqual(11387);
  });

  test("data", () => {
    const res = exercise2(data);

    expect(res).toEqual(38322057216320);
  });
});
