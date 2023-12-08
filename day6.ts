import { readFileSync } from 'fs';

const input = readFileSync('./inputs/day6.txt', 'utf8');
const lines = input.split('\n');

const doRaces = (races: Map<number, { time: number; distance: number }>) => {
  let totalScore = 1;
  for (let i = 0; i < races.size; i++) {
    const race = races.get(i);
    if (race) {
      let numberOfWins = 0;
      const { time, distance } = race;
      for (let j = 1; j < time; j++) {
        if (j * (time - j) > distance) {
          numberOfWins++;
        }
      }
      totalScore *= numberOfWins;
    }
  }
  return totalScore;
};

{
  const times = Array.from(lines[0].matchAll(/[0-9]+/g)).map(x => Number(x[0]));
  const distances = Array.from(lines[1].matchAll(/[0-9]+/g)).map(x =>
    Number(x[0])
  );
  const races = new Map(
    times.map((time, i) => [i, { time, distance: distances[i] }])
  );
  console.log(`Part 1 answer: ${doRaces(races)}`);
}

{
  const time = Number(
    Array.from(lines[0].matchAll(/[0-9]+/g))
      .map(x => x[0])
      .join('')
  );
  const distance = Number(
    Array.from(lines[1].matchAll(/[0-9]+/g))
      .map(x => x[0])
      .join('')
  );
  const input = new Map([[0, { time, distance }]]);
  console.log(`Part 2 answer: ${doRaces(input)}`);
}
