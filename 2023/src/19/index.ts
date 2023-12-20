type Category = "x" | "m" | "a" | "s";
type Comparison = "<" | ">";
type Flow = {
  nextFlow: string;
  category?: Category;
  comparison?: Comparison;
  value?: number;
};

export type Workflow = {
  name: string;
  defaultFlow: string;
  flows: Array<Flow>;
};

type Part = {
  [key in Category]: number;
};

type PartRanges = {
  [key in Category]: [number, number];
};

export const parsePart = (part: string) =>
  part
    .replaceAll(/(\{|\})/g, "")
    .split(",")
    .reduce((acc, curr) => {
      const [c, value] = curr.split("=");
      const category = c as Category;
      return { ...acc, [category]: Number(value) };
    }, {});

export const parseWorkflow = (workflow: string): Workflow => {
  const [name, rest] = workflow.split("{");

  const instructions = rest.replace("}", "").split(",");

  const defaultFlow = instructions.pop();

  const flows = instructions.map((instruction): Flow => {
    const [check, nextFlow] = instruction.split(":");
    const [ctg, cmp, ...rest] = check.split("");
    const category = ctg as Category;
    const comparison = cmp as Comparison;

    return { nextFlow, category, comparison, value: Number(rest.join("")) };
  });

  return {
    name,
    defaultFlow,
    flows,
  };
};

export const isAccepted = (part: Part, workflows: Array<Workflow>) => {
  let accepted = true;
  let nextWorkflow = workflows.find((i) => i.name === "in");
  let nextWorkflowName = nextWorkflow.name;

  while (true) {
    nextWorkflowName = nextWorkflow.defaultFlow;
    for (let i = 0; i < nextWorkflow.flows.length; i++) {
      const {
        category: flowCategory,
        value: flowValue,
        comparison,
        nextFlow,
      } = nextWorkflow.flows[i];
      const categoryValue = part[flowCategory];
      const comp =
        comparison === ">"
          ? (a: number, b: number) => a > b
          : (a: number, b: number) => a < b;

      if (comp(categoryValue, flowValue)) {
        nextWorkflowName = nextFlow;
        break;
      }
    }

    if (nextWorkflowName === "A") break;
    if (nextWorkflowName === "R") {
      accepted = false;
      break;
    }

    nextWorkflow = workflows.find((i) => i.name === nextWorkflowName);
  }

  return accepted;
};
export const parse = (text: string) => {
  const [workFlowsRaw, partsRaw] = text.split(/\n\n/g);

  const parts = partsRaw.split(/\n/g).map(parsePart) as Array<Part>;
  const workflows = workFlowsRaw.split(/\n/g).map(parseWorkflow);
  return { parts, workflows };
};

export const exercise1 = (text: string) => {
  const { parts, workflows } = parse(text);

  const acceptedParts = parts.filter((part) => isAccepted(part, workflows));

  return acceptedParts.reduce((acc, curr) => {
    const values = Object.values(curr).reduce((acc, c) => acc + c, 0);

    return acc + values;
  }, 0);
};

export const splitRange = (partRanges: PartRanges, instruction: Flow) => {
  let acceptedRange: PartRanges | null = { ...partRanges };
  let rejectedRange: PartRanges | null = { ...partRanges };
  // if we're on a default instruction then just return the accepted range
  if (!instruction.category || !instruction.value || !instruction.comparison)
    return { acceptedRange, rejectedRange: null };
  const [rangeStart, rangeEnd] = partRanges[instruction.category];

  if (instruction.comparison === ">") {
    // if the comparison is > then accepted range is the instruction value + 1 and the end
    // if the comparison is > then rejected range is the start to instruction value
    acceptedRange[instruction.category] = [instruction.value + 1, rangeEnd];
    rejectedRange[instruction.category] = [rangeStart, instruction.value];
  }

  if (instruction.comparison === "<") {
    // if the comparison is < then accepted range is the start to one before the instruction value
    // if the comparison is > then rejected range is the instruction value to the end of this range
    acceptedRange[instruction.category] = [rangeStart, instruction.value - 1];
    rejectedRange[instruction.category] = [instruction.value, rangeEnd];
  }

  return { acceptedRange, rejectedRange };
};
export const exercise2 = (text: string) => {
  const { workflows } = parse(text);
  const startRanges: PartRanges = {
    x: [1, 4000],
    m: [1, 4000],
    a: [1, 4000],
    s: [1, 4000],
  };

  const findAcceptedRanges = (step: string, ranges: PartRanges) => {
    const acceptedRanges: PartRanges[] = [];

    let range: PartRanges = { ...ranges };
    const instructions = workflows.find((i) => i.name === step);

    // the default flow is considered a flow, has to be last as flow order is important
    const flows: Array<Flow> = [
      ...instructions.flows,
      { nextFlow: instructions.defaultFlow },
    ];

    for (const instruction of flows) {
      if (instruction.nextFlow === "A" && !instruction.comparison) {
        // if we've got to here then we're checking a default value thats accepted and we trust this range
        acceptedRanges.push(range);
        break;
      }
      if (instruction.nextFlow === "R" && !instruction.comparison) {
        // if we've got to here then we're checking a default value thats rejected and skip the rest of the instructions
        break;
      }

      // check current range against current instruction
      const { acceptedRange, rejectedRange } = splitRange(range, instruction);

      if (acceptedRange) {
        if (instruction.nextFlow === "A") {
          // if the instruction is accepted and we have a range that fits then we trust it
          acceptedRanges.push(acceptedRange);
        } else if (instruction.nextFlow !== "R") {
          // if the instruction is not rejected or accepted we want to check the next step in the tree
          const ranges = findAcceptedRanges(
            instruction.nextFlow,
            acceptedRange
          );
          // add returned ranges from recursion to our accepted ranges
          if (ranges) acceptedRanges.push(...ranges);
        }
      }

      if (!rejectedRange) {
        // if theres no rejected ranges that means we dont need to check these instructions anymore, we've found all good and bad
        break;
      }
      // just because a range is rejected doesn't mean it's bad, just means it needs to be checked agaisnt the next instruction
      range = rejectedRange;
    }

    return acceptedRanges;
  };

  const acceptedRanges = findAcceptedRanges("in", startRanges);

  return acceptedRanges.reduce((acc, ranges) => {
    const xRangeLength = ranges.x[1] - ranges.x[0] + 1;
    const mRangeLength = ranges.m[1] - ranges.m[0] + 1;
    const aRangeLength = ranges.a[1] - ranges.a[0] + 1;
    const sRangeLength = ranges.s[1] - ranges.s[0] + 1;
    return acc + xRangeLength * mRangeLength * aRangeLength * sRangeLength;
  }, 0);
};
