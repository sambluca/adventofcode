export class ArrayUtils {
  arr: any[];

  constructor(arr: any[]) {
    this.arr = arr;
  }

  get og() {
    return this.arr;
  }
  get length() {
    return this.arr.length;
  }

  get unique() {
    return [...new Set(this.arr)];
  }

  get mostCommon() {
    const count = this.countValues();
    const highestValue = Math.max(...Object.values(count));

    return Object.keys(count).reduce((acc, id) => {
      if (count[id] === highestValue) acc.push(id);
      return acc;
    }, []);
  }

  countValues(options?: { wildCard: any }): { [key: string]: number } {
    const values = this.arr.reduce((acc, curr) => {
      if (!acc[curr]) acc[curr] = 0;

      acc[curr] += 1;

      return acc;
    }, {});

    const wildCardCount = options?.wildCard ? values[options.wildCard] : 0;

    return !options?.wildCard
      ? values
      : Object.keys(values).reduce((acc, curr) => {
          if (curr === options.wildCard) return acc;
          acc[curr] = values[curr] + wildCardCount;
          return acc;
        }, {});
  }

  contains(search: any) {
    return this.arr.includes(search);
  }
}
