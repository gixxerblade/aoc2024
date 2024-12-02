import { mkdirSync } from 'node:fs';
import { Command } from 'commander';
import fs from 'node:fs';

const program = new Command();

program.requiredOption('-d --day <day_number>', 'Specify the day', parseInt);

program.parse(process.argv);

const options = program.opts();

async function getDay(day: number) {
  const today = new Date();
  const month = today.getMonth();
  const currentDay = today.getDate();
  
  if (month < 11 || day > currentDay) {
    console.error('Too early...');
    process.exit(1);
  }
  const dayDir = `./day/${day}`;
  const inputExists = await Bun.file(`${dayDir}/input.txt`).exists();
  if (inputExists) {
    console.error('This already exists!');
    process.exit(1);
  }
  const url = `https://adventofcode.com/2024/day/${day}/input`;
  try {
    const res = await fetch(url, {
      headers: {
        Cookie: `session=${process.env.COOKIE}`,
      },
    });
    const input = await res.text();
    mkdirSync(dayDir, { recursive: true });
    fs.writeFileSync(`${dayDir}/input.txt`, input);
    fs.writeFileSync(`${dayDir}/example1.txt`, '');
    fs.writeFileSync(`${dayDir}/example2.txt`, '');
    fs.copyFileSync('./template.ts', `${dayDir}/solution.ts`);
  } catch (error) {
    throw error;
  }
}

getDay(options.day);
