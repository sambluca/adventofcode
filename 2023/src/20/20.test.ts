import { parse, exercise } from ".";
import { data } from "./data";

const mockData = `broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a`;

const mockData2 = `broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output`;

describe("parse", () => {
  test("mockData", () => {
    const { state, modules } = parse(mockData);

    expect(state).toEqual({
      broadcaster: { type: "b" },
      a: { type: "ff", high: false },
      b: { type: "ff", high: false },
      c: { type: "ff", high: false },
      inv: {
        type: "c",
        lastHigh: {
          c: false,
        },
      },
      output: { type: "o" },
      rx: { type: "rx" },
    });

    expect(modules).toEqual({
      broadcaster: { connections: ["a", "b", "c"], type: "b" },
      a: { connections: ["b"], type: "ff" },
      b: { connections: ["c"], type: "ff" },
      c: { connections: ["inv"], type: "ff" },
      inv: { connections: ["a"], type: "c" },
      output: { type: "o", connections: [] },
      rx: { type: "rx", connections: [] },
    });
  });
});

describe("exercise1", () => {
  test("mockData", () => {
    const res = exercise(mockData);

    expect(res).toEqual(32000000);
  });

  test("mockData2", () => {
    const res = exercise(mockData2);

    expect(res).toEqual(11687500);
  });

  test("data", () => {
    const res = exercise(data);

    expect(res).toEqual(670984704);
  });
});

describe("exercise2", () => {
  // example data doesn't work for exercise two
  test("data", () => {
    const res = exercise(data, true);

    expect(res).toEqual(262775362119547);
  });
});
