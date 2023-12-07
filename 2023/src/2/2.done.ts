import {
  convertGameToMax,
  exercise1,
  exercise2,
  checkIsPossible,
  getPower,
  convertToGames,
} from ".";
import { data } from "./data";

const mockData = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

describe("day2", () => {
  describe("convertGameToMax", () => {
    test("3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green", () => {
      const res = convertGameToMax(
        "3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"
      );

      expect(res).toEqual(
        expect.objectContaining({
          red: 4,
          green: 2,
          blue: 6,
        })
      );
    });

    test("1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue", () => {
      const res = convertGameToMax(
        "1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue"
      );

      expect(res).toEqual(
        expect.objectContaining({
          red: 1,
          green: 3,
          blue: 4,
        })
      );
    });

    test("8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red", () => {
      const res = convertGameToMax(
        "8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red"
      );

      expect(res).toEqual(
        expect.objectContaining({
          red: 20,
          green: 13,
          blue: 6,
        })
      );
    });
  });

  describe("checkIsPossible", () => {
    test("red: 1, blue: 3, green: 4", () => {
      const res = checkIsPossible({
        red: 1,
        blue: 3,
        green: 4,
      });

      expect(res).toEqual(true);
    });

    test("red: 13, blue: 3, green: 4", () => {
      const res = checkIsPossible({
        red: 13,
        blue: 3,
        green: 4,
      });

      expect(res).toEqual(false);
    });
    test("red: 1, blue: 14, green: 4", () => {
      const res = checkIsPossible({
        red: 1,
        blue: 15,
        green: 4,
      });

      expect(res).toEqual(false);
    });
    test("red: 1, blue: 1, green: 15", () => {
      const res = checkIsPossible({
        red: 1,
        blue: 3,
        green: 15,
      });

      expect(res).toEqual(false);
    });
  });

  describe("getPower", () => {
    test("3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green", () => {
      const bag = convertGameToMax(
        "3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"
      );
      const res = getPower(bag);
      expect(res).toEqual(48);
    });

    test("1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue", () => {
      const bag = convertGameToMax(
        "1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue"
      );
      const res = getPower(bag);
      expect(res).toEqual(12);
    });

    test("8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red", () => {
      const bag = convertGameToMax(
        "8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red"
      );
      const res = getPower(bag);
      expect(res).toEqual(1560);
    });
    test("1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red", () => {
      const bag = convertGameToMax(
        "1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red"
      );
      const res = getPower(bag);
      expect(res).toEqual(630);
    });
    test("6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green", () => {
      const bag = convertGameToMax(
        "6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"
      );
      const res = getPower(bag);
      expect(res).toEqual(36);
    });
  });

  describe("convertToGames", () => {
    test("convertToGames", () => {
      const res = convertToGames(mockData);

      expect(res).toEqual({
        "1": " 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
        "2": " 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
        "3": " 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
        "4": " 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
        "5": " 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
      });
    });
  });
  describe("exercise 1", () => {
    test("mockData", () => {
      const res = exercise1(mockData);

      expect(res).toBe(8);
    });
    test("real data", () => {
      const res = exercise1(data);

      expect(res).toBe(2256);
    });
  });

  describe("exercise 2", () => {
    test("mockData", () => {
      const res = exercise2(mockData);

      expect(res).toBe(2286);
    });

    test("data", () => {
      const res = exercise2(data);

      expect(res).toBe(74229);
    });
  });
});
