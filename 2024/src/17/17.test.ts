import { Computer } from ".";
import { data } from "./data";

const mockData = `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`;

describe("computer", () => {
  test("parse", () => {
    const computer = new Computer(mockData);

    expect(computer.registers).toEqual({
      A: 729,
      B: 0,
      C: 0,
    });

    expect(computer.instructions).toEqual(
      expect.arrayContaining([0, 1, 5, 4, 3, 0])
    );
  });

  test("combo operand", () => {
    const computer = new Computer(`Register A: 10
Register B: 20
Register C: 30

Program: 0,1,5,4,3,0`);

    expect(computer.comboOperand(0)).toEqual(0);
    expect(computer.comboOperand(1)).toEqual(1);
    expect(computer.comboOperand(2)).toEqual(2);
    expect(computer.comboOperand(3)).toEqual(3);
    expect(computer.comboOperand(4)).toEqual(10);
    expect(computer.comboOperand(5)).toEqual(20);
    expect(computer.comboOperand(6)).toEqual(30);
    expect(computer.comboOperand(7)).toEqual(null);
  });

  test("adv", () => {
    const computer = new Computer(`Register A: 16
Register B: 2
Register C: 30

Program: 0,1,5,4,3,0`);

    expect(computer.registers.A).toEqual(16);
    expect(computer.pointer).toEqual(0);
    computer.adv({ opcode: 0, operand: 5 });
    expect(computer.registers.A).toEqual(4);

    expect(computer.pointer).toEqual(2);
  });

  test("bxl", () => {
    const computer = new Computer(`Register A: 16
Register B: 5
Register C: 30

Program: 0,1,5,4,3,0`);
    expect(computer.pointer).toEqual(0);

    expect(computer.registers.B).toEqual(5);
    computer.bxl({ opcode: 0, operand: 3 });
    expect(computer.registers.B).toEqual(6);
    expect(computer.pointer).toEqual(2);
  });

  test("bst", () => {
    const computer = new Computer(`Register A: 16
Register B: 5
Register C: 30

Program: 0,1,5,4,3,0`);
    expect(computer.pointer).toEqual(0);

    expect(computer.registers.B).toEqual(5);
    computer.bst({ opcode: 0, operand: 3 });
    expect(computer.registers.B).toEqual(3);
    expect(computer.pointer).toEqual(2);
  });

  test("jnz A=0", () => {
    const computer1 = new Computer(`Register A: 0
Register B: 5
Register C: 30

Program: 0,1,5,4,3,0`);

    expect(computer1.pointer).toEqual(0);
    expect(computer1.registers.A).toEqual(0);
    computer1.jnz({ opcode: 0, operand: 3 });
    expect(computer1.registers.A).toEqual(0);
    expect(computer1.pointer).toEqual(2);
  });

  test("jnz A !== 0", () => {
    const computer1 = new Computer(`Register A: 5
Register B: 5
Register C: 30

Program: 0,1,5,4,3,0`);

    expect(computer1.pointer).toEqual(0);
    expect(computer1.registers.A).toEqual(5);
    computer1.jnz({ opcode: 0, operand: 3 });
    expect(computer1.registers.A).toEqual(5);
    expect(computer1.pointer).toEqual(3);
  });

  test("bxc", () => {
    const computer = new Computer(`Register A: 16
Register B: 5
Register C: 30

Program: 0,1,5,4,3,0`);
    expect(computer.pointer).toEqual(0);

    expect(computer.registers.B).toEqual(5);
    computer.bxc({ opcode: 0, operand: 3 });
    expect(computer.registers.B).toEqual(27);
    expect(computer.pointer).toEqual(2);
  });

  test("out", () => {
    const computer = new Computer(`Register A: 16
Register B: 10
Register C: 30

Program: 0,1,5,4,3,0`);
    expect(computer.pointer).toEqual(0);

    computer.out({ opcode: 0, operand: 3 });
    expect(computer.outputs).toEqual(["3"]);
    expect(computer.pointer).toEqual(2);
  });

  test("bdv", () => {
    const computer = new Computer(`Register A: 16
Register B: 2
Register C: 30

Program: 0,1,5,4,3,0`);

    expect(computer.registers.A).toEqual(16);
    expect(computer.pointer).toEqual(0);
    computer.bdv({ opcode: 0, operand: 5 });
    expect(computer.registers.B).toEqual(4);

    expect(computer.pointer).toEqual(2);
  });

  test("cdv", () => {
    const computer = new Computer(`Register A: 16
Register B: 2
Register C: 30

Program: 0,1,5,4,3,0`);

    expect(computer.registers.A).toEqual(16);
    expect(computer.pointer).toEqual(0);
    computer.cdv({ opcode: 0, operand: 5 });
    expect(computer.registers.C).toEqual(4);

    expect(computer.pointer).toEqual(2);
  });

  describe("run", () => {
    test("If register C contains 9, the program 2,6 would set register B to 1", () => {
      const computer = new Computer(`Register A: 16
Register B: 2
Register C: 9

Program: 2,6`);

      computer.run();

      expect(computer.registers.B).toEqual(1);
    });

    test("If register A contains 10, the program 5,0,5,1,5,4 would output 0,1,2.", () => {
      const computer = new Computer(`Register A: 10
Register B: 2
Register C: 9

Program: 5,0,5,1,5,4`);

      computer.run();
      expect(computer.outputs).toEqual(["0", "1", "2"]);
    });

    test("If register A contains 2024, the program 0,1,5,4,3,0 would output 4,2,5,6,7,7,7,7,3,1,0 and leave 0 in register A", () => {
      const computer = new Computer(`Register A: 2024
Register B: 2
Register C: 9

Program: 0,1,5,4,3,0`);

      computer.run();
      expect(computer.outputs.join(",")).toEqual("4,2,5,6,7,7,7,7,3,1,0");
      expect(computer.registers.A).toEqual(0);
    });

    test("mockData", () => {
      const computer = new Computer(mockData);
      computer.run();

      expect(computer.outputs).toEqual(
        [4, 6, 3, 5, 6, 3, 5, 2, 1, 0].map(String)
      );
    });

    test("real Data", () => {
      const computer = new Computer(data);
      computer.run();

      expect(computer.outputs.join(",")).toEqual("3,5,0,1,5,1,5,1,0");
    });
  });

  describe("part2", () => {
    test("reverseReset", () => {
      const computer = new Computer(`Register A: 117440
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`);

      computer.run();
      expect(computer.registers.A).toEqual(0);
      expect(computer.outputs.join(",")).toEqual("0,3,5,4,3,0");
      expect(computer.debugger.length).toBeGreaterThan(0);

      computer.reverseReset(10);

      expect(computer.registers.A).toEqual(10);
      expect(computer.outputs).toHaveLength(0);
      expect(computer.debugger).toHaveLength(0);
    });

    test("mock data 2", () => {
      const computer = new Computer(`Register A: 117440
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`);
      computer.reverse();

      console.log(computer.debugger);

      expect(computer.outputs.join(",")).toEqual("0,3,5,4,3,0");
    });
  });
});
