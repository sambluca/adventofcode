import { exercise, parse } from ".";
import { data } from "./data";

const mockData = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`;

describe("parse", () => {
  test("mockData", () => {
    const res = parse(mockData);

    expect(res).toEqual(expect.arrayContaining([]));
  });
});

describe("exercise1", () => {
  test.skip("mockData", () => {
    const res = exercise(mockData);

    expect(res).toEqual(12);
  });

  test("data", () => {
    const res = exercise(data);

    expect(res).toEqual(226179492);
  });
});

describe("exercise2", () => {
  test("data", () => {
    const res = exercise(data, true);

    expect(res).toEqual(7502);
  });
});
