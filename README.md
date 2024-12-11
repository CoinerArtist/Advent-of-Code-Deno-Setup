# Advent of Code Deno Setup
The setup that [I](https://coinerartist.neocities.org/) use to solve [AoC](https://adventofcode.com) puzzles using Typescript. 

## Requirement
- [Deno](https://docs.deno.com/runtime/getting_started/installation/)

## Session Cookie
Write your AoC session cookie in `.session` (Use your browser's devtools on the AoC website to find it.)

## Usage
```
deno task aoc [command] [year day]
```
or
```
deno task aoc [year day] [command]
```

Uses the current day if `year` and `day` are omitted.

## Commands

### `create` / `c`
Creates a `year/day` directory and downloads your input and the puzzle description as `year/day/input.txt` and `year/day/puzzle.md`.  
If there is no `year/day/main.ts`, creates it by copying `src/template.ts`.

### `run` / `r`
Runs `year/day/main.ts` with Deno.

### `submit` / `s`
Submits the last line of `year/day/output.txt`.  
If there is only one line, submits to part 1.  
If there is two line, submits to part 2.

If your answer is correct, `year/day/puzzle.md` is updated to include the next part.  
(If using the VSCode .md preview, you have to reopen it in the regular editor to update.)

## Utility
I've included some useful methods/constants in the module `utility`.  
Feel free to add your own by changing `src/utility/index.ts`.

- `rawinput`: The content of `year/day/input.txt`.
- `input`: The content of `year/day/input.txt` without trailing whitespace.
- `output`: Writes a line to `year/day/output.txt`. Should not be called more than twice.
- `log`: Like `console.log`, but writes to a file (default: `console.txt`) instead of `stdout`.