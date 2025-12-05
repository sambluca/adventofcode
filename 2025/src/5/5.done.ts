import { exercise1, exercise2, parse } from ".";
import { data } from "./data";

const mockData = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

describe("parse", () => {
  test("mockData", () => {
    const res = parse(mockData);

    expect(res).toEqual(expect.arrayContaining([]));
  });
});

describe("exercise1", () => {
  test("mockData", () => {
    const res = exercise1(mockData);

    expect(res).toEqual(3);
  });

  test("data", () => {
    const res = exercise1(data);

    expect(res).toEqual(681);
  });
});

describe("exercise2", () => {
  test("mockData", () => {
    const res = exercise2(mockData);

    expect(res).toEqual(14);
  });

  test("data", () => {
    const res = exercise2(data);

    expect(res).toEqual(348820208020395);
  });
});
