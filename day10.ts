import { readFileSync } from 'fs';
import chalk from 'chalk';

const input = readFileSync('./inputs/day10.txt', 'utf8');
//const lines = input.split('\n');
//const lines = ['7-F7-', '.FJ|7', 'SJLL7', '|F--J', 'LJ.LJ'];
const lines = [
  '..........',
  '.S------7.',
  '.|F----7|.',
  '.||....||.',
  '.||....||.',
  '.|L-7F-J|.',
  '.|II||II|.',
  '.L--JL--J.',
  '..........'
];
// const lines = [
//   '............',
//   '.S---------7',
//   '.|F-------7|',
//   '.||.......||',
//   '.||.......||',
//   '.|L--7.F--J|',
//   '.||-||.|LJ7|',
//   '.L---J.L---J',
//   '............'
// ];
// const lines = [
//   'FF7FSF7F7F7F7F7F---7',
//   'L|LJ||||||||||||F--J',
//   'FL-7LJLJ||||||LJL-77',
//   'F--JF--7||LJLJ7F7FJ-',
//   'L---JF-JLJ.||-FJLJJ7',
//   '|F|F-JF---7F7-L7L|7|',
//   '|FFJF7L7F-JF7|JL---7',
//   '7-L-JL7||F7|L7F-7F7|',
//   'L.L7LFJ|||||FJL7||LJ',
//   'L7JLJL-JLJLJL--JLJ.L'
// ];
// const lines = [
//   '.F----7F7F7F7F-7....',
//   '.|F--7||||||||FJ....',
//   '.||.FJ||||||||L7....',
//   'FJL7L7LJLJ||LJ.L-7..',
//   'L--J.L7...LJS7F-7L7.',
//   '....F-J..F7FJ|L7L7L7',
//   '....L7.F7||L7|.L7L7|',
//   '.....|FJLJ|FJ|F7|.LJ',
//   '....FJL-7.||.||||...',
//   '....L---J.LJ.LJLJ...'
// ];
const points = lines.map(x => x.split('')).reverse();
const pointsInLoop = new Set<string>();

{
  let positionY = points.findIndex(x => x.includes('S'));
  let positionX = points[positionY].findIndex(x => x === 'S');
  pointsInLoop.add(`${positionX},${positionY}`);
  const startLeft = ['F', 'L', '-'].includes(
    points.at(positionY)?.at(positionX - 1) ?? ''
  );
  const startRight = ['J', '7', '-'].includes(
    points.at(positionY)?.at(positionX + 1) ?? ''
  );
  const startUp = ['F', '7', '|'].includes(
    points.at(positionY + 1)?.at(positionX) ?? ''
  );
  const startDown = ['L', 'J', '|'].includes(
    points.at(positionY - 1)?.at(positionX) ?? ''
  );
  let currentDirection = '';
  switch (true) {
    case startLeft:
      positionX--;
      currentDirection = 'left';
      break;
    case startRight:
      positionX++;
      currentDirection = 'right';
      break;
    case startUp:
      positionY++;
      currentDirection = 'up';
      break;
    case startDown:
      positionY--;
      currentDirection = 'down';
      break;
  }
  let positionValue = points[positionY][positionX];
  pointsInLoop.add(`${positionX},${positionY}`);
  let currentSteps = 1;
  while (positionValue !== 'S') {
    if (positionValue === '|') {
      if (currentDirection === 'up') {
        positionY++;
      } else if (currentDirection === 'down') {
        positionY--;
      }
    } else if (positionValue === '-') {
      if (currentDirection === 'left') {
        positionX--;
      } else if (currentDirection === 'right') {
        positionX++;
      }
    } else if (positionValue === 'L') {
      if (currentDirection === 'down') {
        currentDirection = 'right';
        positionX++;
      } else if (currentDirection === 'left') {
        currentDirection = 'up';
        positionY++;
      }
    } else if (positionValue === 'J') {
      if (currentDirection === 'down') {
        currentDirection = 'left';
        positionX--;
      } else if (currentDirection === 'right') {
        currentDirection = 'up';
        positionY++;
      }
    } else if (positionValue === '7') {
      if (currentDirection === 'right') {
        currentDirection = 'down';
        positionY--;
      } else if (currentDirection === 'up') {
        currentDirection = 'left';
        positionX--;
      }
    } else if (positionValue === 'F') {
      if (currentDirection === 'up') {
        currentDirection = 'right';
        positionX++;
      } else if (currentDirection === 'left') {
        currentDirection = 'down';
        positionY--;
      }
    }
    positionValue = points[positionY][positionX];
    pointsInLoop.add(`${positionX},${positionY}`);
    currentSteps++;
  }

  console.log(`Part 1 answer: ${currentSteps / 2}`);
}

{
  let potentialDotsInsideLoop = new Set<string>();
  for (let y = 1; y < points.length - 1; y++) {
    xLoop: for (let x = 1; x < points[0].length - 1; x++) {
      if (pointsInLoop.has(`${x},${y}`)) {
        continue xLoop;
      }
      let hasLeftBoundary = false;
      let hasRightBoundary = false;
      let hasTopBoundary = false;
      let hasBottomBoundary = false;
      leftLoop: for (let z = x; z >= 0; z--) {
        if (pointsInLoop.has(`${z},${y}`)) {
          hasLeftBoundary = true;
          break leftLoop;
        }
      }
      rightLoop: for (let z = x; z < points[y].length; z++) {
        if (pointsInLoop.has(`${z},${y}`)) {
          hasRightBoundary = true;
          break rightLoop;
        }
      }
      topLoop: for (let z = y; z < points.length; z++) {
        if (pointsInLoop.has(`${x},${z}`)) {
          hasTopBoundary = true;
          break topLoop;
        }
      }
      bottomLoop: for (let z = y; z >= 0; z--) {
        if (pointsInLoop.has(`${x},${z}`)) {
          hasBottomBoundary = true;
          break bottomLoop;
        }
      }
      if (
        hasBottomBoundary &&
        hasLeftBoundary &&
        hasRightBoundary &&
        hasTopBoundary
      ) {
        potentialDotsInsideLoop.add(`${x},${y}`);
      }
    }
  }
  const definiteDotsInsideLoop = new Set<string>(potentialDotsInsideLoop);
  let numberDeleted = 1;
  while (numberDeleted !== 0) {
    numberDeleted = 0;
    potentialDotsInsideLoop = new Set(definiteDotsInsideLoop);
    potentialDotsInsideLoop.forEach(val => {
      const [x, y] = val.split(',').map(Number);
      const adjacents = [
        !pointsInLoop.has(`${x + 1},${y}`) && `${x + 1},${y}`,
        !pointsInLoop.has(`${x - 1},${y}`) && `${x - 1},${y}`,
        !pointsInLoop.has(`${x},${y + 1}`) && `${x},${y + 1}`,
        !pointsInLoop.has(`${x},${y - 1}`) && `${x},${y - 1}`
      ];
      let leaks = false;
      adjacents.forEach(x => {
        if (x && !definiteDotsInsideLoop.has(x)) {
          leaks = true;
        }
      });
      if (leaks) {
        definiteDotsInsideLoop.delete(`${x},${y}`);
        numberDeleted++;
        if (!pointsInLoop.has(`${x + 1},${y}`)) {
          rightLoop: for (let z = x; z < points[y].length; z++) {
            if (points[y][z] === '.') {
              definiteDotsInsideLoop.delete(`${x},${z}`);
              numberDeleted++;
            } else {
              break rightLoop;
            }
          }
        }
        if (!pointsInLoop.has(`${x - 1},${y}`)) {
          leftLoop: for (let z = x; z >= 0; z--) {
            if (points[y][z] === '.') {
              definiteDotsInsideLoop.delete(`${x},${z}`);
              numberDeleted++;
            } else {
              break leftLoop;
            }
          }
        }
        if (!pointsInLoop.has(`${x},${y + 1}`)) {
          upLoop: for (let z = y; z < points.length; z++) {
            if (points[z][x] === '.') {
              definiteDotsInsideLoop.delete(`${x},${z}`);
              numberDeleted++;
            } else {
              break upLoop;
            }
          }
        }
        if (!pointsInLoop.has(`${x},${y - 1}`)) {
          downLoop: for (let z = y; z >= 0; z--) {
            if (points[z][x] === '.') {
              definiteDotsInsideLoop.delete(`${x},${z}`);
              numberDeleted++;
            } else {
              break downLoop;
            }
          }
        }
      }
    });
  }
  console.log(`Part 2 answer: ${definiteDotsInsideLoop.size}`);
  points.toReversed().forEach((line, oldy) => {
    const y = points.length - 1 - oldy;
    console.log(
      line
        .map((point, x) =>
          pointsInLoop.has(`${x},${y}`)
            ? chalk.red(point)
            : definiteDotsInsideLoop.has(`${x},${y}`)
            ? chalk.blueBright('I')
            : '0'
        )
        .join('')
    );
  });
}
