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

export function findLCM(numbers: number[]) {
  function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b);
  }

  function lcm(a: number, b: number) {
    return (a * b) / gcd(a, b);
  }

  function lcmOfArray(numbers: number[]) {
    let result = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      result = lcm(result, numbers[i]);
    }
    return result;
  }

  if (numbers.length < 2) {
    console.error('Array should have at least two numbers');
    return;
  }

  return lcmOfArray(numbers);
}
