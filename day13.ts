import { readFileSync } from 'fs';

const input = readFileSync('./inputs/day13.txt', 'utf8');
const lines = input.split('\n');
const part1Scores = new Map<number, number>();

const patterns = new Map<number, string[][]>();
let currentIndex = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line === '') {
    currentIndex++;
  } else {
    const currentArray = patterns.get(currentIndex) ?? [];
    currentArray.push(line.split(''));
    patterns.set(currentIndex, currentArray);
  }
}

const checkForVertical = (pattern: string[][], cantBeScore?: number) => {
  for (let j = 0; j < pattern[0].length - 1; j++) {
    let score = 0;
    if (
      pattern.every(row => {
        let left = row.slice(0, j + 1).join('');
        score = left.length;
        let right = row
          .slice(j + 1)
          .toReversed()
          .join('');
        if (right.length > left.length) {
          right = right.slice(right.length - left.length);
        } else if (left.length > right.length) {
          left = left.slice(left.length - right.length);
        }
        return left === right;
      })
    ) {
      if (cantBeScore !== score) {
        return score;
      }
    }
  }
  return null;
};

const checkForHorizontal = (pattern: string[][], cantBeScore?: number) => {
  for (let j = 0; j < pattern.length - 1; j++) {
    let top = pattern.slice(0, j + 1);
    const topTotalLength = top.length;
    let bottom = pattern.slice(j + 1).toReversed();
    if (top.length > bottom.length) {
      top = top.slice(top.length - bottom.length);
    } else if (bottom.length > top.length) {
      bottom = bottom.slice(bottom.length - top.length);
    }
    if (
      top.map(val => val.join('')).join('') ===
      bottom.map(val => val.join('')).join('')
    ) {
      if (cantBeScore !== topTotalLength * 100) {
        return topTotalLength * 100;
      }
    }
  }
  return null;
};

{
  let totalScore = 0;
  for (let i = 0; i < patterns.size; i++) {
    const pattern = patterns.get(i);
    if (pattern) {
      const verticalResult = checkForVertical(pattern);
      if (verticalResult) {
        totalScore += verticalResult;
        part1Scores.set(i, verticalResult);
        continue;
      }
      const horizontalResult = checkForHorizontal(pattern);
      if (horizontalResult) {
        totalScore += horizontalResult;
        part1Scores.set(i, horizontalResult);
      }
    }
  }
  console.log(`Part 1 answer: ${totalScore}`);
}

{
  let totalScore = 0;
  outerLoop: for (let i = 0; i < patterns.size; i++) {
    const pattern = patterns.get(i);
    if (pattern) {
      for (let y = 0; y < pattern.length; y++) {
        for (let x = 0; x < pattern[0].length; x++) {
          const patternToTry = pattern.map((patternLine, index) =>
            index === y
              ? patternLine.with(x, patternLine[x] === '.' ? '#' : '.')
              : patternLine
          );
          const verticalResult = checkForVertical(
            patternToTry,
            part1Scores.get(i)
          );
          if (verticalResult) {
            totalScore += verticalResult;
            continue outerLoop;
          }
          const horizontalResult = checkForHorizontal(
            patternToTry,
            part1Scores.get(i)
          );
          if (horizontalResult) {
            totalScore += horizontalResult;
            continue outerLoop;
          }
        }
      }
    }
  }
  console.log(`Part 2 answer: ${totalScore}`);
}
