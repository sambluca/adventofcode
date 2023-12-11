import { Arr } from "../utils";

export const parse = (text: string, dis = 1): [number, number][] => {
  const galaxyDis = dis === 1 ? dis : dis - 1;
  const data = text.split(/\n/).map((i) => i.split(""));

  const ogColLength = data[0].length - 1;
  const emptyRows = data.reduce((acc: number[], curr, i) => {
    if (!curr.includes("#")) acc.push(i);

    return acc;
  }, []);

  const galaxies = data.reduce((acc: [number, number][], curr, yI) => {
    curr
      .reduce((acc: number[], curr, xI) => {
        if (curr === "#") acc.push(xI);

        return acc;
      }, [])
      .forEach((xI) => {
        acc.push([xI, yI]);
      });

    return acc;
  }, []);

  const fullColumns = new Arr(
    galaxies.reduce((acc, curr) => [...acc, curr[0]], [])
  ).unique.sort((a, b) => a - b);

  const emptyColumns = [];
  for (let i = 0; i <= ogColLength; i++) {
    if (!fullColumns.includes(i)) emptyColumns.push(i);
  }

  return galaxies.map((galaxyCoord) => {
    const xDisplacement = emptyColumns.reduce((acc, curr) => {
      if (curr < galaxyCoord[0]) {
        return acc + galaxyDis;
      }

      return acc;
    }, 0);
    const yDisplacement = emptyRows.reduce((acc, curr) => {
      if (curr < galaxyCoord[1]) {
        return acc + galaxyDis;
      }

      return acc;
    }, 0);

    return [galaxyCoord[0] + xDisplacement, galaxyCoord[1] + yDisplacement];
  });
};

export const getShortestPath = (
  cordsA: [number, number],
  cordsB: [number, number]
) => {
  const xDisplacement = Math.abs(cordsB[0] - cordsA[0]);
  const yDisplacement = Math.abs(cordsB[1] - cordsA[1]);

  return xDisplacement + yDisplacement;
};

export const exercise1 = (text: string) => {
  const data = parse(text);

  return data.reduce((acc, curr, i) => {
    for (let a = i + 1; a < data.length; a++) {
      acc = acc + getShortestPath(curr, data[a]);
    }

    return acc;
  }, 0);
};

export const exercise2 = (text: string, dis: number) => {
  const data = parse(text, dis);

  return data.reduce((acc, curr, i) => {
    for (let a = i + 1; a < data.length; a++) {
      acc = acc + getShortestPath(curr, data[a]);
    }

    return acc;
  }, 0);
};
