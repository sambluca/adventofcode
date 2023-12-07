import { exercise1, exercise2, parse, scoreHand, sortHands } from ".";
import { data } from "./data";

const mockData = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

const mockData2 = `32T3K 765
JJJJJ 2`;

describe("parse", () => {
  test("mockData", () => {
    expect(parse(mockData)).toEqual({
      "32T3K": 765,
      T55J5: 684,
      KK677: 28,
      KTJJT: 220,
      QQQJA: 483,
    });
  });
});
describe("sortHands", () => {
  test("mockData", () => {
    const res = sortHands([
      { hand: "32T3K", score: 21 },
      { hand: "KTJJT", score: 22 },
      { hand: "KK677", score: 22 },
      { hand: "T55J5", score: 31 },
      { hand: "QQQJA", score: 31 },
    ]);

    expect(res).toEqual(["QQQJA", "T55J5", "KK677", "KTJJT", "32T3K"]);
  });
});
describe("exercise 1", () => {
  test("mockData", () => {
    const res = exercise1(mockData);

    expect(res).toEqual(6440);
  });

  test.skip("data", () => {
    const res = exercise1(data);

    expect(res).toEqual(253954294);
  });
});

describe("exercise 2", () => {
  test("mockData", () => {
    const res = exercise2(mockData);

    expect(res).toEqual(5905);
  });

  test("mockData2", () => {
    const res = exercise2(mockData2);

    expect(res).toEqual(769);
  });

  test.skip("data", () => {
    const res = exercise2(data);

    expect(res).toEqual(254837398);
  });
});

describe("scoreHand", () => {
  describe("no joker", () => {
    test("one pair", () => {
      const res = scoreHand("32T3K");

      expect(res).toEqual(21);
    });

    test("two pair", () => {
      const res = scoreHand("KK677");

      expect(res).toEqual(22);
    });
    test("two pair", () => {
      const res = scoreHand("KTJJT");

      expect(res).toEqual(22);
    });
    test("three of a kind", () => {
      const res = scoreHand("T55J5");

      expect(res).toEqual(31);
    });
    test("three of a kind", () => {
      const res = scoreHand("QQQJA");

      expect(res).toEqual(31);
    });

    test("five of a kind", () => {
      const res = scoreHand("QQQQQ");

      expect(res).toEqual(50);
    });

    test("four of a kind", () => {
      const res = scoreHand("AA8AA");

      expect(res).toEqual(41);
    });

    test("full house", () => {
      const res = scoreHand("23332");

      expect(res).toEqual(32);
    });
    test("no match", () => {
      const res = scoreHand("12345");

      expect(res).toEqual(11);
    });
  });

  describe("joker", () => {
    test("one pair", () => {
      const res = scoreHand("32T3K", true);

      expect(res).toEqual(21);
    });

    test("two pair", () => {
      const res = scoreHand("KK677", true);

      expect(res).toEqual(22);
    });
    test("two pair with joker", () => {
      const res = scoreHand("KTJJT", true);

      expect(res).toEqual(41);
    });
    test("three of a kind with joker", () => {
      const res = scoreHand("T55J5", true);

      expect(res).toEqual(41);
    });
    test("three of a kind with jojer", () => {
      const res = scoreHand("QQQJA", true);

      expect(res).toEqual(41);
    });

    test("five of a kind", () => {
      const res = scoreHand("QQQQQ", true);

      expect(res).toEqual(50);
    });

    test("five of a joker", () => {
      const res = scoreHand("QQQQQ", true);

      expect(res).toEqual(50);
    });

    test("four of a kind", () => {
      const res = scoreHand("AA8AA", true);

      expect(res).toEqual(41);
    });

    test("full house", () => {
      const res = scoreHand("23332", true);

      expect(res).toEqual(32);
    });
    test("no match", () => {
      const res = scoreHand("12345", true);

      expect(res).toEqual(11);
    });
  });
});
