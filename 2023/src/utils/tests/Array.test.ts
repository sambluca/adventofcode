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
});
