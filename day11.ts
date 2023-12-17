import { readFileSync } from 'fs';
import { isBetween } from './utils';

const input = readFileSync('./inputs/day11.txt', 'utf8');
const lines = input.split('\n');
lines.reverse();

const doExpansionsAndPaths = (expansion: number) => {
  const rowsToExpand = lines
    .map((x, i) => (x.split('').every(y => y === '.') ? i : null))
    .filter(Boolean);
  const columnsToExpand: number[] = [];
  for (let i = 0; i < lines[0].length; i++) {
    const column = lines.map(x => x[i]);
    if (column.every(x => x === '.')) {
      columnsToExpand.push(i);
    }
  }
  const galaxies: string[] = [];
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] === '#') {
        galaxies.push(`${x},${y}`);
      }
    }
  }
  const shortestPaths: number[] = [];
  for (let i = 0; i < galaxies.length - 1; i++) {
    const galaxyA = galaxies[i].split(',').map(Number);
    for (let j = i + 1; j < galaxies.length; j++) {
      const galaxyB = galaxies[j].split(',').map(Number);
      let xDifference = Math.abs(galaxyA[0] - galaxyB[0]);
      const expandedColumnsPassed = columnsToExpand.filter(columnIndex =>
        isBetween(columnIndex, galaxyA[0], galaxyB[0])
      ).length;
      if (expandedColumnsPassed > 0) {
        xDifference += expandedColumnsPassed * expansion;
      }
      let yDifference = Math.abs(galaxyA[1] - galaxyB[1]);
      const expandedRowsPassed = rowsToExpand.filter(rowIndex =>
        isBetween(Number(rowIndex), galaxyA[1], galaxyB[1])
      ).length;
      if (expandedRowsPassed > 0) {
        yDifference += expandedRowsPassed * expansion;
      }
      const shortestPath = xDifference + yDifference;
      shortestPaths.push(shortestPath);
    }
  }
  return shortestPaths.reduce((a, b) => a + b, 0);
};

{
  const EXPANSION = 2;
  const answer = doExpansionsAndPaths(EXPANSION - 1);
  console.log(`Part 1 answer: ${answer}`);
}

{
  const EXPANSION = 1000000;
  const answer = doExpansionsAndPaths(EXPANSION - 1);
  console.log(`Part 2 answer: ${answer}`);
}
