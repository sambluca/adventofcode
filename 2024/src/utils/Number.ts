import { Arr } from ".";

export const isNumber = (val: any) => val && !Number.isNaN(Number(val));

export const between = (x: number, min: number, max: number) =>
  x >= min && x <= max;

export const isOdd = (x: number) => !!(x % 2);

// find greatest common divisor
export const findGcd = (a, b) => {
  if (a == 0) return b;
  return findGcd(b % a, a);
};

// find lowest common multiplier between two numbers
export const findLcm = (a, b) => (a * b) / findGcd(a, b);

// returns array of diffs between numbers which is used to extrapolate
export const findDiffs = (numbers: number[]) => {
  const diffs = [];
  numbers.forEach((num, i) => {
    if (i !== numbers.length - 1) {
      const diff = numbers[i + 1] - num;
      diffs.push(diff);
    }
  });

  return diffs;
};

// returns next item in sequence
export const extrapolate = (numbers: number[]) => {
  const history = new Arr([numbers]);
  let diffs = new Arr([]);

  while (true) {
    if (
      Object.keys(diffs.instances).length === 1 &&
      Object.keys(diffs.instances)[0] === "0"
    ) {
      break;
    }

    const diff = findDiffs(history[history.length - 1]);
    history.push(diff);
    diffs = new Arr(diff);
  }

  return history.reverse().reduce((acc, curr) => {
    return acc + curr[curr.length - 1];
  }, 0);
};

// Shoelace formula -- https://www.101computing.net/the-shoelace-algorithm
// The shoelace formula is a mathematical algorithm to determine the area of a simple polygon whose vertices are described by their Cartesian coordinates in the plane.
// Area = (Xa * Yb) + (Xb * Yc) + (Xc * Ya)
export const shoelace = (nums: Array<[number, number]>) =>
  Math.abs(
    nums.reduce((acc, curr, i) => {
      const [lastX, lastY] = curr;
      const [nextX, nextY] = nums[i + 1] || nums[0];

      return acc + lastX * nextY - nextX * lastY;
    }, 0) * 0.5
  );

// Picks theorom -- https://artofproblemsolving.com/wiki/index.php/Pick%27s_Theorem
// Pick's Theorem expresses the area of a polygon, all of whose vertices are lattice points in a coordinate plane, in terms of the number of lattice points inside the polygon and the number of lattice points on the sides of the polygon
// Area = InteriorPoints + \ 0.5BoundaryPoints - 1
// This Area can be calculated using the shoe lace formula
// returns whatever forumla variable is missing
export const picksTheorom = ({
  area,
  boundaryPoints,
  interiorPoints,
}: {
  area?: number;
  boundaryPoints?: number;
  interiorPoints?: number;
}) => {
  if (!interiorPoints) return Math.abs(area + 1 - 0.5 * boundaryPoints);
  if (!area) return Math.abs(interiorPoints + 0.5 * boundaryPoints - 1);

  return Math.abs((area + 1 - interiorPoints) * 2);
};

// gets diff between two numbers regardless of which is larger
export const getDiff = (item1: number, item2: number) => {
  if (item1 === item2) return 0;
  if (item1 > item2) return item1 - item2;

  return item2 - item1;
};

export const makePositive = (item: number) => Math.abs(item);
export const makeNegative = (item: number) => Math.abs(item) * -1;
