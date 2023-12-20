import {
  exercise1,
  parse,
  exercise2,
  parsePart,
  parseWorkflow,
  isAccepted,
  Workflow,
  splitRange,
} from ".";
import { data } from "./data";

const mockData = `px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}`;

const workflows = [
  {
    name: "px",
    defaultFlow: "rfg",
    flows: [
      { nextFlow: "qkq", category: "a", comparison: "<", value: 2006 },
      { nextFlow: "A", category: "m", comparison: ">", value: 2090 },
    ],
  },
  {
    name: "pv",
    defaultFlow: "A",
    flows: [{ nextFlow: "R", category: "a", comparison: ">", value: 1716 }],
  },
  {
    name: "lnx",
    defaultFlow: "A",
    flows: [{ nextFlow: "A", category: "m", comparison: ">", value: 1548 }],
  },
  {
    name: "rfg",
    defaultFlow: "A",
    flows: [
      { nextFlow: "gd", category: "s", comparison: "<", value: 537 },
      { nextFlow: "R", category: "x", comparison: ">", value: 2440 },
    ],
  },
  {
    name: "qs",
    defaultFlow: "lnx",
    flows: [{ nextFlow: "A", category: "s", comparison: ">", value: 3448 }],
  },
  {
    name: "qkq",
    defaultFlow: "crn",
    flows: [{ nextFlow: "A", category: "x", comparison: "<", value: 1416 }],
  },
  {
    name: "crn",
    defaultFlow: "R",
    flows: [{ nextFlow: "A", category: "x", comparison: ">", value: 2662 }],
  },
  {
    name: "in",
    defaultFlow: "qqz",
    flows: [{ nextFlow: "px", category: "s", comparison: "<", value: 1351 }],
  },
  {
    name: "qqz",
    defaultFlow: "R",
    flows: [
      { nextFlow: "qs", category: "s", comparison: ">", value: 2770 },
      { nextFlow: "hdj", category: "m", comparison: "<", value: 1801 },
    ],
  },
  {
    name: "gd",
    defaultFlow: "R",
    flows: [{ nextFlow: "R", category: "a", comparison: ">", value: 3333 }],
  },
  {
    name: "hdj",
    defaultFlow: "pv",
    flows: [{ nextFlow: "A", category: "m", comparison: ">", value: 838 }],
  },
] as Array<Workflow>;
describe("parsePart", () => {
  test("{x=787,m=2655,a=1222,s=2876}", () => {
    const res = parsePart("{x=787,m=2655,a=1222,s=2876}");

    expect(res).toEqual({ x: 787, m: 2655, a: 1222, s: 2876 });
  });
});

describe("parseWorkflow", () => {
  test("px{a<2006:qkq,m>2090:A,rfg}", () => {
    const res = parseWorkflow("px{a<2006:qkq,m>2090:A,rfg}");
    expect(res).toEqual({
      name: "px",
      defaultFlow: "rfg",
      flows: [
        {
          category: "a",
          comparison: "<",
          value: 2006,
          nextFlow: "qkq",
        },
        {
          category: "m",
          comparison: ">",
          value: 2090,
          nextFlow: "A",
        },
      ],
    });
  });
});
describe("parse", () => {
  test("mockData", () => {
    const res = parse(mockData);
    expect(res).toEqual(
      expect.objectContaining({
        parts: expect.arrayContaining([{ x: 787, m: 2655, a: 1222, s: 2876 }]),
        workflows: expect.arrayContaining([
          {
            name: "px",

            defaultFlow: "rfg",
            flows: [
              {
                category: "a",
                comparison: "<",
                value: 2006,
                nextFlow: "qkq",
              },
              {
                category: "m",
                comparison: ">",
                value: 2090,
                nextFlow: "A",
              },
            ],
          },
        ]),
      })
    );
  });
});

describe("isAccepted", () => {
  test("{ x: 787, m: 2655, a: 1222, s: 2876 }", () => {
    const res = isAccepted({ x: 787, m: 2655, a: 1222, s: 2876 }, workflows);

    expect(res).toEqual(true);
  });

  test("{ x: 1679, m: 44, a: 2067, s: 496 }", () => {
    const res = isAccepted({ x: 1679, m: 44, a: 2067, s: 496 }, workflows);

    expect(res).toEqual(false);
  });
});

describe("exercise1", () => {
  test("mockData", () => {
    const res = exercise1(mockData);

    expect(res).toEqual(19114);
  });

  test("data", () => {
    const res = exercise1(data);

    expect(res).toEqual(350678);
  });
});

describe("splitRange", () => {
  test("default flow", () => {
    const res = splitRange(
      {
        x: [1, 2],
        m: [2, 3],
        a: [3, 4],
        s: [4, 5],
      },
      { nextFlow: "bbb" }
    );

    expect(res).toEqual({
      acceptedRange: {
        x: [1, 2],
        m: [2, 3],
        a: [3, 4],
        s: [4, 5],
      },
      rejectedRange: null,
    });
  });

  test("> comparison", () => {
    const res = splitRange(
      {
        x: [1, 2],
        m: [2, 3],
        a: [3, 4],
        s: [4, 5],
      },
      { nextFlow: "bbb", comparison: ">", category: "a", value: 5 }
    );

    expect(res).toEqual({
      acceptedRange: {
        x: [1, 2],
        m: [2, 3],
        a: [6, 4],
        s: [4, 5],
      },
      rejectedRange: {
        x: [1, 2],
        m: [2, 3],
        a: [3, 5],
        s: [4, 5],
      },
    });
  });

  test("< comparison", () => {
    const res = splitRange(
      {
        x: [1, 2],
        m: [2, 3],
        a: [3, 4],
        s: [4, 5],
      },
      { nextFlow: "bbb", comparison: "<", category: "a", value: 5 }
    );

    expect(res).toEqual({
      acceptedRange: {
        x: [1, 2],
        m: [2, 3],
        a: [3, 4],
        s: [4, 5],
      },
      rejectedRange: {
        x: [1, 2],
        m: [2, 3],
        a: [5, 4],
        s: [4, 5],
      },
    });
  });
});
describe("exercise2", () => {
  test("mockData", () => {
    const res = exercise2(mockData);

    expect(res).toEqual(167409079868000);
  });

  test("data", () => {
    const res = exercise2(data);

    expect(res).toEqual(124831893423809);
  });
});
