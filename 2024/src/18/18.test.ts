import { exercise1, parse, exercise2 } from ".";
import { data } from "./data";

const mockData = `5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`;

describe("parse", () => {
  test("mockData", () => {
    const [grid] = parse(mockData, 6, 12);

    expect(grid.text()).toEqual(`...#...
..#..#.
....#..
...#..#
..#..#.
.#..#..
#.#....`);
  });
});

describe("exercise1", () => {
  test("mockData", () => {
    const res = exercise1(mockData, 6, 12);

    expect(res).toEqual(22);
  });

  test("data", () => {
    const res = exercise1(data, 70, 1024);

    expect(res).toEqual(302);
  });
});

describe("exercise2", () => {
  test("mockData", () => {
    const res = exercise2(mockData, 6, 12);

    expect(res).toEqual([6, 1]);
  });

  test("data", () => {
    const res = exercise2(data, 70, 1024);

    expect(res).toEqual([24, 32]);
  });
});
