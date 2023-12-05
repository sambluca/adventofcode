import { checkForValidNumber } from "../utils";

interface Card {
  winningNumbers: number[];
  chosenNumbers: number[];
  copies: number;
}

export const parseNumbers = (text: string) =>
  text.split(" ").filter(checkForValidNumber).map(Number);
export const splitNumbers = (text: string) => text.split("|");
export const stripCard = (text: string) => text.replace(/(Card \d: )/g, "");
export const parseData = (text: string): Card[] =>
  text
    .split(/\n/g)
    .map(stripCard)
    .map(splitNumbers)
    .map((card) => {
      const [winningNumbers, chosenNumbers] = card.map(parseNumbers);

      return {
        winningNumbers,
        chosenNumbers,
        copies: 1,
      };
    });

export const getCardMatches = ({ chosenNumbers, winningNumbers }: Card) =>
  chosenNumbers.reduce(
    (acc, num) => (winningNumbers.includes(num) ? (acc += 1) : acc),
    0
  );

export const getCardPoints = (card: Card) => {
  const matches = getCardMatches(card);

  return matches ? Math.pow(2, matches - 1) : 0;
};
export const exercise1 = (text: string) =>
  parseData(text)
    .map(getCardPoints)
    .reduce((acc, num) => acc + num, 0);

export const exercise2 = (text: string) => {
  const cards = parseData(text);

  cards.forEach((card, i) => {
    const matches = getCardMatches(card);

    [...Array(matches).keys()].forEach((_, index) => {
      const cardToChange = index + i + 1;
      const copies =
        cardToChange >= cards.length ? 0 : cards[cardToChange].copies;
      const copiesToAdd = copies + card.copies;

      if (copies !== 0) cards[cardToChange].copies = copiesToAdd;
    });
  });

  return cards.reduce((acc, card) => acc + card.copies, 0);
};
