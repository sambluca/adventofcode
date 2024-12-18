import { exercise1, parse, exercise2 } from ".";
import { data } from "./data";

const mockData = `2x3x4`;

describe("exercise1", () => {
  test("mockData", () => {
    const res = exercise1(mockData);

    expect(res).toEqual(58);
  });

  test("data", () => {
    const res = exercise1(data);

    expect(res).toEqual(1588178);
  });
});

describe("exercise2", () => {
  test("mockData", () => {
    const res = exercise2(mockData);

    expect(res).toEqual(34);
  });

  test("data", () => {
    const res = exercise2(data);

    expect(res).toEqual(3783758);
  });
});
