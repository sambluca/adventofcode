import { exercise1, exercise2 } from ".";
import { data } from "./data";

const mockData = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

describe("exercise1", () => {
  test("mockData", () => {
    const res = exercise1(mockData);

    expect(res).toEqual(4277556);
  });

  test("data", () => {
    const res = exercise1(data);

    expect(res).toEqual(4580995422905);
  });
});

describe("exercise2", () => {
  test("mockData", () => {
    const res = exercise2(mockData);

    expect(res).toEqual(3263827);
  });

  test("data", () => {
    const res = exercise2(data);

    expect(res).toEqual(10875057285868);
  });
});
