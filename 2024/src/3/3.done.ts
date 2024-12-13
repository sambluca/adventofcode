import { exercise1, parse, exercise2, parse2 } from ".";
const fs = require("fs");

const data = fs.readFileSync("src/3/data.txt", "utf8");
const mockData = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

describe("parse", () => {
  test("mockData", () => {
    const res = parse(mockData);

    expect(res).toEqual(
      expect.arrayContaining([
        [2, 4],
        [5, 5],
        [11, 8],
        [8, 5],
      ])
    );
  });
});

describe("parse2", () => {
  test("mockData", () => {
    const res = parse2(
      `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`
    );

    expect(res).toEqual(
      expect.arrayContaining([
        [2, 4],
        [8, 5],
      ])
    );
  });
});

describe("exercise1", () => {
  test("mockData", () => {
    const res = exercise1(mockData);

    expect(res).toEqual(161);
  });

  test("data", () => {
    const res = exercise1(data);

    expect(res).toEqual(162813399);
  });
});

describe("exercise2", () => {
  test("mockData", () => {
    const res = exercise2(
      `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`
    );

    expect(res).toEqual(48);
  });

  test("data", () => {
    const res = exercise2(data);

    expect(res).toEqual(53783319);
  });
});
