export {};

const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((line) => line.trim().split(/\s+/))
  .filter(Boolean)
  .map((l) => l.slice(1))
  .map((l) => l.map(Number));

// part1

// Inefficient search method
// const calc = (limit: number, dist: number) => {
//   return Array.from({ length: limit }, (_, i) => i).filter(
//     (i) => i * (limit - i) > dist
//   ).length;
// };

// Efficient math method
const calc = (limit: number, dist: number) => {
  const sqrt = Math.sqrt(limit * limit - 4 * dist);
  return Math.floor((-limit - sqrt) / -2) - Math.ceil((-limit + sqrt) / -2) + 1;
};

const [limits, dists] = ipt;
const res = limits.reduce((a, limit, index) => {
  return a * calc(limit, dists[index]);
}, 1);
console.log("part1:", res); // 2269432

// part 2

const [limit, dist] = ipt.map((l) => l.join("")).map(Number);
const res2 = calc(limit, dist);
console.log("part2:", res2); // 35865985
