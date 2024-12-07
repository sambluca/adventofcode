export const parse = (text: string) =>
  text.split(/\n/).map((line) => {
    const [testValue, values] = line.split(": ");

    return {
      testValue: Number(testValue),
      values: values.split(" ").map(Number),
    };
  });

export const checkValid = (
  vs: number[],
  testValues: number[],
  part2?: boolean
) => {
  if (vs.length === 1) {
    return testValues.includes(vs[0]);
  }

  const values = [...vs];
  const value = values.pop();

  const subtractValues = testValues
    .map((a) => a - value)
    .filter((v) => Number.isInteger(v));
  const divisionValues = testValues
    .map((a) => a / value)
    .filter((v) => Number.isInteger(v));
  const joinedValues = testValues
    .map((a) =>
      (a + "").endsWith(`${value}`)
        ? (a + "").slice(0, -(value + "").length)
        : ""
    )
    .map(Number);

  return checkValid(
    values,
    [...subtractValues, ...divisionValues, ...(part2 ? joinedValues : [])],
    part2
  );
};

export const exercise1 = (text: string) =>
  parse(text).reduce(
    (acc, item) =>
      checkValid(item.values, [item.testValue]) ? acc + item.testValue : acc,
    0
  );

export const exercise2 = (text: string) =>
  parse(text).reduce(
    (acc, item) =>
      checkValid(item.values, [item.testValue], true)
        ? acc + item.testValue
        : acc,
    0
  );
