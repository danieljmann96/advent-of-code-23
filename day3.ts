import { readFileSync } from 'fs';

const input = readFileSync('./inputs/day3.txt', 'utf8');
const lines = input.split('\n');

{
  const checkIfSymbol = (input: string) =>
    input !== '.' && !input.match(/[0-9]/);
  let sumOfParts = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const numberMatches = Array.from(line.matchAll(/[0-9]+/g));
    const lineAbove = i > 0 ? lines[i - 1].split('') : null;
    const lineBelow = i < lines.length - 1 ? lines[i + 1].split('') : null;
    innerLoop: for (let j = 0; j < numberMatches.length; j++) {
      const numberMatch = numberMatches[j];
      const startIndex = Number(numberMatch.index);
      const endIndex = Number(numberMatch.index) + numberMatch[0].length - 1;
      const leftStartIndex = startIndex > 0 ? startIndex - 1 : 0;
      const rightEndIndex =
        endIndex < line.length - 1 ? endIndex + 1 : endIndex;
      //left
      if (startIndex > 0 && checkIfSymbol(line[startIndex - 1])) {
        sumOfParts += Number(numberMatch[0]);
        continue innerLoop;
      }
      //right
      if (endIndex < line.length - 1 && checkIfSymbol(line[endIndex + 1])) {
        sumOfParts += Number(numberMatch[0]);
        continue innerLoop;
      }
      //up
      if (lineAbove) {
        const valuesAbove = lineAbove.slice(leftStartIndex, rightEndIndex + 1);
        if (valuesAbove.some(checkIfSymbol)) {
          sumOfParts += Number(numberMatch[0]);
          continue innerLoop;
        }
      }
      //down
      if (lineBelow) {
        const valuesBelow = lineBelow.slice(leftStartIndex, rightEndIndex + 1);
        if (valuesBelow.some(checkIfSymbol)) {
          sumOfParts += Number(numberMatch[0]);
          continue innerLoop;
        }
      }
    }
  }
  console.log(`Part 1 answer: ${sumOfParts}`);
}

{
  let sumOfGearRatios = 0;
  outerLoop: for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const starMatches = Array.from(line.matchAll(/[*]/g));
    for (let j = 0; j < starMatches.length; j++) {
      const starMatch = starMatches[j];
      const starIndex = Number(starMatch.index);
      const lineAbove = i > 0 ? lines[i - 1] : null;
      const lineBelow = i < lines.length - 1 ? lines[i + 1] : null;
      const adjacentNumbers: number[] = [];
      if (lineAbove || lineBelow) {
        const numbersMatched = [];
        if (lineAbove) {
          numbersMatched.push(...Array.from(lineAbove.matchAll(/[0-9]+/g)));
        }
        if (lineBelow) {
          numbersMatched.push(...Array.from(lineBelow.matchAll(/[0-9]+/g)));
        }
        numbersMatched.forEach(numberMatched => {
          const numberValue = numberMatched[0];
          const startIndex = Number(numberMatched.index);
          const endIndex = Number(numberMatched.index) + numberValue.length - 1;
          if (starIndex >= startIndex - 1 && starIndex <= endIndex + 1) {
            adjacentNumbers.push(Number(numberValue));
          }
        });
      }
      if (starIndex > 0 && line[starIndex - 1].match(/[0-9]/)) {
        const numberValue = Number(
          Array.from(line.slice(0, starIndex).matchAll(/.*?[0-9]{1,}/g))
            .at(-1)
            ?.at(0)
            ?.match(/[0-9]{1,}/)
            ?.at(0)
        );
        adjacentNumbers.push(numberValue);
      }
      if (starIndex !== line.length - 1 && line[starIndex + 1].match(/[0-9]/)) {
        const numberValue = Number(
          Array.from(
            line.slice(starIndex + 1, line.length).matchAll(/[0-9]{1,}/g)
          )
            .at(0)
            ?.at(0)
        );
        adjacentNumbers.push(numberValue);
      }
      if (adjacentNumbers.length === 2) {
        const gearRatio = adjacentNumbers[0] * adjacentNumbers[1];
        sumOfGearRatios += gearRatio;
      }
    }
  }
  console.log(`Part 2 answer: ${sumOfGearRatios}`);
}
