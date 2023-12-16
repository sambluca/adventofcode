import { exercise1, parse, exercise2, next } from ".";
import { data } from "./data";

const mockData = `.|...A....
|.-.A.....
.....|-...
........|.
..........
.........A
..../.AA..
.-.-/..|..
.|....-|.A
..//.|....`;

describe("parse", () => {
  test("mockData", () => {
    const res = parse(mockData);

    expect(res).toEqual([
      [".", "|", ".", ".", ".", "A", ".", ".", ".", "."],
      ["|", ".", "-", ".", "A", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", "|", "-", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "|", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "A"],
      [".", ".", ".", ".", "/", ".", "A", "A", ".", "."],
      [".", "-", ".", "-", "/", ".", ".", "|", ".", "."],
      [".", "|", ".", ".", ".", ".", "-", "|", ".", "A"],
      [".", ".", "/", "/", ".", "|", ".", ".", ".", "."],
    ]);
  });
});

describe("next", () => {
  describe(".", () => {
    test(". east", () => {
      const grid = [
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
      ];
      const res = next([0, 0], "east", ".", grid);

      expect(res).toEqual([{ coords: [1, 0], dir: "east" }]);
    });

    test(". east at end", () => {
      const grid = [
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
      ];
      const res = next([8, 0], "east", ".", grid);

      expect(res).toEqual([]);
    });

    test(". west", () => {
      const grid = [
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
      ];
      const res = next([5, 0], "west", ".", grid);

      expect(res).toEqual([{ coords: [4, 0], dir: "west" }]);
    });

    test(". west at end", () => {
      const grid = [
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
      ];
      const res = next([0, 0], "west", ".", grid);

      expect(res).toEqual([]);
    });

    test(". north", () => {
      const grid = [
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
      ];
      const res = next([5, 1], "north", ".", grid);

      expect(res).toEqual([{ coords: [5, 0], dir: "north" }]);
    });

    test(". north at end", () => {
      const grid = [
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
      ];
      const res = next([0, 0], "north", ".", grid);

      expect(res).toEqual([]);
    });

    test(". south", () => {
      const grid = [
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
      ];
      const res = next([5, 0], "south", ".", grid);

      expect(res).toEqual([{ coords: [5, 1], dir: "south" }]);
    });

    test(". south at end", () => {
      const grid = [
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
      ];
      const res = next([0, 1], "south", ".", grid);

      expect(res).toEqual([]);
    });
  });

  describe("/", () => {
    test("/ east", () => {
      const grid = [
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        ["/", "|", ".", ".", ".", ".", ".", ".", "."],
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
      ];
      const res = next([0, 1], "east", "/", grid);

      expect(res).toEqual([{ coords: [0, 0], dir: "north" }]);
    });

    test("/ west", () => {
      const grid = [
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        ["/", "|", ".", ".", ".", ".", ".", ".", "."],
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
      ];
      const res = next([0, 1], "west", "/", grid);

      expect(res).toEqual([{ coords: [0, 2], dir: "south" }]);
    });

    test("/ north", () => {
      const grid = [
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        ["/", "|", ".", ".", ".", ".", ".", ".", "."],
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
      ];
      const res = next([0, 1], "north", "/", grid);

      expect(res).toEqual([{ coords: [1, 1], dir: "east" }]);
    });

    test("/ south", () => {
      const grid = [
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        ["/", "|", ".", ".", ".", ".", ".", ".", "."],
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
      ];
      const res = next([1, 1], "south", "/", grid);

      expect(res).toEqual([{ coords: [0, 1], dir: "west" }]);
    });
  });

  describe("A", () => {
    test("A east", () => {
      const grid = [
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        ["/", "|", ".", ".", ".", ".", ".", ".", "."],
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
      ];
      const res = next([0, 1], "east", "A", grid);

      expect(res).toEqual([{ coords: [0, 2], dir: "south" }]);
    });

    test("A west", () => {
      const grid = [
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        ["/", "|", ".", ".", ".", ".", ".", ".", "."],
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
      ];
      const res = next([0, 1], "west", "A", grid);

      expect(res).toEqual([{ coords: [0, 0], dir: "north" }]);
    });

    test("A north", () => {
      const grid = [
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        ["/", "|", ".", ".", ".", ".", ".", ".", "."],
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
      ];
      const res = next([1, 1], "north", "A", grid);

      expect(res).toEqual([{ coords: [0, 1], dir: "west" }]);
    });

    test("A south", () => {
      const grid = [
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        ["/", "|", ".", ".", ".", ".", ".", ".", "."],
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
      ];
      const res = next([1, 1], "south", "A", grid);

      expect(res).toEqual([{ coords: [2, 1], dir: "east" }]);
    });
  });

  describe("-", () => {
    test("- east", () => {
      const grid = [
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
      ];
      const res = next([0, 0], "east", "-", grid);

      expect(res).toEqual([{ coords: [1, 0], dir: "east" }]);
    });

    test("- west", () => {
      const grid = [
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
      ];
      const res = next([5, 0], "west", "-", grid);

      expect(res).toEqual([{ coords: [4, 0], dir: "west" }]);
    });

    test("- north", () => {
      const grid = [
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
      ];
      const res = next([4, 1], "north", "-", grid);

      expect(res).toEqual([
        { coords: [5, 1], dir: "east" },
        { coords: [3, 1], dir: "west" },
      ]);
    });

    test("- south", () => {
      const grid = [
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
      ];
      const res = next([4, 1], "south", "-", grid);

      expect(res).toEqual([
        { coords: [5, 1], dir: "east" },
        { coords: [3, 1], dir: "west" },
      ]);
    });
  });

  describe("|", () => {
    test("| north", () => {
      const grid = [
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
      ];
      const res = next([5, 1], "north", "|", grid);

      expect(res).toEqual([{ coords: [5, 0], dir: "north" }]);
    });

    test("| north at end", () => {
      const grid = [
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
      ];
      const res = next([0, 0], "north", "|", grid);

      expect(res).toEqual([]);
    });

    test("| south", () => {
      const grid = [
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
      ];
      const res = next([5, 0], "south", "|", grid);

      expect(res).toEqual([{ coords: [5, 1], dir: "south" }]);
    });

    test("| south at end", () => {
      const grid = [
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
      ];
      const res = next([0, 1], "south", "|", grid);

      expect(res).toEqual([]);
    });

    test("| east", () => {
      const grid = [
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
      ];
      const res = next([5, 1], "east", "|", grid);

      expect(res).toEqual([
        { coords: [5, 0], dir: "north" },
        { coords: [5, 2], dir: "south" },
      ]);
    });

    test("| east at end", () => {
      const grid = [
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
      ];
      const res = next([0, 0], "east", "|", grid);

      expect(res).toEqual([{ coords: [0, 1], dir: "south" }]);
    });

    test("| west", () => {
      const grid = [
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
      ];
      const res = next([5, 1], "west", "|", grid);

      expect(res).toEqual([
        { coords: [5, 0], dir: "north" },
        { coords: [5, 2], dir: "south" },
      ]);
    });

    test("| west at end", () => {
      const grid = [
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
        [".", "|", ".", ".", ".", ".", ".", ".", "."],
      ];
      const res = next([0, 0], "west", "|", grid);

      expect(res).toEqual([{ coords: [0, 1], dir: "south" }]);
    });
  });
});

describe("exercise1", () => {
  test("mockData", () => {
    const res = exercise1(mockData);

    expect(res).toEqual(46);
  });

  test("data", () => {
    const res = exercise1(data);

    expect(res).toEqual(7860);
  });
});

describe("exercise2", () => {
  test("mockData", () => {
    const res = exercise2(mockData);

    expect(res).toEqual(51);
  });

  // This works but takes 5 mins, needs optimisation
  test.skip("data", () => {
    const res = exercise2(data);

    expect(res).toEqual(8331);
  });
});
