const parseCommand = (command: string) => {
  const [item1, item2] = command.replace(/[mul\(\)]/g, "").split(",");

  const parsed: [number, number] = [Number(item1), Number(item2)];

  return parsed;
};

export const parse = (text: string) => {
  const data = text.split(/\n/);
  const regex = /mul\((\d+),(\d+)\)/g;

  return data.reduce(
    (acc: [number, number][], line) => [
      ...acc,
      ...line.match(regex).map(parseCommand),
    ],
    []
  );
};

export const parse2 = (text: string) => {
  const data = text.split(/\n/);
  const regex = /mul\((\d+),(\d+)\)|don't\(\)|do\(\)/g;

  const commands = data.reduce(
    (acc: [number, number][], line) => [...acc, ...line.match(regex)],
    []
  );

  const commandsToFollow = [];

  let lastDoDontCommand = "";
  commands.forEach((command) => {
    if (command === "don't()" || command === "do()")
      lastDoDontCommand = command;

    if (lastDoDontCommand !== "don't()") commandsToFollow.push(command);
  });

  return commandsToFollow.filter((i) => i !== "do()").map(parseCommand);
};

const addCommands = (acc: number, [number1, number2]) =>
  acc + number1 * number2;

export const exercise1 = (text: string) => parse(text).reduce(addCommands, 0);

export const exercise2 = (text: string) => parse2(text).reduce(addCommands, 0);
