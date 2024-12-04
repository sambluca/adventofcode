import { Arr } from "../utils";

export const parse = (text: string) =>
  text.split(/\n/).map((line) => line.split(""));

// hate this implementation for part 1 but it works and i dont have time to go back and fix it
export const exercise1 = (text: string) => {
  const data = parse(text);

  let xmasCount = 0;
  data.forEach((line, lineIndex) => {
    line.forEach((char, charIndex) => {
      if (char === "X") {
        const upLine = data[lineIndex - 1];
        const downLine = data[lineIndex + 1];

        const upLeft = upLine ? upLine[charIndex - 1] : "";
        const up = upLine ? upLine[charIndex] : "";
        const upRight = upLine ? upLine[charIndex + 1] : "";
        const right = line[charIndex + 1];
        const left = line[charIndex - 1];
        const downLeft = downLine ? downLine[charIndex - 1] : "";
        const down = downLine ? downLine[charIndex] : "";
        const downRight = downLine ? downLine[charIndex + 1] : "";

        // up left
        if (upLeft === "M") {
          const twoUpLine = data[lineIndex - 2];
          const twoLeft = twoUpLine ? twoUpLine[charIndex - 2] : "";
          if (twoLeft === "A") {
            const threeUpLine = data[lineIndex - 3];
            const threeLeft = threeUpLine ? threeUpLine[charIndex - 3] : "";

            if (threeLeft === "S") {
              xmasCount += 1;
            }
          }
        }

        // up
        if (up === "M") {
          const twoUpLine = data[lineIndex - 2];
          const twoUp = twoUpLine ? twoUpLine[charIndex] : "";
          if (twoUp === "A") {
            const threeUpLine = data[lineIndex - 3];
            const threeUp = threeUpLine ? threeUpLine[charIndex] : "";

            if (threeUp === "S") {
              xmasCount += 1;
            }
          }
        }

        // up right
        if (upRight === "M") {
          const twoUpLine = data[lineIndex - 2];
          const twoUp = twoUpLine ? twoUpLine[charIndex + 2] : "";
          if (twoUp === "A") {
            const threeUpLine = data[lineIndex - 3];
            const threeUp = threeUpLine ? threeUpLine[charIndex + 3] : "";

            if (threeUp === "S") {
              xmasCount += 1;
            }
          }
        }

        // right
        if (right === "M") {
          const nextRight = line[charIndex + 2];
          if (nextRight === "A") {
            const threeRight = line[charIndex + 3];

            if (threeRight === "S") {
              xmasCount += 1;
            }
          }
        }

        // left
        if (left === "M") {
          const nextLeft = line[charIndex - 2];
          if (nextLeft === "A") {
            const threeLeft = line[charIndex - 3];

            if (threeLeft === "S") {
              xmasCount += 1;
            }
          }
        }

        // down left
        if (downLeft === "M") {
          const twoDownLine = data[lineIndex + 2];
          const twoLeft = twoDownLine ? twoDownLine[charIndex - 2] : "";
          if (twoLeft === "A") {
            const threeDownLine = data[lineIndex + 3];
            const threeLeft = threeDownLine ? threeDownLine[charIndex - 3] : "";

            if (threeLeft === "S") {
              xmasCount += 1;
            }
          }
        }

        // down
        if (down === "M") {
          const twoDownLine = data[lineIndex + 2];
          const twoDown = twoDownLine ? twoDownLine[charIndex] : "";
          if (twoDown === "A") {
            const threeDownLine = data[lineIndex + 3];
            const threeUp = threeDownLine ? threeDownLine[charIndex] : "";

            if (threeUp === "S") {
              xmasCount += 1;
            }
          }
        }

        // down right
        if (downRight === "M") {
          const twoUpLine = data[lineIndex + 2];
          const twoUp = twoUpLine ? twoUpLine[charIndex + 2] : "";
          if (twoUp === "A") {
            const threeUpLine = data[lineIndex + 3];
            const threeUp = threeUpLine ? threeUpLine[charIndex + 3] : "";

            if (threeUp === "S") {
              xmasCount += 1;
            }
          }
        }
      }
    });
  });

  return xmasCount;
};

export const exercise2 = (text: string) => {
  const data = parse(text);

  let xmasCount = 0;
  for (let [lineIndex, line] of data.entries()) {
    for (let [charIndex, char] of line.entries()) {
      if (char === "A") {
        const upLine = data[lineIndex - 1];
        const downLine = data[lineIndex + 1];

        if (!upLine || !downLine) continue;
        const topLeft = upLine[charIndex - 1];
        const downRight = downLine[charIndex + 1];

        const topRight = upLine[charIndex + 1];
        const downLeft = downLine[charIndex - 1];

        const leftToRight = new Arr([topLeft, downRight]).sort();
        const rightToLeft = new Arr([topRight, downLeft]).sort();

        const accepted = new Arr(["M", "S"]);

        if (leftToRight.equals(accepted) && rightToLeft.equals(accepted))
          xmasCount += 1;
      }
    }
  }

  return xmasCount;
};
