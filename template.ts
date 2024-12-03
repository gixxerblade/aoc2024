import { file, type BunFile } from 'bun';

const example1 = file('example1.txt');
const input = file('input.txt');

const parseInput = async (file: BunFile) => {
  const input = await file.text();
  return input
    .split('\n')
    .filter((line) => line.trim() !== '')
}

const puzzle1 = async (file: BunFile) => {
  const input = await parseInput(file);
};

puzzle1(example1);

const puzzle2 =async (file: BunFile) => {
  const input = await parseInput(file)
};
