import { Arr } from "../utils/Array";

const numberCards = ["T", "9", "8", "7", "6", "5", "4", "3", "2", "1"];
const pictureCards = ["A", "K", "Q"];
const getCardRanking = (part: number) =>
  part === 1
    ? [...pictureCards, "J", ...numberCards]
    : [...pictureCards, ...numberCards, "J"];

export const parse = (text: string) =>
  text.split(/\n/).reduce((acc, line) => {
    const data = line.split(" ");
    const hand = data[0];
    const value = Number(data[1]);
    acc[hand] = value;
    return acc;
  }, {});

export const scoreHand = (hand: string, joker?: boolean) => {
  if (hand === "JJJJJ" && joker) return 50;
  const cards = new Arr(hand.split(""));
  const groupedValues = cards.instances;
  let jokers = 0;
  if (joker && groupedValues.J) {
    jokers = groupedValues.J;
    delete groupedValues.J;
  }

  const [first = 0, second = 0] = Object.values(groupedValues).sort(
    (a, b) => b - a
  );

  const score = Number(`${first + jokers}${second}`);

  return score;
};

export const scoreHands = (hands: string[], joker?: boolean) =>
  hands.reduce((acc, hand) => {
    return [
      ...acc,
      {
        hand,
        score: scoreHand(hand, joker),
      },
    ];
  }, []);

export const sortHands = (
  hands: { hand: string; score: number }[],
  cardRank = getCardRanking(1)
) =>
  hands
    .sort(({ hand: handA, score: scoreA }, { hand: handB, score: scoreB }) => {
      if (scoreA !== scoreB) return scoreB - scoreA;
      const handAChars = handA.split("");
      const handBChars = handB.split("");

      for (let i = 0; i < handAChars.length; i++) {
        if (handAChars[i] !== handBChars[i]) {
          return (
            cardRank.indexOf(handAChars[i]) - cardRank.indexOf(handBChars[i])
          );
        }
      }
      return 0;
    })
    .reduce((acc, { hand }) => [...acc, hand], []);

export const exercise1 = (text: string) => {
  const data = parse(text);
  const handScores = scoreHands(Object.keys(data));
  const sortedHands = sortHands(handScores).reverse();

  return sortedHands.reduce((acc, curr, i) => {
    const rank = i + 1;
    const value = data[curr];

    return acc + rank * value;
  }, 0);
};

export const exercise2 = (text: string) => {
  const data = parse(text);
  const cardRank = getCardRanking(2);
  const handScores = scoreHands(Object.keys(data), true);
  const sortedHands = sortHands(handScores, cardRank).reverse();

  return sortedHands.reduce((acc, curr, i) => {
    const rank = i + 1;
    const value = data[curr];

    return acc + rank * value;
  }, 0);
};
