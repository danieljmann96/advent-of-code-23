import { readFileSync } from 'fs';

const input = readFileSync('./inputs/day9.txt', 'utf8');
const lines = input.split('\n');

const performSequences = (inputs: number[][]) => {
  let sumOfValues = 0;
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    const sequences = [input];
    let j = 0;
    while (new Set(sequences.at(-1)).size !== 1) {
      const sequenceToUse = sequences[j];
      const newSequence: number[] = [];
      for (let k = 1; k < sequenceToUse.length; k++) {
        newSequence.push(sequenceToUse[k] - sequenceToUse[k - 1]);
      }
      sequences.push(newSequence);
      j++;
    }
    sequences.reverse();
    sequences[0].push(sequences[0][0]);
    for (let k = 1; k < sequences.length; k++) {
      sequences[k].push(
        Number(sequences[k].at(-1)) + Number(sequences[k - 1].at(-1))
      );
    }
    sumOfValues += Number(sequences.at(-1)?.at(-1));
  }
  return sumOfValues;
};

{
  const inputs = lines.map(line => line.split(' ').map(Number));
  console.log(`Part 1 answer: ${performSequences(inputs)}`);
}

{
  const inputs = lines.map(line => line.split(' ').toReversed().map(Number));
  console.log(`Part 2 answer: ${performSequences(inputs)}`);
}
