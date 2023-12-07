import { ArrayUtils } from "../Array";

describe("Array Class", () => {
  describe("unique", () => {
    test("no removal", () => {
      const arr = new ArrayUtils([1, 2, 3, 4]);

      expect(arr.unique).toEqual(expect.arrayContaining([1, 2, 3, 4]));
    });

    test("one removal", () => {
      const arr = new ArrayUtils([1, 2, 3, 4, 4, 4]);

      expect(arr.unique).toEqual(expect.arrayContaining([1, 2, 3, 4]));
    });

    test("all removal", () => {
      const arr = new ArrayUtils([4, 4, 4, 4]);

      expect(arr.unique).toEqual(expect.arrayContaining([4]));
    });
  });

  describe("countValues", () => {
    test("1 count", () => {
      const arr = new ArrayUtils([1, 2, 3, 4]);

      expect(arr.countValues()).toEqual(
        expect.objectContaining({
          1: 1,
          2: 1,
          3: 1,
          4: 1,
        })
      );
    });

    test("2 count", () => {
      const arr = new ArrayUtils([1, 2, 2, 3, 2]);

      expect(arr.countValues()).toEqual(
        expect.objectContaining({
          1: 1,
          2: 3,
          3: 1,
        })
      );
    });

    test("wild card", () => {
      const arr = new ArrayUtils([1, 2, 2, 3, 2]);

      expect(arr.countValues({ wildCard: 1 })).toEqual(
        expect.objectContaining({
          2: 4,
          3: 2,
        })
      );
    });

    test("ignores types", () => {
      const arr = new ArrayUtils(["1", 1, "1", 1]);

      expect(arr.countValues()).toEqual(
        expect.objectContaining({
          1: 4,
        })
      );
    });
  });

  describe("mostCommon", () => {
    test("1 count", () => {
      const arr = new ArrayUtils([1, 2, 3, 4]);

      expect(arr.mostCommon).toEqual(["1", "2", "3", "4"]);
    });

    test("2 count", () => {
      const arr = new ArrayUtils([1, 2, 2, 3, 2]);

      expect(arr.mostCommon).toEqual(["2"]);
    });

    test("wild card", () => {
      const arr = new ArrayUtils([1, 2, 2, 3, 2, 3, 3]);

      expect(arr.mostCommon).toEqual(["2", "3"]);
    });
  });

  describe("contains", () => {
    test("true", () => {
      const arr = new ArrayUtils(["1", "3", "5", "J"]);

      expect(arr.contains("J")).toEqual(true);
    });

    test("false", () => {
      const arr = new ArrayUtils(["1", "3", "5", "A"]);

      expect(arr.contains("J")).toEqual(false);
    });
  });
});
