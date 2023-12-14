import { exercise1, parse, exercise2, countPossibilities } from ".";
import { data } from "./data";

const mockData = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;

describe("countPossibilities", () => {
  test("???.### 1,1,3", () => {
    const res = countPossibilities({ springs: "???.###", combo: [1, 1, 3] });

    expect(res).toEqual(1);
  });

  test("blank springs", () => {
    const res = countPossibilities({ springs: "", combo: [1, 1, 3] });

    expect(res).toEqual(0);
  });

  test("blank both", () => {
    const res = countPossibilities({ springs: "", combo: [] });

    expect(res).toEqual(1);
  });

  test("blank combo no springs", () => {
    const res = countPossibilities({ springs: "........", combo: [] });

    expect(res).toEqual(1);
  });

  test("blank combo with springs", () => {
    const res = countPossibilities({ springs: "#......#", combo: [] });

    expect(res).toEqual(0);
  });
});

describe("parse", () => {
  test("mockData", () => {
    const res = parse(mockData);

    expect(res).toEqual(
      expect.arrayContaining([
        { springs: "???.###", combo: [1, 1, 3] },
        { springs: ".??..??...?##.", combo: [1, 1, 3] },
      ])
    );
  });
});

describe("exercise1", () => {
  test("mockData", () => {
    const res = exercise1(mockData);

    expect(res).toEqual(21);
  });

  test.skip("data", () => {
    const res = exercise1(data);

    expect(res).toEqual(8075);
  });
});

describe("exercise2", () => {
  test("mockData", () => {
    const res = exercise2(mockData);

    expect(res).toEqual(525152);
  });

  test.skip("data", () => {
    const res = exercise2(data);

    expect(res).toEqual(4232520187524);
  });
});
