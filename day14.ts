import { readFileSync } from 'fs';

const input = readFileSync('./inputs/day14.txt', 'utf8');
const lines = input.split('\n');

let rows = new Map(
  lines.map((line, i) => [i, new Map(line.split('').map((x, y) => [y, x]))])
);
{
  for (let i = 0; i < lines[0].length; i++) {
    for (let j = lines.length - 1; j > 0; j--) {
      const elem = String(rows.get(j)?.get(i));
      if (elem === 'O' && rows.get(j - 1)?.get(i) === '.') {
        const thisLine = rows.get(j);
        if (thisLine) {
          thisLine?.set(i, '.');
          rows.set(j, thisLine);
        }
        const lineAbove = rows.get(j - 1);
        if (lineAbove) {
          lineAbove?.set(i, 'O');
          rows.set(j - 1, lineAbove);
        }
        const elemBelow = rows.get(j + 1)?.get(i);
        if (elemBelow === 'O') {
          j += 2;
        }
      }
    }
  }
  const totalScore = [...rows.entries()]
    .map(x => [...x[1].entries()].map(y => y[1]))
    .toReversed()
    .reduce((a, b, i) => a + b.filter(x => x === 'O').length * (i + 1), 0);
  console.log(`Part 1 answer: ${totalScore}`);
}

{
  const CYCLES = 1000;
  for (let cycle = 0; cycle < CYCLES; cycle++) {
    console.log(`cycle ${cycle + 1}/${CYCLES}`);
    //NORTH
    for (let i = 0; i < lines[0].length; i++) {
      for (let j = lines.length - 1; j > 0; j--) {
        const elem = String(rows.get(j)?.get(i));
        if (elem === 'O' && rows.get(j - 1)?.get(i) === '.') {
          const thisLine = rows.get(j);
          if (thisLine) {
            thisLine?.set(i, '.');
            rows.set(j, thisLine);
          }
          const lineAbove = rows.get(j - 1);
          if (lineAbove) {
            lineAbove?.set(i, 'O');
            rows.set(j - 1, lineAbove);
          }
          const elemBelow = rows.get(j + 1)?.get(i);
          if (elemBelow === 'O') {
            j += 2;
          }
        }
      }
    }
    //WES
    for (let i = 0; i < lines.length; i++) {
      for (let j = lines[0].length - 1; j > 0; j--) {
        const elem = String(rows.get(i)?.get(j));
        if (elem === 'O' && rows.get(i)?.get(j - 1) === '.') {
          const thisLine = rows.get(i);
          if (thisLine) {
            thisLine.set(j, '.');
            thisLine.set(j - 1, 'O');
            rows.set(i, thisLine);
          }
          const elemRight = thisLine?.get(j + 1);
          if (elemRight === 'O') {
            j += 2;
          }
        }
      }
    }
    //SOUTH
    for (let i = 0; i < lines[0].length; i++) {
      for (let j = 0; j < lines.length - 1; j++) {
        const elem = String(rows.get(j)?.get(i));
        if (elem === 'O' && rows.get(j + 1)?.get(i) === '.') {
          const thisLine = rows.get(j);
          if (thisLine) {
            thisLine?.set(i, '.');
            rows.set(j, thisLine);
          }
          const lineBelow = rows.get(j + 1);
          if (lineBelow) {
            lineBelow?.set(i, 'O');
            rows.set(j + 1, lineBelow);
          }
          const elemAbove = rows.get(j + 1)?.get(i);
          if (elemAbove === 'O') {
            j -= 2;
          }
        }
      }
    }
    //EAST
    for (let i = 0; i < lines.length; i++) {
      for (let j = 0; j < lines[0].length; j++) {
        const elem = String(rows.get(i)?.get(j));
        if (elem === 'O' && rows.get(i)?.get(j + 1) === '.') {
          const thisLine = rows.get(i);
          if (thisLine) {
            thisLine.set(j, '.');
            thisLine.set(j + 1, 'O');
            rows.set(i, thisLine);
          }
          const elemLeft = thisLine?.get(j - 1);
          if (elemLeft === 'O') {
            j -= 2;
          }
        }
      }
    }
  }
  const totalScore = [...rows.entries()]
    .map(x => [...x[1].entries()].map(y => y[1]))
    .toReversed()
    .reduce((a, b, i) => a + b.filter(x => x === 'O').length * (i + 1), 0);
  console.log(`Part 2 answer: ${totalScore}`);
}
