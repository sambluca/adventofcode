import { parse, exercise } from ".";
import { data } from "./data";

const mockData = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`;

describe("parse", () => {
  test("mockData", () => {
    const res = parse("0101-0105");

    expect(res).toEqual(
      expect.arrayContaining([
        {
          lower: 101,
          upper: 105,
        },
      ])
    );
  });
});

describe("exercise1", () => {
  test("mockData", () => {
    const [res] = exercise(mockData);

    expect(res).toEqual(1227775554);
  });

  test("data", () => {
    const [res] = exercise(data);

    expect(res).toEqual(40055209690);
  });
});

describe("exercise2", () => {
  test("mockData", () => {
    const [, res] = exercise(mockData);

    expect(res).toEqual(4174379265);
  });

  test("data", () => {
    const [, res] = exercise(data);

    expect(res).toEqual(50857215650);
  });
});
