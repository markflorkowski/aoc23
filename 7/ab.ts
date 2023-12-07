export {};

const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .filter(Boolean)
  .map((line) => line.split(/\s+/))
  .map((l) => [l[0].split(""), +l[1]]) as [string[], number][];

// part1
const strength = "AKQJT98765432".split("").reverse();

const calculateValue = (hand: string[], jCount = 0) => {
  const values = Object.values(
    hand.reduce((a, c) => {
      a[c] = (a[c] || 0) + 1;
      return a;
    }, {} as Record<string, number>)
  ).sort((a, b) => b - a);

  const total = jCount < 5 ? values[0] + jCount : 5;
  if (total === 5) return 5; // five of a kind
  if (total === 4) return 4; // four of a kind
  if (total === 3 && values[1] === 2) return 3; // full house
  if (total === 3) return 2; // three of a kind
  if (values[0] === 2 && values[1] === 2) return 1; // two pairs
  if (total === 2) return 0; // one pair
  return -1;
};

const sort = (
  a: { value: number; hand: string[]; bid: number },
  b: { value: number; hand: string[]; bid: number },
  order: string[]
) => {
  if (a.value !== b.value) return a.value - b.value;
  return (
    a.hand
      .map((_, i) => order.indexOf(a.hand[i]) - order.indexOf(b.hand[i]))
      .find((comp) => comp !== 0) || 0
  );
};

const res = ipt
  .map(([hand, bid]) => {
    const value = calculateValue(hand);
    return { hand, bid, value };
  })
  .sort((a, b) => sort(a, b, strength))
  .reduce((a, c, i) => a + c.bid * (i + 1), 0);

console.log("part1:", res); //253638586

// part 2

const strength2 = "AKQT98765432J".split("").reverse();

const res2 = ipt
  .map(([hand, bid]) => {
    const value = calculateValue(
      hand.filter((c) => c !== "J"),
      hand.filter((c) => c === "J").length
    );
    return { hand, bid, value };
  })
  .sort((a, b) => sort(a, b, strength2))
  .reduce((a, c, i) => a + c.bid * (i + 1), 0);

console.log("part2:", res2); //253253225
