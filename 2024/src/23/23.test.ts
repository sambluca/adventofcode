import { exercise1, parse, exercise2 } from ".";
import { data } from "./data";

const mockData = `kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn`;

describe("parse", () => {
  test("mockData", () => {
    const res = parse(mockData);

    expect(res).toEqual(expect.arrayContaining([]));
  });
});

describe("exercise1", () => {
  test("mockData", () => {
    const res = exercise1(mockData);

    expect(res).toEqual(7);
  });

  test("data", () => {
    const res = exercise1(data);

    expect(res).toEqual(1230);
  });
});

describe.skip("exercise2", () => {
  test("mockData", () => {
    const res = exercise2(mockData);

    expect(res).toEqual();
  });

  test.skip("data", () => {
    const res = exercise2(data);

    expect(res).toEqual();
  });
});
