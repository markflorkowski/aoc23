export {};

const ipt = Deno.readTextFileSync("./input.txt").split(",").filter(Boolean);

// Part 1
const hash = (s: string) =>
  [...s].reduce((a, c) => ((a + c.charCodeAt(0)) * 17) % 256, 0);

const lenses: Array<Array<string>> = Array.from({ length: 256 }, () => []);
const ll: Array<Record<string, number>> = Array(256).fill({});

const res = ipt.reduce((a, c) => {
  const n = c.match(/^[^-=]+/)![0];
  const [l, len] = [lenses[hash(n)], ll[hash(n)]];

  c.includes("-") && l.includes(n) && l.splice(l.indexOf(n), 1);
  c.includes("=") && !l.includes(n) && (l.push(n), (len[n] = +c.split("=")[1]));

  return a + hash(c);
}, 0);

console.log("part1:", res); // 510792

// Part 2
const res2 = lenses.reduce(
  (a, c, i) => a + c.reduce((b, d, j) => b + (i + 1) * (j + 1) * ll[i][d], 0),
  0
);

console.log("part2:", res2); // 269410
