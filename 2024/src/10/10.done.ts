import { exercise, parse } from ".";
import { data } from "./data";

const mockData = `0123
1234
8765
9876`;

describe("parse", () => {
  test("mockData", () => {
    const res = parse(mockData);

    expect(res).toEqual(expect.arrayContaining([]));
  });
});

describe("exercise1", () => {
  test("mockData", () => {
    const res = exercise(mockData);

    expect(res).toEqual(1);
  });

  test("mockData2", () => {
    const res = exercise(`...0...
...1...
...2...
6543456
7.....7
8.....8
9.....9`);

    expect(res).toEqual(2);
  });

  test("mockData4", () => {
    const res = exercise(`..90..9
...1.98
...2..7
6543456
765.987
876....
987....`);

    expect(res).toEqual(4);
  });

  test("more than 1 trail head", () => {
    const res = exercise(`89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`);

    expect(res).toEqual(36);
  });

  test("data", () => {
    const res = exercise(data);

    expect(res).toEqual(694);
  });
});

describe("exercise2", () => {
  test("more than 1 trail head", () => {
    const res = exercise(
      `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`,
      true
    );

    expect(res).toEqual(81);
  });

  test("data", () => {
    const res = exercise(data, true);

    expect(res).toEqual(1497);
  });
});
