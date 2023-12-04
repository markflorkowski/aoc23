export {};

const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .filter(Boolean)
  .map((line) =>
    line
      .split(/[:|]/)
      .slice(1)
      .map((item) => item.trim().split(/\s+/))
  );

// Part 1
let points = 0;
const copies = Array(ipt.length).fill(1);
ipt.forEach(([winning, yours], i) => {
  let wins = yours.filter((x) => winning.includes(x)).length;
  if (!wins) return;
  points += 2 ** wins - 1;
  while (wins) {
    copies[i + wins--] += copies[i];
  }
});

console.log("Part 1", points); // 50188

// Part 2
const count = copies.reduce((a, b) => a + b);

console.log("Part 2", count); //5667240
