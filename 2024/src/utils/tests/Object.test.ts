import { deepEqual } from "../Object";

describe("Object Utils", () => {
  test("deepEqual", () => {
    const res = deepEqual({ 1: 2 }, { 1: 2 });

    expect(res).toBe(true);
  });
});
