import { Arr } from "../Array";

describe("Array Class", () => {
  describe("unique", () => {
    test("no removal", () => {
      const arr = new Arr([1, 2, 3, 4]);

      expect(arr.unique).toEqual(expect.arrayContaining([1, 2, 3, 4]));
    });

    test("one removal", () => {
      const arr = new Arr([1, 2, 3, 4, 4, 4]);

      expect(arr.unique).toEqual(expect.arrayContaining([1, 2, 3, 4]));
    });

    test("all removal", () => {
      const arr = new Arr([4, 4, 4, 4]);

      expect(arr.unique).toEqual(expect.arrayContaining([4]));
    });
  });

  describe("getInstances", () => {
    test("1 count", () => {
      const arr = new Arr([1, 2, 3, 4]);

      expect(arr.getInstances()).toEqual(
        expect.objectContaining({
          1: 1,
          2: 1,
          3: 1,
          4: 1,
        })
      );
    });

    test("obj", () => {
      const arr = new Arr([{ 1: 2 }, { 1: 2 }, { 1: 4 }]);

      expect(arr.getInstances()).toEqual(
        expect.objectContaining({
          '{"1":2}': 2,
          '{"1":4}': 1,
        })
      );
    });

    test("arr", () => {
      const arr = new Arr([
        { 1: 2 },
        { 1: 2 },
        { 1: 4 },
        [1, 2, 3],
        [1, 2, 3],
        [1, 1],
        4,
      ]);

      expect(arr.getInstances()).toEqual(
        expect.objectContaining({
          '{"1":2}': 2,
          '{"1":4}': 1,
          "[1,2,3]": 2,
          "[1,1]": 1,
          4: 1,
        })
      );
    });

    test("2 count", () => {
      const arr = new Arr([1, 2, 2, 3, 2]);

      expect(arr.getInstances()).toEqual(
        expect.objectContaining({
          1: 1,
          2: 3,
          3: 1,
        })
      );
    });

    test("ignores types", () => {
      const arr = new Arr(["1", 1, "1", 1]);

      expect(arr.getInstances()).toEqual(
        expect.objectContaining({
          1: 4,
        })
      );
    });
  });

  describe("mostCommon", () => {
    test("1 count", () => {
      const arr = new Arr([1, 2, 3, 4]);

      expect(arr.mostCommon).toEqual(["1", "2", "3", "4"]);
    });

    test("2 count", () => {
      const arr = new Arr([1, 2, 2, 3, 2]);

      expect(arr.mostCommon).toEqual(["2"]);
    });

    test("wild card", () => {
      const arr = new Arr([1, 2, 2, 3, 2, 3, 3]);

      expect(arr.mostCommon).toEqual(["2", "3"]);
    });
  });

  describe("contains", () => {
    test("true", () => {
      const arr = new Arr(["1", "3", "5", "J"]);

      expect(arr.contains("J")).toEqual(true);
    });

    test("false", () => {
      const arr = new Arr(["1", "3", "5", "A"]);

      expect(arr.contains("J")).toEqual(false);
    });
  });

  describe("compare", () => {
    test("shallow compare", () => {
      const arr = new Arr(["1", "3", "5", "J"]);
      const arr2 = new Arr(["1", "4", "5", "6", "7"]);

      expect(arr.compare(arr2)).toEqual(["1", "5"]);
    });

    test("deep compare", () => {
      const arr = new Arr([{ 1: 2 }, { 2: 1 }, { 1: 3 }]);
      const arr2 = new Arr([{ 1: 2 }, { 4: 1 }, 1]);

      expect(arr.compare(arr2)).toEqual([{ 1: 2 }]);
    });
  });

  describe("shallowDiffs", () => {
    test("shallowDiffs", () => {
      const arr = new Arr(["1", "3", "5", "J"]);
      const arr2 = new Arr(["1", "4", "5", "6", "7"]);

      expect(arr.shallowDiffs(arr2)).toEqual(["4", "6", "7", "3", "J"]);
    });

    test("order matters", () => {
      const arr = new Arr(["#", ".", "#", "#", ".", ".", "#", "#", "."]);
      const arr2 = new Arr([".", ".", "#", ".", "#", "#", ".", "#", "."]);

      expect(arr.shallowDiffs(arr2, { orderMatters: true })).toEqual([
        "#",
        ".",
        "#",
        ".",
        ".",
        "#",
        ".",
        "#",
        "#",
        ".",
      ]);
    });
  });

  describe("map", () => {
    test("returns as Arr", () => {
      const arr = new Arr(["1", "3", "5", "J", "J"]);
      const res = arr.map((i) => (i = `-- ${i} --`));
      expect(res).toEqual([
        "-- 1 --",
        "-- 3 --",
        "-- 5 --",
        "-- J --",
        "-- J --",
      ]);

      expect(res.unique.length).toEqual(4);
      expect(res.unique).toEqual(
        expect.arrayContaining(["-- 1 --", "-- 3 --", "-- 5 --", "-- J --"])
      );
    });
  });

  describe("filter", () => {
    test("returns as Arr", () => {
      const arr = new Arr(["1", "3", "5", "J", "J"]);
      const res = arr.filter((i) => i === "J");
      expect(res).toEqual(["J", "J"]);

      expect(res.mostCommon).toEqual(["J"]);
    });
  });
  describe("flatten", () => {
    test("returns as Arr", () => {
      const arr = new Arr([[["1", ["3"]]], [["5", "J"], "J"]]);
      const res = arr.flat(Infinity);
      expect(res).toEqual(["1", "3", "5", "J", "J"]);

      expect(res.mostCommon).toEqual(["J"]);
    });
  });

  describe("gcd", () => {
    test("does not work if arr includes non number", () => {
      const arr = new Arr([1, 2, 3, "b"]);
      let err = "";
      try {
        arr.gcd;
      } catch (e) {
        err = e.message;
      }

      expect(err).toEqual("Can only find GCD if all values are numbers");
    });

    test("works", () => {
      const arr = new Arr([2, 4, 6, 8, 16]);
      expect(arr.gcd).toEqual(2);
    });
  });

  describe("lcm", () => {
    test("does not work if arr includes non number", () => {
      const arr = new Arr([1, 2, 3, "b"]);
      let err = "";
      try {
        arr.lcm;
      } catch (e) {
        err = e.message;
      }

      expect(err).toEqual("Can only find LCM if all values are numbers");
    });

    test("works", () => {
      const arr = new Arr([1, 2, 3, 4, 5]);
      expect(arr.lcm).toEqual(60);
    });
  });

  describe("transpose", () => {
    test("1,2,3 | 1,2,3 | 1,2,3", () => {
      const res = new Arr([
        ["ccc", "fff", "iii"],
        ["bbb", "eee", "hhh"],
        ["aaa", "ddd", "ggg"],
      ]);
      expect(res.transpose()).toEqual([
        ["ccc", "bbb", "aaa"],
        ["fff", "eee", "ddd"],
        ["iii", "hhh", "ggg"],
      ]);
    });

    test("data", () => {
      const res = new Arr([
        ["#", ".", ".", ".", "#", "#", ".", ".", "#"],
        ["#", ".", ".", ".", ".", "#", ".", ".", "#"],
        [".", ".", "#", "#", ".", ".", "#", "#", "#"],
        ["#", "#", "#", "#", "#", ".", "#", "#", "."],
        ["#", "#", "#", "#", "#", ".", "#", "#", "."],
        [".", ".", "#", "#", ".", ".", "#", "#", "#"],
        ["#", ".", ".", ".", ".", "#", ".", ".", "#"],
      ]).transpose();

      expect(res).toEqual([
        ["#", "#", ".", "#", "#", ".", "#"],
        [".", ".", ".", "#", "#", ".", "."],
        [".", ".", "#", "#", "#", "#", "."],
        [".", ".", "#", "#", "#", "#", "."],
        ["#", ".", ".", "#", "#", ".", "."],
        ["#", "#", ".", ".", ".", ".", "#"],
        [".", ".", "#", "#", "#", "#", "."],
        [".", ".", "#", "#", "#", "#", "."],
        ["#", "#", "#", ".", ".", "#", "#"],
      ]);
    });
  });

  describe("rotate", () => {
    test("clockwise", () => {
      const res = new Arr([
        ["ccc", "fff", "iii"],
        ["bbb", "eee", "hhh"],
        ["aaa", "ddd", "ggg"],
      ]);
      expect(res.rotate({ dir: "clockwise" })).toEqual([
        ["aaa", "bbb", "ccc"],
        ["ddd", "eee", "fff"],
        ["ggg", "hhh", "iii"],
      ]);
    });

    test("anticlockwise", () => {
      const res = new Arr([
        ["ccc", "fff", "iii"],
        ["bbb", "eee", "hhh"],
        ["aaa", "ddd", "ggg"],
      ]);
      expect(res.rotate({ dir: "anticlockwise" })).toEqual([
        ["iii", "hhh", "ggg"],
        ["fff", "eee", "ddd"],
        ["ccc", "bbb", "aaa"],
      ]);
    });
  });

  describe("equals", () => {
    test("does not equal", () => {
      const arr = new Arr(["1", "3", "5", "J"]);
      const arr2 = new Arr(["1", "4", "5", "6", "7"]);

      expect(arr.equals(arr2)).toEqual(false);
    });

    test("does equal", () => {
      const arr = new Arr(["1", "2", "3", "4"]);
      const arr2 = new Arr(["1", "2", "3", "4"]);

      expect(arr.equals(arr2)).toEqual(true);
    });

    test("equals", () => {
      const arr = new Arr(["#", ".", ".", ".", "#", "#", ".", ".", "#"]);
      const arr2 = new Arr(["#", ".", ".", ".", "#", "#", ".", ".", "#"]);

      expect(arr.equals(arr2)).toEqual(true);
    });

    test("does care about order", () => {
      const arr = new Arr(["1", "2", "4", "3"]);
      const arr2 = new Arr(["1", "2", "3", "4"]);

      expect(arr.equals(arr2)).toEqual(false);
    });
  });
});
