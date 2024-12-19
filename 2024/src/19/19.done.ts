import { exercise1, parse, exercise2 } from ".";
import { data } from "./data";

const mockData = `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`;

describe("parse", () => {
  test("mockData", () => {
    const { combos, towels } = parse(mockData);

    expect(combos).toEqual(["r", "wr", "b", "g", "bwu", "rb", "gb", "br"]);

    expect(towels).toEqual([
      "brwrr",
      "bggr",
      "gbbr",
      "rrbgbr",
      "ubwu",
      "bwurrg",
      "brgr",
      "bbrgwb",
    ]);
  });
});

describe("exercise1", () => {
  test("mockData", () => {
    const res = exercise1(mockData);
    expect(res).toEqual(6);
  });

  test("data", () => {
    const res = exercise1(data);

    expect(res).toEqual(300);
  });
});

describe("exercise2", () => {
  test("mockData", () => {
    const res = exercise2(mockData);

    expect(res).toEqual(16);
  });

  test("data", () => {
    const res = exercise2(data);

    expect(res).toEqual(624802218898092);
  });
});
