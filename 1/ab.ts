export const a = "a";

const ipt = Deno.readTextFileSync("./input.txt").split("\n").filter(Boolean);

// Part 1

const res = ipt
  .map((i) => i.replace(new RegExp("[^\\d]", "g"), ""))
  .map((i) => {
    return [i[0], i[i.length - 1]].join("");
  })
  .map((i) => parseInt(i))
  .reduce((a, c) => a + Number(c), 0);

console.log("part1: ", res); // 54390

// Part 2

const numbers = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
  zero: "0",
};

const res2 = ipt
  .map((i) =>
    [
      ...i.matchAll(
        new RegExp(`(?=(\\d|${Object.keys(numbers).join("|")}))`, "gm")
      ),
    ].flatMap((i) => i.slice(1))
  )
  .map((i) => {
    return i.map((j) => numbers[j as keyof typeof numbers] ?? j);
  })
  .map((i) => {
    if (i.length === 0) return i[0];
    return [i[0], i[i.length - 1]].join("");
  })
  .map((i) => parseInt(i))
  .reduce((a, c) => a + Number(c), 0);

console.log("part2: ", res2); // 54277
