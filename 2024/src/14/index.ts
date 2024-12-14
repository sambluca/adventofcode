import { makePositive } from "../utils";
import { Coord, Grid } from "../utils/Grid";
const fs = require("fs");

export const parse = (text: string) => {
  const split = text.split(/\n/);

  return split.map((i) => {
    const [pos, vel] = i.split(" ");
    const p = pos.replace("p=", "").split(",").map(Number) as Coord;
    const v = vel.replace("v=", "").split(",").map(Number) as Coord;

    return {
      pos: p,
      vel: v,
    };
  });
};

// for mock data
// const width = 11;
// const height = 7;

// for real data
const width = 101;
const height = 103;

const h = height - 1;
const w = width - 1;
const halfH = h / 2;
const halfW = w / 2;

const changePos = (item: { pos: Coord; vel: Coord }, grid: Grid<any>) => {
  const [pX, pY] = item.pos;
  const [vX, vY] = item.vel;
  const pos = [pX + vX, pY + vY] as Coord;

  if (!grid.getInBounds(pos)) {
    const [posX, posY] = pos;
    let newX = posX;
    let newY = posY;

    if (posX < 0) {
      newX = width - makePositive(posX);
    }

    if (posX > w) {
      newX = posX - width;
    }

    if (posY < 0) {
      newY = height - makePositive(posY);
    }

    if (posY > h) {
      newY = posY - height;
    }

    const newPos = [newX, newY] as Coord;
    return { pos: newPos, vel: item.vel };
  }
  return { pos, vel: item.vel };
};

const getQuad = ([x, y]: Coord): 1 | 2 | 3 | 4 => {
  if (x < halfW && y < halfH) return 1;
  if (x > halfW && y < halfH) return 2;
  if (x < halfW && y > halfH) return 3;
  return 4;
};
export const exercise = (text: string) => {
  let data = parse(text);

  const grid = new Grid(
    Array.from(Array(height), () => new Array(width).fill("⬛️"))
  );

  for (let i = 1; i <= 10000; i++) {
    data = data.map((i) => changePos(i, grid));

    const ngrid = new Grid(
      Array.from(Array(height), () => new Array(width).fill("⬛️"))
    );

    let save = true;

    data.forEach((item) => {
      const {
        pos: [posX, posY],
      } = item;
      const value = ngrid.getValue([posX, posY]);
      ngrid.grid[posY][posX] = typeof value === "number" ? value + 1 : 1;
      const newV = ngrid.getValue([posX, posY]);

      if (save) {
        save = typeof newV === "number" ? newV === 1 : true;
      }
    });

    // console.log(i, save);

    if (save) {
      data.forEach((item) => {
        const {
          pos: [posX, posY],
        } = item;
        ngrid.grid[posY][posX] = "🟩";
      });

      fs.writeFile(
        `/Users/gianluca.tramontana/personal/adventofcode/2024/src/14/trees/${i}.txt`,
        ngrid.grid.map((i) => i.join("")).join("\n"),
        function (err) {
          if (err) {
            return console.log(err);
          }
          console.log("The file was saved!");
        }
      );
    }
  }

  const quadrants = { 1: 0, 2: 0, 3: 0, 4: 0 };

  data.forEach((item) => {
    const {
      pos: [posX, posY],
    } = item;

    if (posX === halfW || posY === halfH) return;

    const quadrant = getQuad([posX, posY]);

    const value = quadrants[quadrant];
    quadrants[quadrant] = value + 1;
  });

  return Object.values(quadrants).reduce((acc: number, item) => acc * item, 1);
};
