import { file, readableStreamToText, type BunFile } from 'bun';

const example1 = file('example1.txt');
const example2 = file('example2.txt');
const input = file('input.txt');

const parseInput = async (file: BunFile) => {
  const input = await file.text();
  return input.split('\n').filter(line => line.trim() !== '');
};

const puzzle1 = async (file: BunFile) => {
  const input = await parseInput(file);
  const text = input.join('');
  const re = /mul\(\d+,\d+\)/g;
  const matches = text.match(re);
  const tuples = matches?.map(match => {
    const group = match.match(/\d+,\d+/);
    if (group) {
      const nums = group[0].split(',').map(Number);
      return nums.reduce((a, b) => a * b);
    }
    return 0;
  });
  const total = tuples?.reduce((a, b) => a + b);
  console.log(total);
};

// puzzle1(input);

/**
 * As you scan through the corrupted memory, you notice that some of the conditional statements are also still intact.
 * If you handle some of the uncorrupted conditional statements in the program, you might be able to get an even more accurate result.
 * There are two new instructions you'll need to handle
 * The do() instruction enables future mul instructions
 * The don't() instruction disables future mul instructions
 * Only the most recent do() or don't() instruction applies. At the beginning of the program, mul instructions are enabled
 * For example
 * xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5)
 * This corrupted memory is similar to the example from before, but this time the mul(5,5) and mul(11,8)
 * instructions are disabled because there is a don't() instruction before them. The other mul instructions function normally, including the one at the end that gets re-enabled by a do() instruction
 * This time, the sum of the results is 48 (2*4 + 8*5)
 * Handle the new instructions; what do you get if you add up all of the results of just the enabled multiplications?
 */
const puzzle2 = async (file: BunFile) => {
  const input = await parseInput(file);
  const text = input.join('');
  const masterRe = /don't\(\)|do\(\)|mul\(\d+,\d+\)/g; // match all of do(), don't(), mul(num,num)
  const numRe = /\d+,\d+/g; // numbers e.g. 40,50
  let total = 0;
  let isEnabled = true; // initial all is true so calculate till you hit a don't();
  const matches = text.matchAll(masterRe);
  matches?.forEach(match => {
    const instruction = match[0];
    if (instruction == 'do()') {
      console.log('%s match', instruction) //  do() match
      isEnabled = true;
    } else if (instruction === "don't()") {
      console.log('%s match', instruction) // don't() match
      isEnabled = false;
    } else if (isEnabled && instruction.startsWith("mul(")) {
      console.log('%s match', instruction) //  mul(num,num) match
      // calculate stuff here
      const tuple = instruction.match(numRe);
      if (tuple) {
        const [a, b] = tuple[0].split(',').map(Number);
        total += a * b;
      }
    }
  });
  console.log(total);
};

puzzle2(input);
