export {};

const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .filter(Boolean)
  .map((line) => line.split(""));

const isEmpty = (a: number[], c: string[], i: number) =>
  c.includes("#") ? a : [...a, i];

const transpose = <T>(m: T[][]) => m[0].map((_, i) => m.map((x) => x[i]));

const solve = (ipt: string[][], mult: number) => {
  const emptyRows = ipt.reduce(isEmpty, [] as number[]);
  const emptyCols = transpose(ipt).reduce(isEmpty, [] as number[]);
  const galaxies = ipt.flatMap((r, rI) =>
    r.flatMap((ch, cI) => (ch === "#" ? [[rI, cI]] : []))
  );
  return galaxies.reduce((a, g1, i, galaxies) => {
    return (
      a +
      galaxies.slice(i + 1).reduce((a, g2) => {
        let d = Math.abs(g1[0] - g2[0]) + Math.abs(g1[1] - g2[1]);
        const [r1, r2] = [g1[0], g2[0]].sort((a, b) => a - b);
        const [c1, c2] = [g1[1], g2[1]].sort((a, b) => a - b);
        emptyRows.forEach((row) => r1 < row && row < r2 && (d += mult - 1));
        emptyCols.forEach((col) => c1 < col && col < c2 && (d += mult - 1));
        return a + d;
      }, 0)
    );
  }, 0);
};

console.log("part1:", solve(ipt, 2)); //9627977
console.log("part2:", solve(ipt, 1000000)); //644248339497
