import { exercise1, parse, exercise2, dig } from ".";
import { data } from "./data";

const mockData = `R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)`;

describe("parse", () => {
  test("mockData part 1", () => {
    const res = parse(mockData);

    expect(res).toEqual(
      expect.arrayContaining([
        {
          dir: "R",
          length: 6,
        },
      ])
    );
  });

  test("mockData part 2", () => {
    const res = parse(mockData, true);

    expect(res).toEqual([
      {
        dir: "R",
        length: 461937,
      },
      {
        dir: "D",
        length: 56407,
      },
      {
        dir: "R",
        length: 356671,
      },
      {
        dir: "D",
        length: 863240,
      },
      { dir: "R", length: 367720 },
      { dir: "D", length: 266681 },
      { dir: "L", length: 577262 },
      { dir: "U", length: 829975 },
      { dir: "L", length: 112010 },
      { dir: "D", length: 829975 },
      { dir: "L", length: 491645 },
      { dir: "U", length: 686074 },
      { dir: "L", length: 5411 },
      { dir: "U", length: 500254 },
    ]);
  });
});

describe("dig", () => {
  test("mockData", () => {
    const data = parse(`R 6 (#70c710)
D 5 (#0dc571)`);

    const res = dig(data);

    expect(res).toEqual({
      boundaryPoints: 11,
      paths: [
        [0, 0],
        [6, 0],
        [6, 5],
      ],
    });
  });
});

describe("exercise1", () => {
  test("mockData", () => {
    const res = exercise1(mockData);

    expect(res).toEqual(62);
  });

  test("data", () => {
    const res = exercise1(data);

    expect(res).toEqual(40745);
  });
});

describe("exercise2", () => {
  test("mockData", () => {
    const res = exercise2(mockData);

    expect(res).toEqual(952408144115);
  });

  test("data", () => {
    const res = exercise2(data);

    expect(res).toEqual(90111113594927);
  });
});
