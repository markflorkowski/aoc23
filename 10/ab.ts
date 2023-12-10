export {};

const [ipt, width] = Deno.readTextFileSync("./input.txt")
  .trim()
  .split("\n")
  .reduce(([d, w], x, i) => [d + x, i === 0 ? x.length : w], ["", 0]);

// Part 1

const offsets: Record<string, number[]> = {
  S: [],
  "|": [width, -width],
  "-": [-1, 1],
  "7": [-1, width],
  J: [-1, -width],
  F: [1, width],
  L: [1, -width],
};

const start = ipt.indexOf("S");
const d = Array.from(ipt).map((c, i) => {
  if (c !== "." && offsets[c].includes(start - i)) offsets["S"].push(i - start);
  return offsets[c];
});

const path = new Set([start]);
let curr = path;
while (curr.size) {
  const next = new Set<number>();
  curr.forEach((i) => d[i].forEach((o) => !path.has(i + o) && next.add(i + o)));
  next.forEach(path.add, path);
  curr = next;
}

console.log("Part 1:", path.size / 2); //7012

// Part 2

const count = d.reduce((a, _, i) => {
  if (path.has(i)) return a;
  let [oR, oL] = [true, true];
  for (let j = i; j > 0; j -= width) {
    if (path.has(j) && d[j].includes(1)) oR = !oR;
    if (path.has(j) && d[j].includes(-1)) oL = !oL;
  }
  return !oR && !oL ? a + 1 : a;
}, 0);

console.log("Part 2:", count); //395
