import { readFileSync } from 'fs';
import { findLCM } from './utils';

const input = readFileSync('./inputs/day8.txt', 'utf8');
const lines = input.split('\n');
const instructions = lines[0].split('');
const nodes = new Map<string, [string, string]>(
  lines.slice(2).map(line => {
    const vals = Array.from(line.matchAll(/[A-Z0-9]{3}/g)).map(x => x[0]);
    return [vals[0], [vals[1], vals[2]]];
  })
);
function* instructionGeneratorFn() {
  let i = 0;
  while (true) {
    yield instructions[i];
    i++;
    if (i === instructions.length) {
      i = 0;
    }
  }
}
{
  const instructionGenerator = instructionGeneratorFn();
  let numberOfSteps = 0;
  let currentPlace = 'AAA';
  while (currentPlace !== 'ZZZ') {
    const instruction = instructionGenerator.next().value;
    currentPlace = String(
      nodes.get(currentPlace)?.[instruction === 'L' ? 0 : 1]
    );
    numberOfSteps++;
  }
  console.log(`Part 1 answer: ${numberOfSteps}`);
}

{
  const instructionGenerator = instructionGeneratorFn();
  const currentPlaces = new Map(
    [...nodes.keys()]
      .filter(node => node[2] === 'A')
      .map((node, i) => [i, node])
  );
  const placeResults: number[] = [];
  for (let i = 0; i < currentPlaces.size; i++) {
    let currentPlace = String(currentPlaces.get(i));
    let numberOfSteps = 0;
    while (currentPlace[2] !== 'Z') {
      const instruction = instructionGenerator.next().value;
      currentPlace = String(
        nodes.get(currentPlace)?.[instruction === 'L' ? 0 : 1]
      );
      numberOfSteps++;
    }
    placeResults.push(Number(numberOfSteps));
  }
  console.log(`Part 2 answer: ${findLCM(placeResults)}`);
}
