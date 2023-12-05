import {
  exercise1,
  getRange,
  getMaps,
  getSeeds,
  splitLine,
  getSoilNumberFromSeeds,
  goThroughSteps,
  exercise2,
  getSeedsRanges,
  getSeedRangeValues,
  getAllSeedRangeValues,
} from ".";
import { data } from "./data";

const mockData = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

describe("getSeeds", () => {
  test("mockData", () => {
    const res = getSeeds("seeds: 79 14 55 13");

    expect(res).toEqual([79, 14, 55, 13]);
  });
});

describe("getSeedsRanges", () => {
  test("mockData", () => {
    const res = getSeedsRanges([79, 14, 55, 13]);

    expect(res).toEqual([
      {
        rangeStart: 79,
        rangeEnd: 92,
      },
      {
        rangeStart: 55,
        rangeEnd: 67,
      },
    ]);
  });
});

describe("getSeedRangeValues", () => {
  test("{ rangeStart: 79, rangeEnd:81 }", () => {
    const res = getSeedRangeValues({ rangeStart: 79, rangeEnd: 81 });

    expect(res).toEqual([79, 80, 81]);
  });
  test("{ rangeStart: 55, rangeEnd: 67 }", () => {
    const res = getSeedRangeValues({ rangeStart: 55, rangeEnd: 67 });

    expect(res).toEqual([55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67]);
  });
});

describe("getAllSeedRangeValues", () => {
  test("79 14 55 13", () => {
    const res = getAllSeedRangeValues([
      { rangeStart: 79, rangeEnd: 81 },
      { rangeStart: 55, rangeEnd: 67 },
    ]);

    expect(res).toEqual([
      79, 80, 81, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67,
    ]);
  });

  test("removes duplicates", () => {
    const res = getAllSeedRangeValues([
      { rangeStart: 79, rangeEnd: 81 },
      { rangeStart: 78, rangeEnd: 83 },
    ]);

    expect(res).toEqual([79, 80, 81, 78, 82, 83]);
  });
});
describe("getMaps", () => {
  test("maps", () => {
    const [seed, ...rest] = mockData
      .trim()
      .split(/\n/g)
      .filter((i) => i !== "");

    const res = getMaps(rest);

    expect(res).toEqual({
      "seed-to-soil map:": [
        { rangeStart: 98, rangeEnd: 99, rangeOffsetStart: 50 },
        { rangeStart: 50, rangeEnd: 97, rangeOffsetStart: 52 },
      ],
      "soil-to-fertilizer map:": [
        { rangeStart: 15, rangeEnd: 51, rangeOffsetStart: 0 },
        { rangeStart: 52, rangeEnd: 53, rangeOffsetStart: 37 },
        { rangeStart: 0, rangeEnd: 14, rangeOffsetStart: 39 },
      ],
      "fertilizer-to-water map:": [
        { rangeStart: 53, rangeEnd: 60, rangeOffsetStart: 49 },
        { rangeStart: 11, rangeEnd: 52, rangeOffsetStart: 0 },
        { rangeStart: 0, rangeEnd: 6, rangeOffsetStart: 42 },
        { rangeStart: 7, rangeEnd: 10, rangeOffsetStart: 57 },
      ],
      "water-to-light map:": [
        { rangeStart: 18, rangeEnd: 24, rangeOffsetStart: 88 },
        { rangeStart: 25, rangeEnd: 94, rangeOffsetStart: 18 },
      ],
      "light-to-temperature map:": [
        { rangeStart: 77, rangeEnd: 99, rangeOffsetStart: 45 },
        { rangeStart: 45, rangeEnd: 63, rangeOffsetStart: 81 },
        { rangeStart: 64, rangeEnd: 76, rangeOffsetStart: 68 },
      ],
      "temperature-to-humidity map:": [
        { rangeStart: 69, rangeEnd: 69, rangeOffsetStart: 0 },
        { rangeStart: 0, rangeEnd: 68, rangeOffsetStart: 1 },
      ],
      "humidity-to-location map:": [
        { rangeStart: 56, rangeEnd: 92, rangeOffsetStart: 60 },
        { rangeStart: 93, rangeEnd: 96, rangeOffsetStart: 56 },
      ],
    });
  });
});

describe("getRange", () => {
  test("50 98 2", () => {
    const res = getRange("50 98 2");

    expect(res).toEqual(
      expect.objectContaining({
        rangeStart: 98,
        rangeEnd: 99,
        rangeOffsetStart: 50,
      })
    );
  });

  test("52 50 48", () => {
    const res = getRange("52 50 48");

    expect(res).toEqual(
      expect.objectContaining({
        rangeStart: 50,
        rangeEnd: 97,
        rangeOffsetStart: 52,
      })
    );
  });
});

describe("splitLine", () => {
  test("50 98 2", () => {
    const res = splitLine("50 98 2");

    expect(res).toEqual(
      expect.objectContaining({
        startingNumber: 50,
        rangeLength: 2,
        rangeStart: 98,
      })
    );
  });
});

describe("getSoilNumberFromSeed", () => {
  test("79", () => {
    const res = getSoilNumberFromSeeds(79, [
      {
        rangeStart: 98,
        rangeEnd: 99,
        rangeOffsetStart: 50,
      },
      {
        rangeStart: 50,
        rangeEnd: 97,
        rangeOffsetStart: 52,
      },
    ]);

    expect(res).toEqual(81);
  });

  test("14", () => {
    const res = getSoilNumberFromSeeds(14, [
      {
        rangeStart: 98,
        rangeEnd: 99,
        rangeOffsetStart: 50,
      },
      {
        rangeStart: 50,
        rangeEnd: 97,
        rangeOffsetStart: 52,
      },
    ]);

    expect(res).toEqual(14);
  });

  test("55", () => {
    const res = getSoilNumberFromSeeds(55, [
      {
        rangeStart: 98,
        rangeEnd: 99,
        rangeOffsetStart: 50,
      },
      {
        rangeStart: 50,
        rangeEnd: 97,
        rangeOffsetStart: 52,
      },
    ]);

    expect(res).toEqual(57);
  });

  test("13", () => {
    const res = getSoilNumberFromSeeds(13, [
      {
        rangeStart: 98,
        rangeEnd: 99,
        rangeOffsetStart: 50,
      },
      {
        rangeStart: 50,
        rangeEnd: 97,
        rangeOffsetStart: 52,
      },
    ]);

    expect(res).toEqual(13);
  });

  test("98", () => {
    const res = getSoilNumberFromSeeds(98, [
      {
        rangeStart: 98,
        rangeEnd: 99,
        rangeOffsetStart: 50,
      },
      {
        rangeStart: 50,
        rangeEnd: 97,
        rangeOffsetStart: 52,
      },
    ]);

    expect(res).toEqual(50);
  });

  test("soil to fertiliser", () => {
    const res = getSoilNumberFromSeeds(81, [
      { rangeStart: 15, rangeEnd: 51, rangeOffsetStart: 0 },
      { rangeStart: 52, rangeEnd: 53, rangeOffsetStart: 37 },
      { rangeStart: 0, rangeEnd: 14, rangeOffsetStart: 39 },
    ]);

    expect(res).toEqual(81);
  });

  test("fertiliser to water", () => {
    const res = getSoilNumberFromSeeds(81, [
      { rangeStart: 53, rangeEnd: 60, rangeOffsetStart: 49 },
      { rangeStart: 11, rangeEnd: 52, rangeOffsetStart: 0 },
      { rangeStart: 0, rangeEnd: 6, rangeOffsetStart: 42 },
      { rangeStart: 7, rangeEnd: 10, rangeOffsetStart: 57 },
    ]);

    expect(res).toEqual(81);
  });

  test("water to light", () => {
    const res = getSoilNumberFromSeeds(81, [
      { rangeStart: 18, rangeEnd: 24, rangeOffsetStart: 88 },
      { rangeStart: 25, rangeEnd: 94, rangeOffsetStart: 18 },
    ]);

    expect(res).toEqual(74);
  });

  test("49", () => {
    const res = getSoilNumberFromSeeds(49, [
      { rangeStart: 18, rangeEnd: 24, rangeOffsetStart: 88 },
      { rangeStart: 25, rangeEnd: 94, rangeOffsetStart: 18 },
    ]);

    expect(res).toEqual(42);
  });

  test("light to temperature", () => {
    const res = getSoilNumberFromSeeds(74, [
      { rangeStart: 77, rangeEnd: 99, rangeOffsetStart: 45 },
      { rangeStart: 45, rangeEnd: 63, rangeOffsetStart: 81 },
      { rangeStart: 64, rangeEnd: 76, rangeOffsetStart: 68 },
    ]);

    expect(res).toEqual(78);
  });

  test("temp to humidity", () => {
    const res = getSoilNumberFromSeeds(78, [
      { rangeStart: 69, rangeEnd: 69, rangeOffsetStart: 0 },
      { rangeStart: 0, rangeEnd: 68, rangeOffsetStart: 1 },
    ]);

    expect(res).toEqual(78);
  });

  test("humid to map", () => {
    const res = getSoilNumberFromSeeds(78, [
      { rangeStart: 56, rangeEnd: 92, rangeOffsetStart: 60 },
      { rangeStart: 93, rangeEnd: 96, rangeOffsetStart: 56 },
    ]);

    expect(res).toEqual(82);
  });
});

describe("exercise 1", () => {
  test("mockData", () => {
    const res = exercise1(mockData);

    expect(res).toEqual(35);
  });

  test.skip("data", () => {
    const res = exercise1(data);

    expect(res).toEqual(227653707);
  });
});

describe("exercise 2", () => {
  test("mockData", () => {
    const res = exercise2(mockData);

    expect(res).toEqual(46);
  });

  test.skip("data", () => {
    const res = exercise2(data);

    expect(res).toEqual(78775051);
  });
});

describe("goThroughSteps", () => {
  test("79", () => {
    const res = goThroughSteps(
      79,
      [
        "seed-to-soil map:",
        "soil-to-fertilizer map:",
        "fertilizer-to-water map:",
        "water-to-light map:",
        "light-to-temperature map:",
        "temperature-to-humidity map:",
        "humidity-to-location map:",
      ],
      {
        "seed-to-soil map:": [
          { rangeStart: 98, rangeEnd: 99, rangeOffsetStart: 50 },
          { rangeStart: 50, rangeEnd: 97, rangeOffsetStart: 52 },
        ],
        "soil-to-fertilizer map:": [
          { rangeStart: 15, rangeEnd: 51, rangeOffsetStart: 0 },
          { rangeStart: 52, rangeEnd: 53, rangeOffsetStart: 37 },
          { rangeStart: 0, rangeEnd: 14, rangeOffsetStart: 39 },
        ],
        "fertilizer-to-water map:": [
          { rangeStart: 53, rangeEnd: 60, rangeOffsetStart: 49 },
          { rangeStart: 11, rangeEnd: 52, rangeOffsetStart: 0 },
          { rangeStart: 0, rangeEnd: 6, rangeOffsetStart: 42 },
          { rangeStart: 7, rangeEnd: 10, rangeOffsetStart: 57 },
        ],
        "water-to-light map:": [
          { rangeStart: 18, rangeEnd: 24, rangeOffsetStart: 88 },
          { rangeStart: 25, rangeEnd: 94, rangeOffsetStart: 18 },
        ],
        "light-to-temperature map:": [
          { rangeStart: 77, rangeEnd: 99, rangeOffsetStart: 45 },
          { rangeStart: 45, rangeEnd: 63, rangeOffsetStart: 81 },
          { rangeStart: 64, rangeEnd: 76, rangeOffsetStart: 68 },
        ],
        "temperature-to-humidity map:": [
          { rangeStart: 69, rangeEnd: 69, rangeOffsetStart: 0 },
          { rangeStart: 0, rangeEnd: 68, rangeOffsetStart: 1 },
        ],
        "humidity-to-location map:": [
          { rangeStart: 56, rangeEnd: 92, rangeOffsetStart: 60 },
          { rangeStart: 93, rangeEnd: 96, rangeOffsetStart: 56 },
        ],
      }
    );

    expect(res).toEqual(82);
  });

  test("14", () => {
    const res = goThroughSteps(
      14,
      [
        "seed-to-soil map:",
        "soil-to-fertilizer map:",
        "fertilizer-to-water map:",
        "water-to-light map:",
        "light-to-temperature map:",
        "temperature-to-humidity map:",
        "humidity-to-location map:",
      ],
      {
        "seed-to-soil map:": [
          { rangeStart: 98, rangeEnd: 99, rangeOffsetStart: 50 },
          { rangeStart: 50, rangeEnd: 97, rangeOffsetStart: 52 },
        ],
        "soil-to-fertilizer map:": [
          { rangeStart: 15, rangeEnd: 51, rangeOffsetStart: 0 },
          { rangeStart: 52, rangeEnd: 53, rangeOffsetStart: 37 },
          { rangeStart: 0, rangeEnd: 14, rangeOffsetStart: 39 },
        ],
        "fertilizer-to-water map:": [
          { rangeStart: 53, rangeEnd: 60, rangeOffsetStart: 49 },
          { rangeStart: 11, rangeEnd: 52, rangeOffsetStart: 0 },
          { rangeStart: 0, rangeEnd: 6, rangeOffsetStart: 42 },
          { rangeStart: 7, rangeEnd: 10, rangeOffsetStart: 57 },
        ],
        "water-to-light map:": [
          { rangeStart: 18, rangeEnd: 24, rangeOffsetStart: 88 },
          { rangeStart: 25, rangeEnd: 94, rangeOffsetStart: 18 },
        ],
        "light-to-temperature map:": [
          { rangeStart: 77, rangeEnd: 99, rangeOffsetStart: 45 },
          { rangeStart: 45, rangeEnd: 63, rangeOffsetStart: 81 },
          { rangeStart: 64, rangeEnd: 76, rangeOffsetStart: 68 },
        ],
        "temperature-to-humidity map:": [
          { rangeStart: 69, rangeEnd: 69, rangeOffsetStart: 0 },
          { rangeStart: 0, rangeEnd: 68, rangeOffsetStart: 1 },
        ],
        "humidity-to-location map:": [
          { rangeStart: 56, rangeEnd: 92, rangeOffsetStart: 60 },
          { rangeStart: 93, rangeEnd: 96, rangeOffsetStart: 56 },
        ],
      }
    );

    expect(res).toEqual(43);
  });

  test("55", () => {
    const res = goThroughSteps(
      55,
      [
        "seed-to-soil map:",
        "soil-to-fertilizer map:",
        "fertilizer-to-water map:",
        "water-to-light map:",
        "light-to-temperature map:",
        "temperature-to-humidity map:",
        "humidity-to-location map:",
      ],
      {
        "seed-to-soil map:": [
          { rangeStart: 98, rangeEnd: 99, rangeOffsetStart: 50 },
          { rangeStart: 50, rangeEnd: 97, rangeOffsetStart: 52 },
        ],
        "soil-to-fertilizer map:": [
          { rangeStart: 15, rangeEnd: 51, rangeOffsetStart: 0 },
          { rangeStart: 52, rangeEnd: 53, rangeOffsetStart: 37 },
          { rangeStart: 0, rangeEnd: 14, rangeOffsetStart: 39 },
        ],
        "fertilizer-to-water map:": [
          { rangeStart: 53, rangeEnd: 60, rangeOffsetStart: 49 },
          { rangeStart: 11, rangeEnd: 52, rangeOffsetStart: 0 },
          { rangeStart: 0, rangeEnd: 6, rangeOffsetStart: 42 },
          { rangeStart: 7, rangeEnd: 10, rangeOffsetStart: 57 },
        ],
        "water-to-light map:": [
          { rangeStart: 18, rangeEnd: 24, rangeOffsetStart: 88 },
          { rangeStart: 25, rangeEnd: 94, rangeOffsetStart: 18 },
        ],
        "light-to-temperature map:": [
          { rangeStart: 77, rangeEnd: 99, rangeOffsetStart: 45 },
          { rangeStart: 45, rangeEnd: 63, rangeOffsetStart: 81 },
          { rangeStart: 64, rangeEnd: 76, rangeOffsetStart: 68 },
        ],
        "temperature-to-humidity map:": [
          { rangeStart: 69, rangeEnd: 69, rangeOffsetStart: 0 },
          { rangeStart: 0, rangeEnd: 68, rangeOffsetStart: 1 },
        ],
        "humidity-to-location map:": [
          { rangeStart: 56, rangeEnd: 92, rangeOffsetStart: 60 },
          { rangeStart: 93, rangeEnd: 96, rangeOffsetStart: 56 },
        ],
      }
    );

    expect(res).toEqual(86);
  });

  test("13", () => {
    const res = goThroughSteps(
      13,
      [
        "seed-to-soil map:",
        "soil-to-fertilizer map:",
        "fertilizer-to-water map:",
        "water-to-light map:",
        "light-to-temperature map:",
        "temperature-to-humidity map:",
        "humidity-to-location map:",
      ],
      {
        "seed-to-soil map:": [
          { rangeStart: 98, rangeEnd: 99, rangeOffsetStart: 50 },
          { rangeStart: 50, rangeEnd: 97, rangeOffsetStart: 52 },
        ],
        "soil-to-fertilizer map:": [
          { rangeStart: 15, rangeEnd: 51, rangeOffsetStart: 0 },
          { rangeStart: 52, rangeEnd: 53, rangeOffsetStart: 37 },
          { rangeStart: 0, rangeEnd: 14, rangeOffsetStart: 39 },
        ],
        "fertilizer-to-water map:": [
          { rangeStart: 53, rangeEnd: 60, rangeOffsetStart: 49 },
          { rangeStart: 11, rangeEnd: 52, rangeOffsetStart: 0 },
          { rangeStart: 0, rangeEnd: 6, rangeOffsetStart: 42 },
          { rangeStart: 7, rangeEnd: 10, rangeOffsetStart: 57 },
        ],
        "water-to-light map:": [
          { rangeStart: 18, rangeEnd: 24, rangeOffsetStart: 88 },
          { rangeStart: 25, rangeEnd: 94, rangeOffsetStart: 18 },
        ],
        "light-to-temperature map:": [
          { rangeStart: 77, rangeEnd: 99, rangeOffsetStart: 45 },
          { rangeStart: 45, rangeEnd: 63, rangeOffsetStart: 81 },
          { rangeStart: 64, rangeEnd: 76, rangeOffsetStart: 68 },
        ],
        "temperature-to-humidity map:": [
          { rangeStart: 69, rangeEnd: 69, rangeOffsetStart: 0 },
          { rangeStart: 0, rangeEnd: 68, rangeOffsetStart: 1 },
        ],
        "humidity-to-location map:": [
          { rangeStart: 56, rangeEnd: 92, rangeOffsetStart: 60 },
          { rangeStart: 93, rangeEnd: 96, rangeOffsetStart: 56 },
        ],
      }
    );

    expect(res).toEqual(35);
  });
});
