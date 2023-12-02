import { day1, getStringValueExercise1, getStringValueExercise2 } from ".";
import { testData1 } from "./data";

const data = `
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const data2 = `
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
luca
123451`;

const data3 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

describe("get string value", () => {
  describe("exercise 1", () => {
    test("twoDigits", () => {
      const twoDigits = getStringValueExercise1("1abc2");

      expect(twoDigits).toEqual(12);
    });
    test("pqr3stu8vwx", () => {
      const pqr3stu8vwx = getStringValueExercise1("pqoner3stu8vwx");

      expect(pqr3stu8vwx).toEqual(38);
    });
    test("moreThanTwoDigits", () => {
      const moreThanTwoDigits = getStringValueExercise1("a1b2c3d4e5f");

      expect(moreThanTwoDigits).toEqual(15);
    });
    test("oneDigit", () => {
      const oneDigit = getStringValueExercise1("treb7uchet");
      expect(oneDigit).toEqual(77);
    });

    test("noDigit", () => {
      const oneDigit = getStringValueExercise1("xxxx");
      expect(oneDigit).toEqual(NaN);
    });
  });

  describe("exercise 2", () => {
    test("twoDigits", () => {
      const twoDigits = getStringValueExercise2("1abc2");

      expect(twoDigits).toEqual(12);
    });
    test("pqr3stu8vwx", () => {
      const pqr3stu8vwx = getStringValueExercise2("pqr3stu8vwx");

      expect(pqr3stu8vwx).toEqual(38);
    });
    test("moreThanTwoDigits", () => {
      const moreThanTwoDigits = getStringValueExercise2("a1b2c3d4e5f");

      expect(moreThanTwoDigits).toEqual(15);
    });
    test("oneDigit", () => {
      const oneDigit = getStringValueExercise2("treb7uchet");
      expect(oneDigit).toEqual(77);
    });

    test("noDigit", () => {
      const oneDigit = getStringValueExercise2("xxxx");
      expect(oneDigit).toEqual(NaN);
    });

    describe("string digits", () => {
      test("two1nine", () => {
        const res = getStringValueExercise2("two1nine");

        expect(res).toEqual(29);
      });
      test("eightwothree", () => {
        const res = getStringValueExercise2("eightwothree");

        expect(res).toEqual(83);
      });

      test("abcone2threexyz", () => {
        const res = getStringValueExercise2("abcone2threexyz");

        expect(res).toEqual(13);
      });

      test("xtwone3four", () => {
        const res = getStringValueExercise2("xtwone3four");

        expect(res).toEqual(24);
      });

      test("4nineeightseven2", () => {
        const res = getStringValueExercise2("4nineeightseven2");

        expect(res).toEqual(42);
      });

      test("zoneight234", () => {
        const res = getStringValueExercise2("zoneight234");

        expect(res).toEqual(14);
      });

      test("7pqrstsixteen", () => {
        const res = getStringValueExercise2("7pqrstsixteen");

        expect(res).toEqual(76);
      });

      test("eighthree", () => {
        const res = getStringValueExercise2("eighthree");

        expect(res).toEqual(83);
      });
    });
  });
});

describe("day1", () => {
  describe("excercise one", () => {
    test("mock data", () => {
      const res = day1(data);

      expect(res).toEqual(142);
    });

    test("mock data2", () => {
      const res = day1(data2);

      expect(res).toEqual(153);
    });

    test("real data", () => {
      const res = day1(testData1);

      expect(res).toBe(54667);
    });
  });

  describe("exercise two", () => {
    test("mock data", () => {
      const res = day1(data3, true);

      expect(res).toBe(281);
    });

    test("real data", () => {
      const res = day1(testData1, true);

      expect(res).toBe(54203);
    });
  });
});
