import { exercise1, parse, exercise2 } from ".";
import { data } from "./data";

const mockData = `1
10
100
2024`;

describe("parse", () => {
  test("mockData", () => {
    const res = parse(mockData);

    expect(res).toEqual(expect.arrayContaining([]));
  });
});

describe("exercise1", () => {
  test("mockData", () => {
    const res = exercise1(mockData);

    expect(res.toString()).toEqual("37327623");
  });

  test("data", () => {
    const res = exercise1(data);

    expect(res.toString()).toEqual("14180628689");
  });
});

describe("exercise2", () => {
  const mockData2 = `1
2
3
2024`;

  test("mockData", () => {
    const res = exercise2(mockData2);
    expect(res).toEqual(23);
  });

  test.skip("data", () => {
    const res = exercise2(data);

    expect(res).toEqual(1690);
  });
});
