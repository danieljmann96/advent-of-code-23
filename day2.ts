import { readFileSync } from 'fs';

const input = readFileSync('./inputs/day2.txt', 'utf8');
const lines = input.split('\n');

{
  const MAX_RED = 12;
  const MAX_GREEN = 13;
  const MAX_BLUE = 14;
  let totalOfIds = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const split = line.split(': ');
    const id = Number(split[0].split(' ')[1]);
    const highGames = Array.from(
      split[1].matchAll(/([0-9]{2,})\s(red|green|blue)/g)
    ).map(x => x[0]);
    if (
      !highGames.some(game => {
        const value = Number(game.split(' ')[0]);
        const colour = game.split(' ')[1];
        switch (colour) {
          case 'red':
            return value > MAX_RED;
          case 'blue':
            return value > MAX_BLUE;
          case 'green':
            return value > MAX_GREEN;
        }
      })
    ) {
      totalOfIds += id;
    }
  }
  console.log(`Part 1 answer: ${totalOfIds}`);
}

{
  let sumOfPowers = 0;
  for (let i = 0; i < lines.length; i++) {
    const game = lines[i].split(': ')[1];
    const values = game.replaceAll(';', ',').split(', ');
    let power = 1;
    ['blue', 'green', 'red'].forEach(colour => {
      const maxColourNumber = Math.max(
        ...values
          .filter(value => value.includes(colour))
          .map(value => Number(value.split(' ')[0]))
      );
      power *= maxColourNumber;
    });
    sumOfPowers += power;
  }
  console.log(`Part 2 answer: ${sumOfPowers}`);
}
