import { exercise1, parse, exercise2 } from ".";
import { data } from "./data";

const mockData = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;

describe("parse", () => {
  test("mockData", () => {
    const res = parse(mockData);

    expect(res).toEqual(expect.arrayContaining([]));
  });
});

describe("exercise1", () => {
  test("mockData", () => {
    const res = exercise1(mockData);

    expect(res).toEqual(13);
  });

  test("data", () => {
    const res = exercise1(data);

    expect(res).toEqual(1560);
  });
});

describe("exercise2", () => {
  test("mockData", () => {
    const res = exercise2(mockData);

    expect(res).toEqual(43);
  });

  test("data", () => {
    const res = exercise2(data);

    expect(res).toEqual(9609);
  });
});
