import { Arr } from "../utils";

const clean = (data: string, split: string) =>
  data
    .trim()
    .split(/\n/)
    .map((value) => value.split(split).map(Number));

export const parse = (text: string) => {
  const [orders, lines] = text.split("xxx");
  return { rules: clean(orders, "|"), commands: clean(lines, ",") };
};

const sortCommands = (rules: number[][]) => (firstNumber, secondNumber) => {
  const rule = rules.find(
    (rule) => rule.includes(firstNumber) && rule.includes(secondNumber)
  );
  if (!rule) return 0;

  return rule[0] === firstNumber ? -1 : 1;
};

const getValues = (
  { commands, rules }: { commands: number[][]; rules: number[][] },
  filterCheck: (b: boolean) => boolean
) =>
  commands
    .map((command) => command.toSorted(sortCommands(rules)))
    .filter((command, index) =>
      filterCheck(new Arr(command).equals(new Arr(commands[index])))
    )
    .map((command) => command[Math.floor(command.length / 2)])
    .reduce((acc: number, item) => acc + item, 0);

export const exercise1 = (text: string) => getValues(parse(text), (b) => b);

export const exercise2 = (text: string) => getValues(parse(text), (b) => !b);
