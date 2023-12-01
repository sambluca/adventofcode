const checkForValidNumber = (val: any) => !Number.isNaN(Number(val));

const numberMap: { [k: string]: string } = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const convertToNumber = (items: string[]) => {
  const firstItem = items[0];
  const lastItem = items[items.length - 1];

  const first = checkForValidNumber(firstItem)
    ? firstItem
    : numberMap[firstItem];

  const last = checkForValidNumber(lastItem) ? lastItem : numberMap[lastItem];

  return Number(`${first}${last}`);
};
export const getStringValueExercise1 = (data: string) => {
  const regex = new RegExp(/(\d)/g);

  const items = [...data.matchAll(regex)].map((item) => item[0]);

  return convertToNumber(items);
};

export const getStringValueExercise2 = (data: string) => {
  const parsedData = data.replace(
    /(one|two|three|four|five|six|seven|eight|nine)/g,
    (match) => match + match.substring(match.length - 1, match.length)
  );
  const regex = new RegExp(
    /(\d|one|two|three|four|five|six|seven|eight|nine)/g
  );
  const items = [...parsedData.matchAll(regex)].map((item) => item[0]);

  return convertToNumber(items);
};

export const day1 = (data: string, exercise2?: boolean) => {
  const text = data.split("\n");
  const values = text
    .map((item) =>
      exercise2 ? getStringValueExercise2(item) : getStringValueExercise1(item)
    )
    .filter(checkForValidNumber);

  return values.reduce((acc, curr) => acc + curr, 0);
};
