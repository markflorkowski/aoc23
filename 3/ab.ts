export {};

const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .filter(Boolean)
  .map((row) => row.split(""));

//part 1
const [ymax, xmax] = [ipt.length, ipt[0].length];
const nonPeriod = /[^\d.]/g;
const number = /\d+/g;

let sum = 0;

ipt.forEach((row, y) => {
  const numbers = row.join("").matchAll(number);

  for (const match of numbers) {
    const xval = match.index as number;
    const length = match[0].length;

    let above = "";
    let below = "";
    let left = "";
    let right = "";

    // check above (if not at first row)
    if (y > 0) {
      const startAbove = Math.max(xval - 1, 0);
      const endAbove = Math.min(xval + length + 1, ipt[y - 1].length);
      above = ipt[y - 1].slice(startAbove, endAbove).join("");
      if (above.match(nonPeriod)) {
        sum += Number(match[0]);
      }
    }

    // check below (if not at last row)
    if (y < ymax - 1) {
      const startBelow = Math.max(xval - 1, 0);
      const endBelow = Math.min(xval + length + 1, ipt[y + 1].length);
      below = ipt[y + 1].slice(startBelow, endBelow).join("");
      if (below.match(nonPeriod)) {
        sum += Number(match[0]);
      }
    }

    // check left (if not at first column)
    if (xval > 0) {
      const startLeft = Math.max(xval - 1, 0);
      const endLeft = Math.min(xval, row.length);
      left = row.slice(startLeft, endLeft).join("");
      if (left.match(nonPeriod)) {
        sum += Number(match[0]);
      }
    }

    // check right (if not at last column)
    if (xval < xmax - 1) {
      const startRight = Math.max(xval + length, 0);
      const endRight = Math.min(xval + length + 1, row.length);
      right = row.slice(startRight, endRight).join("");
      if (right.match(nonPeriod)) {
        sum += Number(match[0]);
      }
    }
  }
});

console.log("Part 1: ", sum); //550064

// part 2

const ratios: Record<string, number[]> = {};

ipt.forEach((_, y) => {
  let [num, check, loc] = ["", false, ""];

  for (let x = 0; x < xmax; x++) {
    const current = ipt[y][x];

    if (current.match(number) && !check) [num, check, loc] = ["", true, ""];
    if ((x === xmax - 1 || !current.match(number)) && check) {
      if (loc) ratios[loc].push(parseInt(num + current.match(number)));
      check = false;
    }
    if (check) {
      num += current;

      for (let j = -1; j <= 1; j++) {
        for (let i = -1; i <= 1; i++) {
          if (i === 0 && j === 0) continue;
          if (y + j < 0 || y + j >= ymax || x + i < 0 || x + i >= xmax)
            continue;

          if (ipt[y + j][x + i] === "*") {
            loc = `${x + i},${y + j}`;
            ratios[loc] ||= [];
          }
        }
      }
    }
  }
});

const sum2 = Object.values(ratios)
  .filter((x) => x.length === 2)
  .reduce((a, c) => a + c[0] * c[1], 0);

console.log("Part 2: ", sum2); // 85010461
