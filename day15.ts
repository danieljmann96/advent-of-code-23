import { readFileSync } from 'fs';

const initialInput = readFileSync('./inputs/day15.txt', 'utf8');
const inputs = initialInput.split(',');

const hashCache = new Map<string, number>();
const runHash = (input: string) => {
  const fromCache = hashCache.get(input);
  if (fromCache) {
    return fromCache;
  }
  let currentTotal = 0;
  for (let j = 0; j < input.length; j++) {
    const char = input[j];
    currentTotal += char.charCodeAt(0);
    currentTotal *= 17;
    currentTotal %= 256;
  }
  hashCache.set(input, currentTotal);
  return currentTotal;
};

{
  let total = 0;
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    const currentTotal = runHash(input);
    total += currentTotal;
  }
  console.log(`Part 1 answer: ${total}`);
}

{
  const boxes = new Map<number, Map<string, number>>();
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    if (input.includes('=')) {
      const [label, focal] = input.split('=');
      const boxNumber = runHash(label);
      const box = boxes.get(boxNumber) ?? new Map<string, number>();
      box.set(label, Number(focal));
      boxes.set(boxNumber, box);
    } else if (input.includes('-')) {
      const label = input.split('-')[0];
      const boxNumber = runHash(label);
      const box = boxes.get(boxNumber);
      if (box) {
        box.delete(label);
      }
    }
  }
  let totalScore = 0;
  for (let i = 0; i <= Math.max(...boxes.keys()); i++) {
    const box = boxes.get(i);
    if (box && box.size > 0) {
      [...box.entries()].forEach(([, focal], slotNo) => {
        const score = (i + 1) * (slotNo + 1) * focal;
        totalScore += score;
      });
    }
  }
  console.log(`Part 2 answer: ${totalScore}`);
}
