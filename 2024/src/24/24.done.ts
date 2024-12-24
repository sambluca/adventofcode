import { exercise1, parse, exercise2 } from ".";
import { data } from "./data";

const mockData = `x00: 1
x01: 1
x02: 1
y00: 0
y01: 1
y02: 0

x00 AND y00 -> z00
x01 XOR y01 -> z01
x02 OR y02 -> z02`;

const mockData2 = `x00: 1
x01: 0
x02: 1
x03: 1
x04: 0
y00: 1
y01: 1
y02: 1
y03: 1
y04: 1

ntg XOR fgs -> mjb
y02 OR x01 -> tnw
kwq OR kpj -> z05
x00 OR x03 -> fst
tgd XOR rvg -> z01
vdt OR tnw -> bfw
bfw AND frj -> z10
ffh OR nrd -> bqk
y00 AND y03 -> djm
y03 OR y00 -> psh
bqk OR frj -> z08
tnw OR fst -> frj
gnj AND tgd -> z11
bfw XOR mjb -> z00
x03 OR x00 -> vdt
gnj AND wpb -> z02
x04 AND y00 -> kjc
djm OR pbm -> qhw
nrd AND vdt -> hwm
kjc AND fst -> rvg
y04 OR y02 -> fgs
y01 AND x02 -> pbm
ntg OR kjc -> kwq
psh XOR fgs -> tgd
qhw XOR tgd -> z09
pbm OR djm -> kpj
x03 XOR y03 -> ffh
x00 XOR y04 -> ntg
bfw OR bqk -> z06
nrd XOR fgs -> wpb
frj XOR qhw -> z04
bqk OR frj -> z07
y03 OR x01 -> nrd
hwm AND bqk -> z03
tgd XOR rvg -> z12
tnw OR pbm -> gnj`;

describe.skip("parse", () => {
  test("mockData", () => {
    const [bits, instructions] = parse(mockData);
    expect(instructions).toEqual([
      { key1: "x00", instruction: "AND", key2: "y00", output: "z00" },
      { key1: "x01", instruction: "XOR", key2: "y01", output: "z01" },
      { key1: "x02", instruction: "OR", key2: "y02", output: "z02" },
    ]);
    expect(bits).toEqual({
      x00: "1",
      x01: "1",
      x02: "1",
      y00: "0",
      y01: "1",
      y02: "0",
    });
  });
});

describe("exercise1", () => {
  test("mockData", () => {
    const res = exercise1(mockData);

    expect(res).toEqual(4);
  });
  test("mockData2", () => {
    const res = exercise1(mockData2);

    expect(res).toEqual(2024);
  });

  test("data", () => {
    const res = exercise1(data);

    expect(res).toEqual(51657025112326);
  });
});

describe("exercise2", () => {
  test("data", () => {
    const res = exercise2(data);

    expect(res).toEqual("gbf,hdt,jgt,mht,nbf,z05,z09,z30");
  });
});
