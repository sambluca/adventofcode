const xor = (a: bigint, b: bigint) => BigInt(a) ^ BigInt(b);
type Instruction = { opcode: bigint; operand: bigint };
type Register = { A: bigint; B: bigint; C: bigint };
export class Computer {
  instructions: bigint[];
  registers: Register;
  ogRegisters: Register;

  pointer: bigint;
  outputs: string[];
  debugger: string[];
  constructor(text: string) {
    const [rs, i] = text.split("\n\n");

    const instructions = i.replace("Program: ", "").split(",").map(BigInt);
    this.instructions = instructions;

    const registers = rs.split("\n").reduce(
      (acc: { A: bigint; B: bigint; C: bigint }, item) => {
        const [register, value] = item.replace("Register ", "").split(": ");

        if (register === "A") return { ...acc, A: BigInt(value) };
        if (register === "B") return { ...acc, B: BigInt(value) };
        if (register === "C") return { ...acc, C: BigInt(value) };

        return acc;
      },
      { A: 0n, B: 0n, C: 0n }
    );

    this.registers = registers;
    this.ogRegisters = registers;
    this.pointer = 0n;
    this.outputs = [];
    this.debugger = [];
  }

  comboOperand(operand: bigint) {
    if (operand <= 3n) return operand;

    if (operand === 4n) return this.registers.A;
    if (operand === 5n) return this.registers.B;
    if (operand === 6n) return this.registers.C;

    return null;
  }

  increasePointer(
    value: bigint = 2n,
    instruction: string,
    { opcode, operand }: Instruction
  ) {
    this.pointer += value;
    this.debugger.push(
      JSON.stringify({
        instruction,
        pointer: this.pointer.toString(),
        register: Object.entries(this.registers).reduce((acc, [key, value]) => {
          return { ...acc, [key]: value.toString() };
        }, {}),
        opcode: opcode.toString(),
        operand: operand.toString(),
      })
    );
  }
  adv({ opcode, operand }: Instruction) {
    const power = this.comboOperand(operand);
    const divisor = BigInt(Math.pow(2, Number(power)));

    const value = BigInt(Math.trunc(Number(this.registers.A / divisor)));

    this.registers.A = value;
    this.increasePointer(2n, "adv", { opcode, operand });

    // this.debugger.push(JSON.stringify({op: 'adv', opcode, operand}))
  }

  bxl({ operand, opcode }: Instruction) {
    const b = this.registers.B;

    this.registers.B = xor(b, operand);
    this.increasePointer(2n, "bxl", { opcode, operand });
  }

  bst({ operand, opcode }: Instruction) {
    const combo = this.comboOperand(operand);
    const value = combo % 8n;
    this.registers.B = value;
    this.increasePointer(2n, "bst", { opcode, operand });
  }

  jnz({ opcode, operand }: Instruction) {
    if (this.registers.A === 0n) {
      this.increasePointer(2n, "jnz", { opcode, operand });
      return;
    }

    this.pointer = operand;
    this.increasePointer(0n, "jnz", { opcode, operand });
  }

  bxc({ operand, opcode }: Instruction) {
    const b = this.registers.B;
    const c = this.registers.C;

    this.registers.B = xor(b, c);
    this.increasePointer(2n, "bxc", { opcode, operand });
  }

  out({ operand, opcode }: Instruction) {
    const combo = this.comboOperand(operand);
    const value = combo % 8n;

    this.outputs.push(...String(value).split(""));
    this.increasePointer(2n, "out", { opcode, operand });
  }

  bdv({ operand, opcode }: Instruction) {
    const power = this.comboOperand(operand);
    const divisor = BigInt(Math.pow(2, Number(power)));

    const value = BigInt(Math.trunc(Number(this.registers.A / divisor)));

    this.registers.B = value;
    this.increasePointer(2n, "bdv", { opcode, operand });
  }

  cdv({ operand, opcode }: Instruction) {
    const power = this.comboOperand(operand);
    const divisor = BigInt(Math.pow(2, Number(power)));

    const value = BigInt(Math.trunc(Number(this.registers.A / divisor)));

    this.registers.C = value;
    this.increasePointer(2n, "cdv", { opcode, operand });
  }

  instruction({ opcode, operand }: Instruction) {
    if (opcode === 0n) return this.adv({ opcode, operand });
    if (opcode === 1n) return this.bxl({ opcode, operand });
    if (opcode === 2n) return this.bst({ opcode, operand });
    if (opcode === 3n) return this.jnz({ opcode, operand });
    if (opcode === 4n) return this.bxc({ opcode, operand });
    if (opcode === 5n) return this.out({ opcode, operand });
    if (opcode === 6n) return this.bdv({ opcode, operand });
    if (opcode === 7n) return this.cdv({ opcode, operand });
  }

  run() {
    while (this.pointer <= this.instructions.length - 1) {
      const opcode = this.instructions[Number(this.pointer)];
      const operand = this.instructions[Number(this.pointer) + 1];

      this.instruction({ opcode, operand });
    }
  }

  reverseReset(aValue: bigint) {
    this.debugger = [];
    this.outputs = [];

    this.pointer = 0n;
    this.registers = {
      ...this.ogRegisters,
      A: aValue,
    };
  }

  reverse() {
    const expected = this.instructions.join(",");

    this.reverseReset(0n);

    let min = 0n;
    let found = false;

    while (!found) {
      this.run();
      const output = this.outputs.join(",");
      if (output === expected) {
        found = true;
        break;
      }

      if (expected.endsWith(output)) {
        min = min * 8n;
      } else {
        min++;
      }
      this.reverseReset(min);
    }

    return Number(min);
  }
}
