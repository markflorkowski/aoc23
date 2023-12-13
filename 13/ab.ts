export {};

const ipt = Deno.readTextFileSync("./input.txt")
  .trim()
  .split("\n\n")
  .map((grid) => grid.split("\n").map((row) => row.split("")));

const transpose = <T>(m: T[][]) => m[0].map((_, i) => m.map((x) => x[i]));

const findReflection = (grid: string[][], diff: number) => {
  return grid.reduce((a, _, i) => {
    if (i === grid.length - 1) return a;
    const d = grid.reduce((a, c, j) => {
      const tI = i + 1 + (i - j);
      return tI >= 0 && tI < grid.length && c !== grid[tI]
        ? a + c.filter((c, k) => c !== grid[tI][k]).length
        : a;
    }, 0);
    return d === diff ? i + 1 : a;
  }, 0);
};

const solve = (grid: string[][], diff: number) => {
  const row = findReflection(grid, diff);
  const col = findReflection(transpose(grid), diff);
  return row ? 100 * row : col;
};

// part 1
const res1 = ipt.reduce((a, c) => a + solve(c, 0), 0);
console.log("part1:", res1); // 40006

// part 2
const res2 = ipt.reduce((a, c) => a + solve(c, 2), 0);
console.log("part2:", res2); // 28627
