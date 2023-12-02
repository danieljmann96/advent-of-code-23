export function getFirstAndLastElementsOfArray<T>(input: T[]) {
  return input.length === 1 ? [input[0], input[0]] : [input[0], input.at(-1)];
}

export function getAllMatchesWithOverlap(input: string, r: RegExp) {
  const result = [];
  let match: string[] | null = null;
  while ((match = r.exec(input))) {
    r.lastIndex -= match[0].length - 1;
    result.push(match[0]);
  }
  return result;
}
