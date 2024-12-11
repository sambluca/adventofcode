import { exercise } from ".";
import { data } from "./data";

const mockData = `125 17`;

describe("exercise1", () => {
  test("mockData", () => {
    const res = exercise(mockData, 25);

    expect(res).toEqual(55312);
  });

  test("data", () => {
    const res = exercise(data, 25);

    expect(res).toEqual(228668);
  });
});

describe("exercise2", () => {
  test("mockData", () => {
    const res = exercise(mockData, 75);

    expect(res).toEqual(65601038650482);
  });

  test("data", () => {
    const res = exercise(data, 75);

    expect(res).toEqual(270673834779359);
  });
});
