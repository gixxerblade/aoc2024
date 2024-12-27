import { file, type BunFile } from 'bun';

const example1 = file('example1.txt');
const input = file('input.txt');

const parseInput = async (file: BunFile) => {
  const input = await file.text();
  return input
    .split('\n')
    .filter((line) => line.trim() !== '')
    .map((line) => line.split(':').map((nums) => {
      const output = nums.trim();
      return output
    }))
    .reduce((acc, curr) => {
      const num = {
        output: +curr[0],
        nums: curr[1].split(' ').map(Number)
      }
      acc.push(num)
      return acc
    }, [] as { output: number; nums: number[]; }[]);
}

const generateAllCombos = () => {
  
}

const puzzle1 = async (file: BunFile) => {
  const input = await parseInput(file);
  console.log(input)
};

puzzle1(example1);

const puzzle2 =async (file: BunFile) => {
  const input = await parseInput(file)
};
