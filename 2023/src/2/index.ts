type gameBag = {
  blue: number;
  red: number;
  green: number;
};

const bag: gameBag = {
  red: 12,
  green: 13,
  blue: 14,
};

export const checkIsPossible = (game: gameBag): boolean =>
  Object.keys(bag).reduce(
    (acc, cur) =>
      !acc
        ? false
        : game[cur as keyof typeof bag] <= bag[cur as keyof typeof bag],
    true
  );

export const convertGameToMax = (game: string): gameBag =>
  game
    .split(";")
    .map((pull) => pull.replace(/ /g, "").split(","))
    .reduce(
      (acc, cur) => {
        cur.forEach((item) => {
          const [number, colour] = item
            .split(/(\d+)/)
            .filter((i) => i !== "") as [string, keyof typeof acc];

          if (Number(number) > acc[colour]) acc[colour] = Number(number);
        });

        return acc;
      },
      {
        blue: 0,
        red: 0,
        green: 0,
      }
    );

export const getPower = (game: gameBag) =>
  Object.values(game).reduce((acc, cur) => acc * cur, 1);

export const convertToGames = (data: string) =>
  data
    .split("\n")
    .map((game) => game.split(/(Game \d+:)/))
    .reduce((acc: { [key: string]: string }, game) => {
      const [gameNum, gameData] = game.filter((i) => i !== "");
      const gameId = gameNum
        .replace("Game", "")
        .replace(":", "")
        .replace(/ /g, "");

      acc[gameId] = gameData;
      return acc;
    }, {});

export const exercise1 = (data: string) =>
  Object.keys(convertToGames(data)).reduce((acc, id) => {
    const gameData = convertGameToMax(convertToGames(data)[id]);
    const isPossible = checkIsPossible(gameData);
    return isPossible ? acc + Number(id) : acc;
  }, 0);

export const exercise2 = (data: string) =>
  Object.keys(convertToGames(data)).reduce((acc, id) => {
    const gameData = convertGameToMax(convertToGames(data)[id]);
    const power = getPower(gameData);

    return acc + power;
  }, 0);
