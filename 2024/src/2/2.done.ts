import { exercise1, parse, exercise2 } from ".";
import { data } from "./data";

const mockData = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

describe("parse", () => {
  test("mockData", () => {
    const res = parse(mockData);

    expect(res).toEqual(expect.arrayContaining([[7, 6, 4, 2, 1]]));
  });
});

describe("exercise1", () => {
  test("mockData", () => {
    const res = exercise1(mockData);

    expect(res).toEqual(2);
  });

  test("data", () => {
    const res = exercise1(data);

    expect(res).toEqual(598);
  });
});

describe("exercise2", () => {
  test("mockData", () => {
    const res = exercise2(mockData);

    expect(res).toEqual(4);
  });

  test("data", () => {
    const res = exercise2(data);

    expect(res).toEqual(634);
  });
});
