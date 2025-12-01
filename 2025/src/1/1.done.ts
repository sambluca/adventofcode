import { parse, exercise } from ".";
import { data } from "./data";

const mockData = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

describe("parse", () => {
  test("mockData", () => {
    const res = parse(mockData);

    expect(res).toEqual(expect.arrayContaining([]));
  });
});

describe("exercise1", () => {
  test("mockData", () => {
    const [, res] = exercise(mockData);

    expect(res).toEqual(3);
  });

  test("data", () => {
    const [, res] = exercise(data);

    expect(res).toEqual(1074);
  });
});

describe("exercise2", () => {
  test("mockData", () => {
    const [res, zeroCount] = exercise(mockData);

    expect(res).toEqual(6);
  });

  test("data", () => {
    const [res] = exercise(data);

    expect(res).toEqual(6254);
  });
});
