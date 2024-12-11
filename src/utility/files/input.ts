import { existsSync } from "@std/fs/exists";

let inp = ""
if(existsSync("input.txt")){
    inp = Deno.readTextFileSync("input.txt")
}

export const rawInput = inp
export const input = inp.trimEnd()