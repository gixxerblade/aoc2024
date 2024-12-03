import { file, type BunFile } from 'bun';

const example1 = file('example1.txt');
const input = file('input.txt');

const parseInput = async (file: BunFile) => {
  const input = await file.text();
  return input.split('\n').filter(line => line.trim() !== '');
};
/**
 * The levels are either all increasing or all decreasing.
 * Any two adjacent levels differ by at least one and at most three.
 */
const isReportSafe = (report: number[]) => {
  let isIncreasing = true;
  let isDecreasing = true;

  for (let i = 0; i < report.length - 1; i++) {
    const level = report[i];
    const adjacent = report[i + 1];
    const diff = adjacent - level;
    const absoluteDiff = Math.abs(diff);

    if (absoluteDiff < 1 || absoluteDiff > 3) {
      // console.log({level, adjacent, report, absoluteDiff})
      return false;
    }
    if (diff > 0) {
      isDecreasing = false;
    }
    if (diff < 0) {
      isIncreasing = false;
    }
  }

  return isIncreasing || isDecreasing;
}

const puzzle1 = async (file: BunFile) => {
  const input = await parseInput(file);
  const reports = input.map(line => line.split(' ').map(Number));
  const count = reports.filter(isReportSafe).length
  console.log(count)
};

puzzle1(input);

const isSafeWithDampener = (report: number[]) => {
  if (isReportSafe(report)) {
    return true;
  }

  for (let i = 0; i < report.length; i++) {
    const modifiedReport = report.slice(0, i).concat(report.slice(i + 1));
    if (isReportSafe(modifiedReport)) {
      return true
    }
  }
  return false;
}

const puzzle2 = async (file: BunFile) => {
  const input = await parseInput(file);
  const reports = input.map(line => line.split(' ').map(Number));
  const count = reports.filter(isSafeWithDampener).length;
  console.log(count)
};

puzzle2(input)
