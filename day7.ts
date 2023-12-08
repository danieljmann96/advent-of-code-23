import { readFileSync } from 'fs';

const input = readFileSync('./inputs/day7.txt', 'utf8');
const lines = input.split('\n');
const CARD_LENGTH = 5;

const isFive = (input: string[]) => new Set(input).size === 1;
const isFour = (input: string[]) => {
  const uniques = [...new Set(input)];
  if (uniques.length !== 2) {
    return false;
  }
  return (
    input.filter(x => x === uniques[0]).length === 1 ||
    input.filter(x => x === uniques[1]).length === 1
  );
};
const isFullHouse = (input: string[]) => {
  const uniques = [...new Set(input)];
  if (uniques.length !== 2) {
    return false;
  }
  return (
    input.filter(x => x === uniques[0]).length === 2 ||
    input.filter(x => x === uniques[1]).length === 2
  );
};
const isThree = (input: string[]) => {
  const uniques = [...new Set(input)];
  if (uniques.length !== 3) {
    return false;
  }
  return (
    input.filter(x => x === uniques[0]).length === 3 ||
    input.filter(x => x === uniques[1]).length === 3 ||
    input.filter(x => x === uniques[2]).length === 3
  );
};
const isTwo = (input: string[]) => {
  const uniques = [...new Set(input)];
  if (uniques.length !== 3) {
    return false;
  }
  return (
    input.filter(x => x === uniques[0]).length === 1 ||
    input.filter(x => x === uniques[1]).length === 1 ||
    input.filter(x => x === uniques[2]).length === 1
  );
};
const isOne = (input: string[]) => {
  const uniques = [...new Set(input)];
  if (uniques.length !== 4) {
    return false;
  }
  return (
    input.filter(x => x === uniques[0]).length === 2 ||
    input.filter(x => x === uniques[1]).length === 2 ||
    input.filter(x => x === uniques[2]).length === 2 ||
    input.filter(x => x === uniques[3]).length === 2
  );
};
interface Card {
  cardValue: string[];
  bid: number;
}
const sortCards = (a: Card, b: Card, sortOrder: string[]) => {
  for (let i = 0; i < CARD_LENGTH; i++) {
    const val =
      sortOrder.indexOf(a.cardValue[i]) - sortOrder.indexOf(b.cardValue[i]);
    if (val !== 0) return val;
  }
  return 0;
};

{
  const sortOrder = [
    'A',
    'K',
    'Q',
    'J',
    'T',
    '9',
    '8',
    '7',
    '6',
    '5',
    '4',
    '3',
    '2'
  ];
  const fives: Card[] = [];
  const fours: Card[] = [];
  const fullHouses: Card[] = [];
  const threes: Card[] = [];
  const twos: Card[] = [];
  const ones: Card[] = [];
  const highs: Card[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].split(' ');
    const card = line[0].split('');
    const bid = Number(line[1]);
    if (isFive(card)) {
      fives.push({ cardValue: card, bid });
    } else if (isFour(card)) {
      fours.push({ cardValue: card, bid });
    } else if (isFullHouse(card)) {
      fullHouses.push({ cardValue: card, bid });
    } else if (isThree(card)) {
      threes.push({ cardValue: card, bid });
    } else if (isTwo(card)) {
      twos.push({ cardValue: card, bid });
    } else if (isOne(card)) {
      ones.push({ cardValue: card, bid });
    } else {
      highs.push({ cardValue: card, bid });
    }
  }
  const answer = [
    ...fives.sort((a, b) => sortCards(a, b, sortOrder)),
    ...fours.sort((a, b) => sortCards(a, b, sortOrder)),
    ...fullHouses.sort((a, b) => sortCards(a, b, sortOrder)),
    ...threes.sort((a, b) => sortCards(a, b, sortOrder)),
    ...twos.sort((a, b) => sortCards(a, b, sortOrder)),
    ...ones.sort((a, b) => sortCards(a, b, sortOrder)),
    ...highs.sort((a, b) => sortCards(a, b, sortOrder))
  ]
    .toReversed()
    .reduce((a, b, i) => a + b.bid * (i + 1), 0);
  console.log(`Part 1 answer: ${answer}`);
}

{
  const sortOrder = [
    'A',
    'K',
    'Q',
    'T',
    '9',
    '8',
    '7',
    '6',
    '5',
    '4',
    '3',
    '2',
    'J'
  ];
  const fives: Card[] = [];
  const fours: Card[] = [];
  const fullHouses: Card[] = [];
  const threes: Card[] = [];
  const twos: Card[] = [];
  const ones: Card[] = [];
  const highs: Card[] = [];
  const rankValues = new Map([
    [0, 'highs'],
    [1, 'ones'],
    [2, 'twos'],
    [3, 'threes'],
    [4, 'fullHouses'],
    [5, 'fours'],
    [6, 'fives']
  ]);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].split(' ');
    const card = line[0].split('');
    const bid = Number(line[1]);
    if (card.includes('J')) {
      const uniquesWithoutJ = [...new Set(card)];
      const ranks: number[] = [];
      uniquesWithoutJ.forEach(value => {
        const cardToTry = card.map(x => (x === 'J' ? value : x));
        if (isFive(cardToTry)) {
          ranks.push(6);
        } else if (isFour(cardToTry)) {
          ranks.push(5);
        } else if (isFullHouse(cardToTry)) {
          ranks.push(4);
        } else if (isThree(cardToTry)) {
          ranks.push(3);
        } else if (isTwo(cardToTry)) {
          ranks.push(2);
        } else if (isOne(cardToTry)) {
          ranks.push(1);
        } else {
          ranks.push(0);
        }
      });
      const maxRank = Math.max(...ranks);
      switch (rankValues.get(maxRank)) {
        case 'highs':
          highs.push({ cardValue: card, bid });
          break;
        case 'ones':
          ones.push({ cardValue: card, bid });
          break;
        case 'twos':
          twos.push({ cardValue: card, bid });
          break;
        case 'threes':
          threes.push({ cardValue: card, bid });
          break;
        case 'fullHouses':
          fullHouses.push({ cardValue: card, bid });
          break;
        case 'fours':
          fours.push({ cardValue: card, bid });
          break;
        case 'fives':
          fives.push({ cardValue: card, bid });
          break;
      }
    } else {
      if (isFive(card)) {
        fives.push({ cardValue: card, bid });
      } else if (isFour(card)) {
        fours.push({ cardValue: card, bid });
      } else if (isFullHouse(card)) {
        fullHouses.push({ cardValue: card, bid });
      } else if (isThree(card)) {
        threes.push({ cardValue: card, bid });
      } else if (isTwo(card)) {
        twos.push({ cardValue: card, bid });
      } else if (isOne(card)) {
        ones.push({ cardValue: card, bid });
      } else {
        highs.push({ cardValue: card, bid });
      }
    }
  }
  const answer = [
    ...fives.sort((a, b) => sortCards(a, b, sortOrder)),
    ...fours.sort((a, b) => sortCards(a, b, sortOrder)),
    ...fullHouses.sort((a, b) => sortCards(a, b, sortOrder)),
    ...threes.sort((a, b) => sortCards(a, b, sortOrder)),
    ...twos.sort((a, b) => sortCards(a, b, sortOrder)),
    ...ones.sort((a, b) => sortCards(a, b, sortOrder)),
    ...highs.sort((a, b) => sortCards(a, b, sortOrder))
  ]
    .toReversed()
    .reduce((a, b, i) => a + b.bid * (i + 1), 0);
  console.log(`Part 2 answer: ${answer}`);
}
