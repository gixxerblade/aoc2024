import { file, type BunFile } from 'bun';

const example1 = file('example1.txt');
const input = file('input.txt');

const parseInput = async (file: BunFile) => {
  const input = await file.text();
  return input
    .split('\n')
    .filter(line => line.trim() !== '')
    .map(line => line.split(''));
};

type Direction = '^' | '>' | '<' | 'v';
type RowColumn = { row: number; col: number };

const directions: Direction[] = ['^', '>', 'v', '<'];
const directionMoves: Record<Direction, RowColumn> = {
  '^': { row: -1, col: 0 },
  '>': { row: 0, col: 1 },
  v: { row: 1, col: 0 },
  '<': { row: 0, col: -1 },
} as const;

const puzzle1 = async (file: BunFile) => {
  const input = await parseInput(file);
  const visited = new Set<string>();
  let direction: Direction = '^';
  let guardPos: RowColumn = { row: 0, col: 0 };

  // Find the guard's starting position
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      const el = input[row][col];
      if (el === '^') {
        guardPos = { row, col };
        break;
      }
    }
  }

  const numRows = input.length;
  const numCols = input[0].length;

  while (true) {
    // Mark current position as visited
    visited.add(`${guardPos.row},${guardPos.col}`);

    // Calculate next position
    const { row: dr, col: dc } = directionMoves[direction];
    const nextPos = {
      row: guardPos.row + dr,
      col: guardPos.col + dc
    };

    // Check if the next position is within bounds AND contains an obstacle
    if (nextPos.row >= 0 && nextPos.row < numRows && 
        nextPos.col >= 0 && nextPos.col < numCols && 
        input[nextPos.row][nextPos.col] === '#') {
      // Turn right if there's an obstacle
      const dirIndex = directions.indexOf(direction);
      direction = directions[(dirIndex + 1) % directions.length];
      continue;
    }

    // Move to next position
    guardPos = nextPos;
    
    // Check if we've left the area
    if (guardPos.row < 0 || guardPos.row >= numRows || 
        guardPos.col < 0 || guardPos.col >= numCols) {
      break;
    }
  }
  console.log(visited.size);
};


const puzzleTest = async (file: BunFile) => {
  const input = await parseInput(file);
  const visited = new Set<string>();
  let direction: Direction = '^';
  let guardPos: RowColumn = { row: 0, col: 0 };

  // Find the guard's starting position
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      if (input[row][col] === '^') {
        guardPos = { row, col };
        break;
      }
    }
  }

  const numRows = input.length;
  const numCols = input[0].length;
  let steps = 0;

  while (steps < 1000) { // Safety limit for debugging
    steps++;
    // Mark current position as visited
    visited.add(`${guardPos.row},${guardPos.col}`);

    // Calculate next position
    const { row: dr, col: dc } = directionMoves[direction];
    const nextPos = {
      row: guardPos.row + dr,
      col: guardPos.col + dc
    };

    console.log(`Step ${steps}:`);
    console.log(`Current position: (${guardPos.row}, ${guardPos.col})`);
    console.log(`Next position: (${nextPos.row}, ${nextPos.col})`);
    console.log(`Direction: ${direction}`);

    // Check if next position would be out of bounds
    if (nextPos.row < 0 || nextPos.row >= numRows || 
        nextPos.col < 0 || nextPos.col >= numCols) {
      const dirIndex = directions.indexOf(direction);
      direction = directions[(dirIndex + 1) % directions.length];
      console.log(`Out of bounds - turning right to ${direction}`);
      continue;
    }

    // Check if next position has an obstacle
    if (input[nextPos.row][nextPos.col] === '#') {
      const dirIndex = directions.indexOf(direction);
      direction = directions[(dirIndex + 1) % directions.length];
      console.log(`Hit obstacle - turning right to ${direction}`);
      continue;
    }

    // Move forward
    guardPos = nextPos;
    
    // Check if we've left the area completely
    if (guardPos.row < 0 || guardPos.row >= numRows || 
        guardPos.col < 0 || guardPos.col >= numCols) {
      console.log('Guard has left the area');
      break;
    }
  }

  if (steps >= 1000) {
    console.log('Reached step limit - possible infinite loop');
    // Print the last few visited positions for debugging
    console.log('Last visited positions:', Array.from(visited).slice(-5));
  }

  return visited.size;
};

puzzle1(input);

const puzzle2 = async (file: BunFile) => {
  const input = await parseInput(file);
};
