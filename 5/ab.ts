export {};

const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n\n")
  .filter(Boolean)
  .map((line) =>
    line
      .split("\n")
      .filter(Boolean)
      .map((item) => item.trim().split(/\s+/))
  )
  .map((group, i) => {
    return {
      field: group[0][0].replace(":", ""),
      map:
        i === 0
          ? group[0].slice(1).map((x) => +x)
          : group
              .slice(1)
              .map((x) => x.map((y) => +y))
              .map(([d, s, l]) => ({
                dest: [d, d + l],
                source: [s, s + l],
              })),
    };
  })
  .reduce((a, b) => {
    return {
      ...a,
      [b.field]: b.map,
    };
  }, {}) as { seeds: number[] } & {
  [key in Step]: {
    dest: Range;
    source: Range;
  }[];
};

// part 1
const { seeds, ...rules } = ipt;
const steps = [
  "seed-to-soil",
  "soil-to-fertilizer",
  "fertilizer-to-water",
  "water-to-light",
  "light-to-temperature",
  "temperature-to-humidity",
  "humidity-to-location",
] as const;

type Step = (typeof steps)[number];

const applyStep = (step: Step, seed: number) => {
  const ranges = rules[step];
  const range = ranges.find((range: RangeMap) => {
    return range.source[0] <= seed && seed <= range.source[1];
  });

  if (!range) return seed;
  return range.dest[0] + seed - range.source[0];
};

const res = seeds.map((seed: number) => {
  return steps.reduce((a, b) => applyStep(b, a), seed);
});
console.log("Part 1", Math.min(...res)); //35, 318728750

// part 2

type Range = [number, number];
type RangeMap = {
  dest: Range;
  source: Range;
};

const affectedSeeds = [...steps]
  .reverse()
  .reduce((a: number[], b: Step) => {
    const data = rules[b];
    return [
      ...a.map((dest) => {
        const data = rules[b];
        const result = data.find((i) => i.dest[0] <= dest && i.dest[1] >= dest);
        if (!result) return dest;
        return dest - result.dest[0] + result.source[0];
      }),
      ...data.flatMap((x: RangeMap) => [x.source[0], x.source[1] + 1]),
    ];
  }, [] as number[])
  .sort((a: number, b: number) => a - b);

const res2 = seeds
  .reduce((acc: number[][], curr: number, index: number) => {
    index % 2 === 0 ? acc.push([curr]) : acc[acc.length - 1].push(curr);
    return acc;
  }, [])
  .flatMap(([start, length]) => {
    const arr: number[] = [];
    for (
      let i = start;
      i < start + length;
      i = affectedSeeds.find((p: number) => p > i)!
    ) {
      arr.push(i);
    }
    return arr;
  })
  .map((seed: number) => steps.reduce((a, b) => applyStep(b, a), seed));

console.log("Part 2", Math.min(...res2)); //46, 37384986
