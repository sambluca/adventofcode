import { copy } from "../utils";

type func = (v1: string, v2: string) => "1" | "0";

const funcs: { AND: func; OR: func; XOR: func } = {
  AND: (v1: string, v2: string) => (v1 === "1" && v2 === "1" ? "1" : "0"),
  OR: (v1: string, v2: string) => (v1 === "1" || v2 === "1" ? "1" : "0"),
  XOR: (v1: string, v2: string) => (v1 !== v2 ? "1" : "0"),
};

const getBinary = (bits: { [x: string]: string }, startsWith: string) =>
  Object.entries(bits)
    .filter(([key, value]) => key.startsWith(startsWith))
    .sort(([a], [b]) => {
      const aNumber = Number(a.replace(startsWith, ""));
      const bNumber = Number(b.replace(startsWith, ""));

      return bNumber - aNumber;
    })
    .map(([k, value]) => value)
    .join("");

export const parse = (
  text: string
): [
  {
    [x: string]: string;
  },
  {
    key1: string;
    instruction: "AND" | "OR" | "XOR";
    key2: string;
    output: string;
  }[]
] => {
  const [b, i] = text.split(/\n\n/);

  const bits = b.split(/\n/).reduce((acc: { [key: string]: string }, item) => {
    const [key, value] = item.split(": ");

    return { ...acc, [key]: value };
  }, {});

  const instructions = i.split(/\n/).map((item) => {
    const [key1, i, key2, a, output] = item.split(" ");

    const instruction = i as "AND" | "OR" | "XOR";
    return { key1, instruction, key2, output };
  });

  return [bits, instructions];
};

export const exercise1 = (text: string) => {
  const [bits, i] = parse(text);
  const instructions = [...i];

  // const is = [];
  while (instructions.length !== 0) {
    const { key1, key2, instruction, output } = instructions.shift();
    const v1 = bits[key1];
    const v2 = bits[key2];

    if (!v1 || !v2) {
      instructions.push({ key1, key2, instruction, output });
    } else {
      // is.push({ key1, key2, instruction, output });
      const func = funcs[instruction];
      const v1 = bits[key1];
      const v2 = bits[key2];
      const res = func(v1, v2);

      bits[output] = res;
    }
  }

  // copy(is);
  return parseInt(getBinary(bits, "z"), 2);
};

export const exercise2 = (text: string) => {
  const [b, i] = parse(text);
  const bits = { ...b };
  const instructions = [...i];

  // const sortedInstructions = instructions.sort((a, b) => {
  //   if (a.key1.startsWith("x") || a.key1.startsWith("y")) {
  //     if (b.key1.startsWith("x") || b.key1.startsWith("y")) {
  //       const aValue = Number(a.key1.replace(/[xy]/, ""));
  //       const bValue = Number(b.key1.replace(/[xy]/, ""));

  //       return aValue - bValue;
  //     }
  //     return -1;
  //   }
  //   return 0;
  // });

  const badBits = [];

  instructions.forEach(({ key1, key2, output, instruction }) => {
    const key1Valid = key1.includes("x") || key1.includes("y");
    const key2Valid = key2.includes("x") || key2.includes("y");
    if (
      instruction === "XOR" &&
      !output.includes("z") &&
      (!key1Valid || !key2Valid)
    ) {
      badBits.push(output);
    }
  });

  const bitLength = 45;
  for (let i = 0; i < bitLength; i++) {
    const id = i.toString().padStart(2, "0");
    const matchingXor = instructions.find(
      (instruction) =>
        ((instruction.key1 === `x${id}` && instruction.key2 === `y${id}`) ||
          (instruction.key1 === `y${id}` && instruction.key2 === `x${id}`)) &&
        instruction.instruction === "XOR"
    );
    const matchingAnd = instructions.find(
      (instruction) =>
        ((instruction.key1 === `x${id}` && instruction.key2 === `y${id}`) ||
          (instruction.key1 === `y${id}` && instruction.key2 === `x${id}`)) &&
        instruction.instruction === "AND"
    );
    const matchingZ = instructions.find(
      (instruction) => instruction.output === `z${id}`
    );

    if (matchingZ.instruction !== "XOR") badBits.push(matchingZ.output);

    const matchingOr = instructions.find(
      (instruction) =>
        instruction.key1 === matchingAnd.output ||
        instruction.key2 === matchingAnd.output
    );
    if (matchingOr !== undefined && matchingOr.instruction !== "OR" && i > 0)
      badBits.push(matchingAnd.output);

    const after = instructions.find(
      (instruction) =>
        instruction.key1 === matchingXor.output ||
        instruction.key2 === matchingXor.output
    );
    if (after !== undefined && after.instruction === "OR")
      badBits.push(matchingXor.output);
  }

  return badBits.sort().join(",");
};
