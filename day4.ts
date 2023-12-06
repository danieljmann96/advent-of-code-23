import { readFileSync } from 'fs';
import intersection from 'lodash/intersection';

const input = readFileSync('./inputs/day4.txt', 'utf8');
const lines = input.split('\n');

const getNumbers = (input: string) =>
  Array.from(input.matchAll(/[0-9]{1,}/g)).map(x => x[0]);

{
  let totalPoints = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const [winning, my] = line.split(': ')[1].split(' | ');
    const winningNumbers = getNumbers(winning);
    const myNumbers = getNumbers(my);
    const commonNumbers = intersection(winningNumbers, myNumbers);
    if (commonNumbers.length > 0) {
      const score = Math.pow(2, commonNumbers.length - 1);
      totalPoints += score;
    }
  }
  console.log(`Part 1 answer: ${totalPoints}`);
}

{
  const numberOfInstances = new Map<number, number>(
    [...Array(lines.length).keys()].map(x => [x, 1])
  );
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const [winning, my] = line.split(': ')[1].split(' | ');
    const winningNumbers = getNumbers(winning);
    const myNumbers = getNumbers(my);
    const { length: score } = intersection(winningNumbers, myNumbers);
    const instances = Number(numberOfInstances.get(i));
    for (let j = 0; j < score; j++) {
      const keyToSet = i + j + 1;
      numberOfInstances.set(
        keyToSet,
        Number(numberOfInstances.get(keyToSet)) + instances
      );
    }
  }
  const totalNumberOfCards = [...numberOfInstances.values()].reduce(
    (a, b) => a + b,
    0
  );
  console.log(`Part 2 answer: ${totalNumberOfCards}`);
}
