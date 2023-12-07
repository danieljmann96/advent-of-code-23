import { readFileSync } from 'fs';

const input = readFileSync('./inputs/day5.txt', 'utf8');
const lines = input.split('\n');

interface Mapper {
  destinationRangeStart: number;
  sourceRangeStart: number;
  rangeLength: number;
}

const sortOutMap = (input: string[]) =>
  input.map(x => {
    const [destinationRangeStart, sourceRangeStart, rangeLength] = x
      .split(' ')
      .map(Number);
    return { destinationRangeStart, sourceRangeStart, rangeLength };
  });

const mapStartingIndexes: number[] = [];
lines.forEach((x, i) => {
  if (x.includes('map')) mapStartingIndexes.push(i);
});

{
  const startingSeeds = lines[0].split(': ')[1].split(' ').map(Number);
  const mappers = new Map<number, Mapper[]>();
  mapStartingIndexes.forEach((startIndex, i, arr) => {
    if (i === arr.length - 1) {
      mappers.set(i, sortOutMap(lines.slice(startIndex + 1, lines.length)));
    } else {
      mappers.set(i, sortOutMap(lines.slice(startIndex + 1, arr[i + 1] - 1)));
    }
  });
  const putSeedThroughMapper = (input: number, mapper: Mapper) => {
    const { destinationRangeStart, sourceRangeStart, rangeLength } = mapper;
    const maxRange = sourceRangeStart + rangeLength;
    if (input >= sourceRangeStart && input < maxRange) {
      const difference = destinationRangeStart - sourceRangeStart;
      return input + difference;
    }
    return null;
  };
  const endSeedValues = new Set<number>();
  for (let i = 0; i < startingSeeds.length; i++) {
    let seed = startingSeeds[i];
    for (let j = 0; j < mappers.size; j++) {
      const mappersToTry = mappers.get(j);
      if (mappersToTry) {
        mappersLoop: for (let k = 0; k < mappersToTry.length; k++) {
          const mapper = mappersToTry[k];
          const result = putSeedThroughMapper(seed, mapper);
          if (result) {
            seed = result;
            break mappersLoop;
          }
        }
      }
    }
    endSeedValues.add(seed);
  }
  console.log(`Part 1 answer: ${Math.min(...endSeedValues)}`);
}

//going backwards for part 2
{
  const putSeedThroughMapper = (input: number, mapper: Mapper) => {
    const {
      destinationRangeStart: sourceRangeStart,
      sourceRangeStart: destinationRangeStart,
      rangeLength
    } = mapper;
    const maxRange = sourceRangeStart + rangeLength;
    if (input >= sourceRangeStart && input < maxRange) {
      const difference = destinationRangeStart - sourceRangeStart;
      return input + difference;
    }
    return null;
  };
  const mappers = new Map<number, Mapper[]>();
  mapStartingIndexes.forEach((startIndex, i, arr) => {
    if (i === arr.length - 1) {
      mappers.set(
        arr.length - i - 1,
        sortOutMap(lines.slice(startIndex + 1, lines.length))
      );
    } else {
      mappers.set(
        arr.length - i - 1,
        sortOutMap(lines.slice(startIndex + 1, arr[i + 1] - 1))
      );
    }
  });
  const seedValueRanges = Array.from(
    lines[0].split(': ')[1].matchAll(/[0-9]+\s[0-9]+/g)
  )
    .map(x => x[0])
    .map(x => [
      Number(x.split(' ')[0]),
      Number(x.split(' ')[0]) + Number(x.split(' ')[1]) - 1
    ]);
  const isInRange = (input: number) => {
    for (let i = 0; i < seedValueRanges.length; i++) {
      const [lowRange, highRange] = seedValueRanges[i];
      if (input >= lowRange && input <= highRange) {
        return true;
      }
    }
    return false;
  };
  let initialSeed = 0;
  while (true) {
    let seed = Number(initialSeed);
    for (let j = 0; j < mappers.size; j++) {
      const mappersToTry = mappers.get(j);
      if (mappersToTry) {
        mappersLoop: for (let k = 0; k < mappersToTry.length; k++) {
          const mapper = mappersToTry[k];
          const result = putSeedThroughMapper(seed, mapper);
          if (result) {
            seed = result;
            break mappersLoop;
          }
        }
      }
    }
    if (isInRange(seed)) {
      console.log(`Part 2 answer: ${initialSeed}`);
      break;
    } else {
      initialSeed++;
    }
  }
}
