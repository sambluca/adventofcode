const xor = (a: number, b: number) => Number(BigInt(a) ^ BigInt(b));
type Instruction = { opcode: number; operand: number };
type Register = { A: number; B: number; C: number };
export class Computer {
  instructions: number[];
  registers: Register;
  ogRegisters: Register;

  pointer: number;
  outputs: string[];
  debugger: string[];
  constructor(text: string) {
    const [rs, i] = text.split("\n\n");

    const instructions = i.replace("Program: ", "").split(",").map(Number);
    this.instructions = instructions;

    const registers = rs.split("\n").reduce(
      (acc: { A: number; B: number; C: number }, item) => {
        const [register, value] = item.replace("Register ", "").split(": ");

        if (register === "A") return { ...acc, A: Number(value) };
        if (register === "B") return { ...acc, B: Number(value) };
        if (register === "C") return { ...acc, C: Number(value) };

        return acc;
      },
      { A: 0, B: 0, C: 0 }
    );

    this.registers = registers;
    this.ogRegisters = registers;
    this.pointer = 0;
    this.outputs = [];
    this.debugger = [];
  }

  comboOperand(operand: number) {
    if (operand <= 3) return operand;

    if (operand === 4) return this.registers.A;
    if (operand === 5) return this.registers.B;
    if (operand === 6) return this.registers.C;

    return null;
  }

  increasePointer(
    value: number = 2,
    instruction: string,
    { opcode, operand }: Instruction
  ) {
    this.pointer += value;
    this.debugger.push(
      JSON.stringify({
        instruction,
        pointer: this.pointer,
        register: this.registers,
        opcode,
        operand,
      })
    );
  }
  adv({ opcode, operand }: Instruction) {
    const power = this.comboOperand(operand);
    const divisor = Math.pow(2, power);

    const value = Math.trunc(this.registers.A / divisor);

    this.registers.A = value;
    this.increasePointer(2, "adv", { opcode, operand });

    // this.debugger.push(JSON.stringify({op: 'adv', opcode, operand}))
  }

  bxl({ operand, opcode }: Instruction) {
    const b = this.registers.B;

    this.registers.B = xor(b, operand);
    this.increasePointer(2, "bxl", { opcode, operand });
  }

  bst({ operand, opcode }: Instruction) {
    const combo = this.comboOperand(operand);
    const value = combo % 8;
    this.registers.B = value;
    this.increasePointer(2, "bst", { opcode, operand });
  }

  jnz({ opcode, operand }: Instruction) {
    if (this.registers.A === 0) {
      this.increasePointer(2, "jnz", { opcode, operand });
      return;
    }

    this.pointer = operand;
    this.increasePointer(0, "jnz", { opcode, operand });
  }

  bxc({ operand, opcode }: Instruction) {
    const b = this.registers.B;
    const c = this.registers.C;

    this.registers.B = xor(b, c);
    this.increasePointer(2, "bxc", { opcode, operand });
  }

  out({ operand, opcode }: Instruction) {
    const combo = this.comboOperand(operand);
    const value = combo % 8;

    this.outputs.push(...String(value).split(""));
    this.increasePointer(2, "out", { opcode, operand });
  }

  bdv({ operand, opcode }: Instruction) {
    const power = this.comboOperand(operand);
    const divisor = Math.pow(2, power);

    const value = Math.trunc(this.registers.A / divisor);

    this.registers.B = value;
    this.increasePointer(2, "bdv", { opcode, operand });
  }

  cdv({ operand, opcode }: Instruction) {
    const power = this.comboOperand(operand);
    const divisor = Math.pow(2, power);

    const value = Math.trunc(this.registers.A / divisor);

    this.registers.C = value;
    this.increasePointer(2, "cdv", { opcode, operand });
  }

  instruction({ opcode, operand }: Instruction) {
    if (opcode === 0) return this.adv({ opcode, operand });
    if (opcode === 1) return this.bxl({ opcode, operand });
    if (opcode === 2) return this.bst({ opcode, operand });
    if (opcode === 3) return this.jnz({ opcode, operand });
    if (opcode === 4) return this.bxc({ opcode, operand });
    if (opcode === 5) return this.out({ opcode, operand });
    if (opcode === 6) return this.bdv({ opcode, operand });
    if (opcode === 7) return this.cdv({ opcode, operand });
  }

  run() {
    while (this.pointer <= this.instructions.length - 1) {
      const opcode = this.instructions[this.pointer];
      const operand = this.instructions[this.pointer + 1];

      this.instruction({ opcode, operand });
    }
  }

  reverseReset(aValue: number) {
    this.debugger = [];
    this.outputs = [];

    this.registers = {
      ...this.ogRegisters,
      A: aValue,
    };
  }
  reverse() {
    while (this.pointer <= this.instructions.length - 1) {
      const opcode = this.instructions[this.pointer];
      const operand = this.instructions[this.pointer + 1];

      this.instruction({ opcode, operand });
    }
  }
}
