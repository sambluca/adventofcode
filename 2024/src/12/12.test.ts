import { exercise1, parse, exercise2 } from ".";
import { data } from "./data";
import { part2 } from "./try";

const mockData = `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`;

describe("parse", () => {
  test("mockData", () => {
    const res = parse(mockData);

    expect(res).toEqual(expect.arrayContaining([]));
  });
});

describe("exercise1", () => {
  test("mockData", () => {
    const res = exercise1(mockData);

    expect(res).toEqual(772);
  });

  test("mockData2", () => {
    const res = exercise1(`RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`);

    expect(res).toEqual(1930);
  });

  test("data", () => {
    const res = exercise1(data);

    expect(res).toEqual(1396562);
  });
});

describe.skip("exercise2", () => {
  test("mockData", () => {
    const res = exercise2(`AAAA
BBCD
BBCC
EEEC`);

    expect(res).toEqual(80);
  });

  test.skip("data", () => {
    const res = exercise2(data);

    expect(res).toEqual(1396562);
  });
});
