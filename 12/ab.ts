export {};

const ipt = Deno.readTextFileSync("./input.txt").split("\n").filter(Boolean);
const cache = new Map();

function solve(
  map: string,
  dmg: number[],
  map_i: number,
  dmg_i: number,
  len: number
) {
  const key = `${map_i},${dmg_i},${len}`;
  if (cache.has(key)) return cache.get(key);
  if (map_i === map.length) {
    if (dmg_i === dmg.length && len === 0) return 1;
    else if (dmg_i === dmg.length - 1 && dmg[dmg_i] === len) return 1;
    else return 0;
  }
  const ans: number = [".", "#"].reduce((acc, c) => {
    if ([c, "?"].includes(map[map_i])) {
      if (c === "#") return (acc += solve(map, dmg, map_i + 1, dmg_i, len + 1));
      else {
        if (len === 0) acc += solve(map, dmg, map_i + 1, dmg_i, 0);
        if (dmg_i < dmg.length && dmg[dmg_i] === len) {
          acc += solve(map, dmg, map_i + 1, dmg_i + 1, 0);
        }
      }
    }
    return acc;
  }, 0);
  cache.set(key, ans);
  return ans;
}

// part 1
const res = ipt.reduce((acc, line) => {
  cache.clear();
  const [map, dmg] = line
    .split(" ")
    .map((value, index) =>
      index === 0 ? value : value.split(",").map(Number)
    ) as [string, number[]];
  return acc + solve(map, dmg, 0, 0, 0);
}, 0);
console.log("part1:", res); //6827

// part 2
const res2 = ipt.reduce((acc, line) => {
  cache.clear();
  const [map, dmg] = line
    .split(" ")
    .map((value, index) =>
      index === 0
        ? Array(5).fill(value).join("?")
        : Array(5).fill(value.split(",").map(Number)).flat()
    ) as [string, number[]];
  return acc + solve(map, dmg, 0, 0, 0);
}, 0);
console.log("part2:", res2); //1537505634471
