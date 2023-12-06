import { exercise1, exercise2, findRecordButtonPress, setUpData } from ".";
import { data } from "./data";

const mockData = `Time:      7  15   30
Distance:  9  40  200`;
describe("setUp", () => {
  test("mockData", () => {
    const res = setUpData(mockData);

    expect(res).toEqual({
      part1: [
        {
          time: 7,
          distance: 9,
        },
        {
          time: 15,
          distance: 40,
        },
        {
          time: 30,
          distance: 200,
        },
      ],
      part2: {
        time: 71530,
        distance: 940200,
      },
    });
  });
});

describe("findRecordButtonPress", () => {
  test("mockData", () => {
    const res = findRecordButtonPress({
      time: 7,
      distance: 9,
    });

    expect(res).toEqual(4);
  });
});

describe("exercise1", () => {
  test("mockData", () => {
    const res = exercise1(mockData);
    expect(res).toEqual(288);
  });

  test("realData", () => {
    const res = exercise1(data);
    expect(res).toEqual(1155175);
  });
});
describe("exercise2", () => {
  test("mockData", () => {
    const res = exercise2(mockData);
    expect(res).toEqual(71503);
  });

  test("realData", () => {
    const res = exercise2(data);
    expect(res).toEqual(35961505);
  });
});
