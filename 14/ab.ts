export {};

let ipt = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .filter(Boolean)
  .map((row) => row.split(""));

function slide(grid: string[][]) {
  for (let j = 0; j < grid[0].length; j++) {
    let ci = 0;
    for (let i = 0; i < grid.length; i++) {
      if (grid[i][j] === "#") ci = i + 1;
      if (grid[i][j] === "O") {
        grid[i][j] = ".";
        grid[ci][j] = "O";
        ci += 1;
      }
    }
  }
  return grid;
}

const calcLoad = (grid: string[][]) =>
  grid.reduce(
    (a, c, i) => a + (grid.length - i) * c.filter((x) => x === "O").length,
    0
  );

const rotate = <T>(g: T[][]) =>
  g[0].map((_, i) => g.map((r) => r[i]).reverse());

// part 1
const res = calcLoad(slide(ipt));
console.log("part1:", res); // 108144

// part 2
const d = new Map();
let r = 0;
while (true) {
  for (let j = 0; j < 4; j++) ipt = rotate(slide(ipt));
  const x = JSON.stringify(ipt);
  const e = d.get(x)?.[0];
  if (e) {
    const len = d.size + 1 - e;
    for (const [a, b] of d.values()) if (a >= e && a % len === 1e9 % len) r = b;
    break;
  }
  d.set(x, [d.size + 1, calcLoad(ipt)]);
}
console.log("part2:", r); // 108404
