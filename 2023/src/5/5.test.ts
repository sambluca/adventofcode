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
        start: 79,
        end: 92,
      },
      {
        start: 55,
        end: 67,
      },
    ]);
  });
});

describe("getSeedRangeValues", () => {
  test("{ start: 79, end:81 }", () => {
    const res = getSeedRangeValues({ start: 79, end: 81 });

    expect(res).toEqual([79, 80, 81]);
  });
  test("{ start: 55, end: 67 }", () => {
    const res = getSeedRangeValues({ start: 55, end: 67 });

    expect(res).toEqual([55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67]);
  });
});

describe("getAllSeedRangeValues", () => {
  test("79 14 55 13", () => {
    const res = getAllSeedRangeValues([
      { start: 79, end: 81 },
      { start: 55, end: 67 },
    ]);

    expect(res).toEqual([
      79, 80, 81, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67,
    ]);
  });

  test("removes duplicates", () => {
    const res = getAllSeedRangeValues([
      { start: 79, end: 81 },
      { start: 78, end: 83 },
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
        { start: 98, end: 99, offset: 50 },
        { start: 50, end: 97, offset: 52 },
      ],
      "soil-to-fertilizer map:": [
        { start: 15, end: 51, offset: 0 },
        { start: 52, end: 53, offset: 37 },
        { start: 0, end: 14, offset: 39 },
      ],
      "fertilizer-to-water map:": [
        { start: 53, end: 60, offset: 49 },
        { start: 11, end: 52, offset: 0 },
        { start: 0, end: 6, offset: 42 },
        { start: 7, end: 10, offset: 57 },
      ],
      "water-to-light map:": [
        { start: 18, end: 24, offset: 88 },
        { start: 25, end: 94, offset: 18 },
      ],
      "light-to-temperature map:": [
        { start: 77, end: 99, offset: 45 },
        { start: 45, end: 63, offset: 81 },
        { start: 64, end: 76, offset: 68 },
      ],
      "temperature-to-humidity map:": [
        { start: 69, end: 69, offset: 0 },
        { start: 0, end: 68, offset: 1 },
      ],
      "humidity-to-location map:": [
        { start: 56, end: 92, offset: 60 },
        { start: 93, end: 96, offset: 56 },
      ],
    });
  });
});

describe("getRange", () => {
  test("50 98 2", () => {
    const res = getRange("50 98 2");

    expect(res).toEqual(
      expect.objectContaining({
        start: 98,
        end: 99,
        offset: 50,
      })
    );
  });

  test("52 50 48", () => {
    const res = getRange("52 50 48");

    expect(res).toEqual(
      expect.objectContaining({
        start: 50,
        end: 97,
        offset: 52,
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
        start: 98,
      })
    );
  });
});

describe("getSoilNumberFromSeed", () => {
  test.only("52", () => {
    const res = getSoilNumberFromSeeds(52, [
      { start: 53, end: 60, offset: 49 },
      { start: 11, end: 52, offset: 0 },
      { start: 0, end: 6, offset: 42 },
      { start: 7, end: 10, offset: 57 },
    ]);
    expect(res).toEqual(41);
  });
  test("79", () => {
    const res = getSoilNumberFromSeeds(79, [
      {
        start: 98,
        end: 99,
        offset: 50,
      },
      {
        start: 50,
        end: 97,
        offset: 52,
      },
    ]);

    expect(res).toEqual(81);
  });

  test("14", () => {
    const res = getSoilNumberFromSeeds(14, [
      {
        start: 98,
        end: 99,
        offset: 50,
      },
      {
        start: 50,
        end: 97,
        offset: 52,
      },
    ]);

    expect(res).toEqual(14);
  });

  test("55", () => {
    const res = getSoilNumberFromSeeds(55, [
      {
        start: 98,
        end: 99,
        offset: 50,
      },
      {
        start: 50,
        end: 97,
        offset: 52,
      },
    ]);

    expect(res).toEqual(57);
  });

  test("13", () => {
    const res = getSoilNumberFromSeeds(13, [
      {
        start: 98,
        end: 99,
        offset: 50,
      },
      {
        start: 50,
        end: 97,
        offset: 52,
      },
    ]);

    expect(res).toEqual(13);
  });

  test("98", () => {
    const res = getSoilNumberFromSeeds(98, [
      {
        start: 98,
        end: 99,
        offset: 50,
      },
      {
        start: 50,
        end: 97,
        offset: 52,
      },
    ]);

    expect(res).toEqual(50);
  });

  test("69", () => {
    const res = getSoilNumberFromSeeds(69, [
      { start: 69, end: 69, offset: 0 },
      { start: 0, end: 68, offset: 1 },
    ]);

    expect(res).toEqual(69);
  });

  test("soil to fertiliser", () => {
    const res = getSoilNumberFromSeeds(81, [
      { start: 15, end: 51, offset: 0 },
      { start: 52, end: 53, offset: 37 },
      { start: 0, end: 14, offset: 39 },
    ]);

    expect(res).toEqual(81);
  });

  test("fertiliser to water", () => {
    const res = getSoilNumberFromSeeds(81, [
      { start: 53, end: 60, offset: 49 },
      { start: 11, end: 52, offset: 0 },
      { start: 0, end: 6, offset: 42 },
      { start: 7, end: 10, offset: 57 },
    ]);

    expect(res).toEqual(81);
  });

  test("water to light", () => {
    const res = getSoilNumberFromSeeds(81, [
      { start: 18, end: 24, offset: 88 },
      { start: 25, end: 94, offset: 18 },
    ]);

    expect(res).toEqual(74);
  });

  test("49", () => {
    const res = getSoilNumberFromSeeds(49, [
      { start: 18, end: 24, offset: 88 },
      { start: 25, end: 94, offset: 18 },
    ]);

    expect(res).toEqual(42);
  });

  test("light to temperature", () => {
    const res = getSoilNumberFromSeeds(74, [
      { start: 77, end: 99, offset: 45 },
      { start: 45, end: 63, offset: 81 },
      { start: 64, end: 76, offset: 68 },
    ]);

    expect(res).toEqual(78);
  });

  test("temp to humidity", () => {
    const res = getSoilNumberFromSeeds(78, [
      { start: 69, end: 69, offset: 0 },
      { start: 0, end: 68, offset: 1 },
    ]);

    expect(res).toEqual(78);
  });

  test("humid to map", () => {
    const res = getSoilNumberFromSeeds(78, [
      { start: 56, end: 92, offset: 60 },
      { start: 93, end: 96, offset: 56 },
    ]);

    expect(res).toEqual(82);
  });
});

describe("exercise 1", () => {
  test.only("mockData", () => {
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
          { start: 98, end: 99, offset: 50 },
          { start: 50, end: 97, offset: 52 },
        ],
        "soil-to-fertilizer map:": [
          { start: 15, end: 51, offset: 0 },
          { start: 52, end: 53, offset: 37 },
          { start: 0, end: 14, offset: 39 },
        ],
        "fertilizer-to-water map:": [
          { start: 53, end: 60, offset: 49 },
          { start: 11, end: 52, offset: 0 },
          { start: 0, end: 6, offset: 42 },
          { start: 7, end: 10, offset: 57 },
        ],
        "water-to-light map:": [
          { start: 18, end: 24, offset: 88 },
          { start: 25, end: 94, offset: 18 },
        ],
        "light-to-temperature map:": [
          { start: 77, end: 99, offset: 45 },
          { start: 45, end: 63, offset: 81 },
          { start: 64, end: 76, offset: 68 },
        ],
        "temperature-to-humidity map:": [
          { start: 69, end: 69, offset: 0 },
          { start: 0, end: 68, offset: 1 },
        ],
        "humidity-to-location map:": [
          { start: 56, end: 92, offset: 60 },
          { start: 93, end: 96, offset: 56 },
        ],
      }
    );

    expect(res).toEqual(82);
  });

  test("70", () => {
    const res = goThroughSteps(
      70,
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
          { start: 98, end: 99, offset: 50 },
          { start: 50, end: 97, offset: 52 },
        ],
        "soil-to-fertilizer map:": [
          { start: 15, end: 51, offset: 0 },
          { start: 52, end: 53, offset: 37 },
          { start: 0, end: 14, offset: 39 },
        ],
        "fertilizer-to-water map:": [
          { start: 53, end: 60, offset: 49 },
          { start: 11, end: 52, offset: 0 },
          { start: 0, end: 6, offset: 42 },
          { start: 7, end: 10, offset: 57 },
        ],
        "water-to-light map:": [
          { start: 18, end: 24, offset: 88 },
          { start: 25, end: 94, offset: 18 },
        ],
        "light-to-temperature map:": [
          { start: 77, end: 99, offset: 45 },
          { start: 45, end: 63, offset: 81 },
          { start: 64, end: 76, offset: 68 },
        ],
        "temperature-to-humidity map:": [
          { start: 69, end: 69, offset: 0 },
          { start: 0, end: 68, offset: 1 },
        ],
        "humidity-to-location map:": [
          { start: 56, end: 92, offset: 60 },
          { start: 93, end: 96, offset: 56 },
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
          { start: 98, end: 99, offset: 50 },
          { start: 50, end: 97, offset: 52 },
        ],
        "soil-to-fertilizer map:": [
          { start: 15, end: 51, offset: 0 },
          { start: 52, end: 53, offset: 37 },
          { start: 0, end: 14, offset: 39 },
        ],
        "fertilizer-to-water map:": [
          { start: 53, end: 60, offset: 49 },
          { start: 11, end: 52, offset: 0 },
          { start: 0, end: 6, offset: 42 },
          { start: 7, end: 10, offset: 57 },
        ],
        "water-to-light map:": [
          { start: 18, end: 24, offset: 88 },
          { start: 25, end: 94, offset: 18 },
        ],
        "light-to-temperature map:": [
          { start: 77, end: 99, offset: 45 },
          { start: 45, end: 63, offset: 81 },
          { start: 64, end: 76, offset: 68 },
        ],
        "temperature-to-humidity map:": [
          { start: 69, end: 69, offset: 0 },
          { start: 0, end: 68, offset: 1 },
        ],
        "humidity-to-location map:": [
          { start: 56, end: 92, offset: 60 },
          { start: 93, end: 96, offset: 56 },
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
          { start: 98, end: 99, offset: 50 },
          { start: 50, end: 97, offset: 52 },
        ],
        "soil-to-fertilizer map:": [
          { start: 15, end: 51, offset: 0 },
          { start: 52, end: 53, offset: 37 },
          { start: 0, end: 14, offset: 39 },
        ],
        "fertilizer-to-water map:": [
          { start: 53, end: 60, offset: 49 },
          { start: 11, end: 52, offset: 0 },
          { start: 0, end: 6, offset: 42 },
          { start: 7, end: 10, offset: 57 },
        ],
        "water-to-light map:": [
          { start: 18, end: 24, offset: 88 },
          { start: 25, end: 94, offset: 18 },
        ],
        "light-to-temperature map:": [
          { start: 77, end: 99, offset: 45 },
          { start: 45, end: 63, offset: 81 },
          { start: 64, end: 76, offset: 68 },
        ],
        "temperature-to-humidity map:": [
          { start: 69, end: 69, offset: 0 },
          { start: 0, end: 68, offset: 1 },
        ],
        "humidity-to-location map:": [
          { start: 56, end: 92, offset: 60 },
          { start: 93, end: 96, offset: 56 },
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
          { start: 98, end: 99, offset: 50 },
          { start: 50, end: 97, offset: 52 },
        ],
        "soil-to-fertilizer map:": [
          { start: 15, end: 51, offset: 0 },
          { start: 52, end: 53, offset: 37 },
          { start: 0, end: 14, offset: 39 },
        ],
        "fertilizer-to-water map:": [
          { start: 53, end: 60, offset: 49 },
          { start: 11, end: 52, offset: 0 },
          { start: 0, end: 6, offset: 42 },
          { start: 7, end: 10, offset: 57 },
        ],
        "water-to-light map:": [
          { start: 18, end: 24, offset: 88 },
          { start: 25, end: 94, offset: 18 },
        ],
        "light-to-temperature map:": [
          { start: 77, end: 99, offset: 45 },
          { start: 45, end: 63, offset: 81 },
          { start: 64, end: 76, offset: 68 },
        ],
        "temperature-to-humidity map:": [
          { start: 69, end: 69, offset: 0 },
          { start: 0, end: 68, offset: 1 },
        ],
        "humidity-to-location map:": [
          { start: 56, end: 92, offset: 60 },
          { start: 93, end: 96, offset: 56 },
        ],
      }
    );

    expect(res).toEqual(35);
  });
});
