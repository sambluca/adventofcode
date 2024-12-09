import fs from "fs";
import { exercise1, parse, exercise2 } from ".";

const mockData = `2333133121414131402`;

const data = fs.readFileSync(
  "/Users/gianluca.tramontana/personal/adventofcode/2024/src/9/data.txt",
  "utf-8"
);
describe("parse", () => {
  test("mockData", () => {
    const res = parse(mockData);

    expect(res).toEqual(expect.arrayContaining([]));
  });
});

describe("exercise1", () => {
  test("mockData", () => {
    const res = exercise1(mockData);

    expect(res).toEqual(1928);
  });

  test("data", () => {
    const res = exercise1(data);

    expect(res).toEqual(6370402949053);
  });
});

describe("exercise2", () => {
  test("mockData", () => {
    const res = exercise2(mockData);

    expect(res).toEqual(2858);
  });

  test("data", () => {
    const res = exercise2(data);

    expect(res).toEqual(6398096697992);
  });
});
