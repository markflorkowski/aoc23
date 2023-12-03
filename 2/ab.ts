export {};

const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .filter(Boolean)
  .map((i) => {
    const [game, sets] = i.split(":");
    return {
      game: Number(game.match(/\d+/g)),
      sets: sets.split(";").map((set) =>
        set
          .split(",")
          .map((x) => {
            const [count, color] = x.trim().split(" ");
            return { [color]: Number(count) };
          })
          .reduce((a, c) => ({ ...a, ...c }), {})
      ),
    };
  });

const [red, green, blue] = [12, 13, 14];

// Part 1
const res = ipt
  .filter((game) =>
    game.sets.every(
      (set) =>
        (!set["red"] || set["red"] <= red) &&
        (!set["green"] || set["green"] <= green) &&
        (!set["blue"] || set["blue"] <= blue)
    )
  )
  .reduce((a, c) => {
    return a + c.game;
  }, 0);

console.log("Part 1: ", res); //2600

// part 2
const res2 = ipt
  .map((game) => {
    return ["red", "green", "blue"]
      .map((color) =>
        game.sets
          .map((set) => set[color] ?? 0)
          .reduce((a, c) => Math.max(a, c), 0)
      )
      .reduce((acc, curr) => acc * curr, 1);
  })
  .reduce((a, c) => a + c, 0);

console.log("Part 2: ", res2); // 86036
