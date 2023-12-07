import { deepEqual, isObject } from "./Object";

export class Arr extends Array {
  constructor(arr: any[]) {
    super(...arr);
  }

  static get [Symbol.species]() {
    return Array;
  }

  get unique() {
    return [...new Set(this)];
  }

  get mostCommon() {
    const count = this.getInstances();
    const highestValue = Math.max(...Object.values(count));

    return Object.keys(count).reduce((acc, id) => {
      if (count[id] === highestValue) acc.push(id);
      return acc;
    }, []);
  }

  get instances() {
    return this.getInstances();
  }

  getInstances(): { [key: string]: number } {
    return this.reduce((acc, curr) => {
      if (!acc[curr]) acc[curr] = 0;

      acc[curr] += 1;

      return acc;
    }, {});
  }

  contains(search: any) {
    return this.includes(search);
  }

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
