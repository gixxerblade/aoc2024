import { file, type BunFile } from 'bun';
const example1 = file('example1.txt');
const input = file('input.txt');

const parseInput = async (file: BunFile) => {
  const input = await file.text();
  return input.split('\n').filter(line => line.trim() !== '');
};

const puzzle1 = async (file: BunFile) => {
  const input = await parseInput(file);
  const col1: number[] = [],
    col2: number[] = [];
  input
    .map(line => line.split(' ').filter(Boolean).map(Number))
    .forEach(line => {
      line.forEach((item, idx) => {
        if (idx === 0) {
          col1.push(item);
        } else {
          col2.push(item);
        }
      });
    });
  col1.sort();
  col2.sort();
  const vals = col1.map((col, idx) => Math.abs(col - col2[idx]));
  console.log(vals.reduce((a, b) => a + b));
};

puzzle1(input);

const puzzle2 = async (file: BunFile) => {
  let similarityScore = 0;
  const input = await parseInput(file);
  const leftList: number[] = [];
  const rightList: Map<number, number> = new Map();
  input.forEach(line =>
    line
      .split(' ')
      .filter(Boolean)
      .map((item, idx) => {
        const value = +item;
        if (idx === 0) {
          leftList.push(value);
        } else {
          rightList.set(value, (rightList.get(value) || 0) + 1);
        }
      })
  );
  leftList.forEach(num => {
    if (rightList.has(num)) {
      similarityScore += num * (rightList.get(num) || 0);
    }
  });
  console.log(similarityScore);
};

puzzle2(input);
