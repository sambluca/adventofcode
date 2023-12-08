import { findGcd, findLcm } from ".";
import { deepEqual, isObject } from "./Object";

export class Arr extends Array {
  constructor(arr: any[]) {
    super(...arr);
  }

  static get [Symbol.species]() {
    return Array;
  }

  // returns only unique items from array
  get unique() {
    return [...new Set(this)];
  }

  // returns the values that appear the highest number of times in the array
  get mostCommon() {
    const count = this.getInstances();
    const highestValue = Math.max(...Object.values(count));

    return Object.keys(count).reduce((acc, id) => {
      if (count[id] === highestValue) acc.push(id);
      return acc;
    }, []);
  }

  // Counts the number of times an item appears in the array
  get instances() {
    return this.getInstances();
  }

  // Finds the greatest common divisor between the numbers
  get gcd() {
    const allNumbers = this.every(function (element) {
      return typeof element === "number";
    });

    if (!allNumbers) {
      throw new Error("Can only find GCD if all values are numbers");
    }

    return this.reduce((acc, curr) => {
      const result = findGcd(curr, acc);
      if (result == 1) {
        return 1;
      }

      return result;
    }, this[0]);
  }

  // Finds the lowest common multiple between the numbers
  get lcm() {
    const allNumbers = this.every(function (element) {
      return typeof element === "number";
    });

    if (!allNumbers) {
      throw new Error("Can only find LCM if all values are numbers");
    }

    return this.reduce(findLcm);
  }
  getInstances(): { [key: string]: number } {
    return this.reduce((acc, curr) => {
      const key = !isObject(curr) ? curr : JSON.stringify(curr);
      if (!acc[key]) acc[key] = 0;

      acc[key] += 1;

      return acc;
    }, {});
  }

  // shallow search for item in array
  contains(search: any) {
    return this.includes(search);
  }

  // deep compares all items in array, returns items that appear in both
  compare(compArr: Arr) {
    const shared = [];
    compArr.forEach((compItem) => {
      const isCompItemObj = isObject(compItem);
      this.forEach((item) => {
        if (isObject(item) && isCompItemObj && deepEqual(item, compItem))
          shared.push(compItem);
      });

      if (this.includes(compItem)) shared.push(compItem);
    });

    return new Arr(shared);
  }

  // add to exisiting Array function so it will return an Arr type
  map(...args) {
    return new Arr([...super.map.apply(this, args)]);
  }

  filter(...args) {
    return new Arr([...super.filter.apply(this, args)]);
  }

  flat(...args) {
    return new Arr([...super.flat.apply(this, args)]);
  }
}
