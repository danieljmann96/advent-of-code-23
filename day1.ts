import { readFileSync } from 'fs';
import {
  getAllMatchesWithOverlap,
  getFirstAndLastElementsOfArray
} from './utils';

const input = readFileSync('./inputs/day1.txt', 'utf8');
const values = input.split('\n');

{
  const output = values
    .map(value => [...value.matchAll(/[0-9]/g)].map(a => a[0]))
    .map(getFirstAndLastElementsOfArray)
    .map(digits => Number(digits.join('')))
    .reduce((a, b) => a + b, 0);

  console.log(`Part 1 answer: ${output}`);
}

{
  const numberMappings = new Map([
    ['one', 1],
    ['two', 2],
    ['three', 3],
    ['four', 4],
    ['five', 5],
    ['six', 6],
    ['seven', 7],
    ['eight', 8],
    ['nine', 9]
  ]);
  const output = values
    .map(value =>
      getAllMatchesWithOverlap(
        value,
        /[0-9]|one|two|three|four|five|six|seven|eight|nine/g
      )
    )
    .map(getFirstAndLastElementsOfArray)
    .map(digits =>
      digits.map(digit => numberMappings.get(String(digit)) ?? Number(digit))
    )
    .map(digits => Number(digits.join('')))
    .reduce((a, b) => a + b, 0);
  console.log(`Part 2 answer: ${output}`);
}
