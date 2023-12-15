import { exercise1, parse, exercise2, HASH, HASHMAP } from ".";
import { data } from "./data";

const mockData = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

describe("parse", () => {
  test("mockData", () => {
    const res = parse(mockData);

    expect(res).toEqual([
      "rn=1",
      "cm-",
      "qp=3",
      "cm=2",
      "qp-",
      "pc=4",
      "ot=9",
      "ab=5",
      "pc-",
      "pc=6",
      "ot=7",
    ]);
  });
});

describe("HASH", () => {
  test("rn=1", () => {
    const res = HASH("rn=1");

    expect(res).toEqual(30);
  });

  test("HASH", () => {
    const res = HASH("HASH");

    expect(res).toEqual(52);
  });
});
describe("exercise1", () => {
  test("mockData", () => {
    const res = exercise1(mockData);

    expect(res).toEqual(1320);
  });

  test("data", () => {
    const res = exercise1(data);

    expect(res).toEqual(511215);
  });
});

describe("HASHMAP", () => {
  test("mockData", () => {
    const res = HASHMAP(parse(mockData));

    expect(res[0]).toEqual([
      { label: "rn", length: 1 },
      { label: "cm", length: 2 },
    ]);
    expect(res[3]).toEqual([
      { label: "ot", length: 7 },
      { label: "ab", length: 5 },
      { label: "pc", length: 6 },
    ]);
  });
});

describe("exercise2", () => {
  test("mockData", () => {
    const res = exercise2(mockData);

    expect(res).toEqual(145);
  });

  test("data", () => {
    const res = exercise2(data);

    expect(res).toEqual(236057);
  });
});
