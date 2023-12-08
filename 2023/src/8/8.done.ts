import { exercise1, exercise2, findSteps, parse } from ".";
import { deepEqual } from "../utils/Object";
import { data } from "./data";

const mockData1 = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;

const mockData2 = `LLR

BBB = (AAA, ZZZ)
AAA = (BBB, BBB)
ZZZ = (ZZZ, ZZZ)`;

const mockData3 = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

describe("parse", () => {
  test("mockData1", () => {
    const res = parse(mockData1);

    expect(
      deepEqual(res, {
        directions: ["right", "left"],
        maps: {
          AAA: {
            left: "BBB",
            right: "CCC",
          },
          BBB: {
            left: "DDD",
            right: "EEE",
          },
          CCC: {
            left: "ZZZ",
            right: "GGG",
          },
          DDD: {
            left: "DDD",
            right: "DDD",
          },
          EEE: {
            left: "EEE",
            right: "EEE",
          },
          GGG: {
            left: "GGG",
            right: "GGG",
          },
          ZZZ: {
            left: "ZZZ",
            right: "ZZZ",
          },
        },
      })
    ).toEqual(true);
  });

  test("mockData3", () => {
    const res = parse(mockData3);

    expect(
      deepEqual(res, {
        directions: ["left", "right"],
        maps: {
          "11A": { left: "11B", right: "XXX" },
          "11B": { left: "XXX", right: "11Z" },
          "11Z": { left: "11B", right: "XXX" },
          "22A": { left: "22B", right: "XXX" },
          "22B": { left: "22C", right: "22C" },
          "22C": { left: "22Z", right: "22Z" },
          "22Z": { left: "22B", right: "22B" },
          XXX: { left: "XXX", right: "XXX" },
        },
      })
    ).toEqual(true);
  });
});

describe("findSteps", () => {
  test("mockData1", () => {
    const res = findSteps(parse(mockData1), "AAA");

    expect(res).toEqual(2);
  });
  test("recursion", () => {
    const res = findSteps(parse(mockData2), "AAA");

    expect(res).toEqual(6);
  });

  test("exercise 2 11A", () => {
    const res = findSteps(parse(mockData3), "11A");

    expect(res).toEqual(2);
  });

  test("exercise 2 22A", () => {
    const res = findSteps(parse(mockData3), "22A");

    expect(res).toEqual(3);
  });
});
describe("exercise1", () => {
  test("mockData1", () => {
    const res = exercise1(mockData1);

    expect(res).toEqual(2);
  });

  test("mockData2", () => {
    const res = exercise1(mockData2);

    expect(res).toEqual(6);
  });

  test.skip("data", () => {
    const res = exercise1(data);

    expect(res).toEqual(11567);
  });
});

describe("exercise2", () => {
  test("mockData3", () => {
    const res = exercise2(mockData3);

    expect(res).toEqual(6);
  });

  test("data", () => {
    const res = exercise2(data);

    expect(res).toEqual(9858474970153);
  });
});
