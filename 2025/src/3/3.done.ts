import { exercise1, parse, exercise2 } from ".";
import { data } from "./data";

const mockData = `987654321111111
811111111111119
234234234234278
818181911112111`;

describe("parse", () => {
  test("mockData", () => {
    const res = parse(mockData);

    expect(res).toEqual(expect.arrayContaining([]));
  });
});

describe("exercise1", () => {
  test("mockData", () => {
    const res = exercise1(mockData);

    expect(res).toEqual(357);
  });

  test("data", () => {
    const res = exercise1(data);

    expect(res).toEqual(17535);
  });
});

describe("exercise2", () => {
  test("mockData", () => {
    const res = exercise2(mockData);

    expect(res).toEqual(3121910778619);
  });

  test("data", () => {
    const res = exercise2(data);

    expect(res).toEqual(173577199527257);
  });
});
