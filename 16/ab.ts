const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .filter(Boolean)
  .map((x) => x.split("")) as Array<Array<keyof typeof moves>>;

const dirs = { R: [0, 1], L: [0, -1], D: [1, 0], U: [-1, 0] } as const;
const moves = {
  ".": { R: ["R"], L: ["L"], D: ["D"], U: ["U"] },
  "-": { R: ["R"], L: ["L"], D: ["L", "R"], U: ["L", "R"] },
  "|": { R: ["D", "U"], L: ["D", "U"], D: ["D"], U: ["U"] },
  "/": { R: ["U"], L: ["D"], D: ["L"], U: ["R"] },
  "\\": { R: ["D"], L: ["U"], D: ["R"], U: ["L"] },
} as const;
const inBounds = (x: number, y: number) =>
  x >= 0 && x < ipt.length && y >= 0 && y < ipt[0].length;
type QType = [[number, number], keyof typeof dirs][];

// Part 1
const solve = (coord: [x: number, y: number], dir: keyof typeof dirs) => {
  const v = new Set<string>();
  const queue: QType = [[coord, dir]];
  while (queue.length) {
    const [[x, y], d] = queue.shift()!;
    if (v.has(`${x},${y},${d}`)) continue;
    v.add(`${x},${y},${d}`);
    queue.push(
      ...(moves[ipt[x][y]][d]
        .filter((nD) => inBounds(x + dirs[nD][0], y + dirs[nD][1]))
        .map((nD) => [[x + dirs[nD][0], y + dirs[nD][1]], nD]) as QType)
    );
  }
  return new Set([...v].map((c) => c.split(",").slice(0, 2).join(","))).size;
};
console.log("part1:", solve([0, 0], "R")); //8551

// Part 2
const res2 = ipt
  .reduce((a, c, i) => {
    return a.concat(
      c.reduce((iA, _, j) => {
        if (i === 0) iA.push([[i, j], "D"]);
        if (i === ipt.length - 1) iA.push([[i, j], "U"]);
        if (j === 0) iA.push([[i, j], "R"]);
        if (j === ipt[0].length - 1) iA.push([[i, j], "L"]);
        return iA;
      }, [] as QType)
    );
  }, [] as QType)
  .reduce((m, t) => Math.max(m, solve(...t)), 0);
console.log("part2:", res2); //8754
