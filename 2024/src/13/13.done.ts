import { exercise } from ".";
import { data } from "./data";

const mockData = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`;

describe("exercise1", () => {
  test("mockData", () => {
    const res = exercise(mockData, 1);

    expect(res).toEqual(480);
  });

  test("data", () => {
    const res = exercise(data, 1);

    expect(res).toEqual(31761);
  });
});

describe("exercise2", () => {
  test("mockData", () => {
    const res = exercise(mockData, 2);

    expect(res).toEqual(875318608908);
  });

  test("data", () => {
    const res = exercise(data, 2);

    expect(res).toEqual(90798500745591);
  });
});
