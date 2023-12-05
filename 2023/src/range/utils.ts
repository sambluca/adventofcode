import { IRange } from "../types";

export const inRange = (number: number, range: IRange) =>
  number >= range.start && number <= range.end;

export const intersects = (firstRange: IRange, secondRange: IRange) =>
  inRange(secondRange.start, firstRange) ||
  inRange(secondRange.end, firstRange) ||
  inRange(firstRange.start, secondRange) ||
  inRange(firstRange.end, secondRange);

export const findIntersectionRange = (
  firstRange: IRange,
  secondRange: IRange
): IRange => ({
  start: Math.max(firstRange.start, secondRange.start),
  end: Math.max(firstRange.end, secondRange.end),
});

export const cut = (firstRange: IRange, secondRange: IRange) => {
  if (!intersects(firstRange, secondRange)) return [firstRange];
  const result: IRange[] = [];
  if (firstRange.start < secondRange.start) {
    result.push({
      start: firstRange.start,
      end: secondRange.start - 1,
    });
  }
  if (firstRange.end > secondRange.end) {
    result.push({
      start: secondRange.end + 1,
      end: firstRange.end,
    });
  }
  return result;
};

export const createRange = ({
  start,
  rangeEnd,
  rangeLength,
  offset,
}: {
  start: number;
  rangeEnd?: number;
  rangeLength?: number;
  offset?: number;
}): IRange => ({
  start,
  end: rangeEnd || start - 1 + rangeLength,
  offset,
});
