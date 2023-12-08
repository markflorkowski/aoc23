export {};

const [ins, nodeMap] = Deno.readTextFileSync("./input.txt")
  .split("\n\n")
  .filter(Boolean)
  .reduce(([ins, nodeMap], data, index) => {
    if (index === 0) ins = data;
    nodeMap = data.split("\n").reduce((map, node) => {
      const [name, L, R] = node.replaceAll(/[=,()]/g, "").split(/\s+/);
      return map.set(name, [L, R]);
    }, new Map<string, [string, string]>());
    return [ins, nodeMap];
  }, [] as unknown as [string, Map<string, [string, string]>]);

// part 1
const solve = (start: string) => {
  let p = start;
  let i = 0;

  while (!p.endsWith("Z")) {
    // technically !pos==="ZZZ" for part 1...
    p = nodeMap.get(p)![+(ins[i++ % ins.length] !== "L")];
  }
  return i;
};

console.log("part1:", solve("AAA")); // 12599

// part 2
const lcm = (a: number, b: number) => {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  return (a * b) / gcd(a, b);
};

const res2 = Array.from(nodeMap.keys())
  .filter((s) => s.endsWith("A"))
  .reduce((a, c) => lcm(a, solve(c)), 1);

console.log("part2:", res2); //8245452805243
