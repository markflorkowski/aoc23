export {};

const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .filter(Boolean)
  .map((x) => [x.split(/\s+/).map(Number)]);

const solve = (ipt: number[][][]) => {
  return ipt
    .map((s) => {
      while (s[s.length - 1].some((x) => x !== s[s.length - 1][0])) {
        s.push(
          s[s.length - 1].slice(1).map((n, i, a) => n - (a[i - 1] ?? a[0]))
        );
      }
      return s.reduce((a, c) => a + c[c.length - 1], 0);
    })
    .reduce((a, c) => a + c, 0);
};

// part 1
const res = solve(ipt);
console.log("part1:", res); //1581679977

// part 2
const res2 = solve(ipt.map((x) => [x[0].reverse()])); // neat trick
console.log("part2:", res2); //889
