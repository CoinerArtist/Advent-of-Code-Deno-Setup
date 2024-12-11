import { getInput, getPuzzle, submitAnswer } from "./request.ts";
import { toyear, today, isValidDate } from "./day.ts"

import { copySync, existsSync } from "@std/fs";
import { copy, readerFromStreamReader } from "@std/io";
import { red } from "@std/fmt/colors";

const session = Deno.readTextFileSync("./.session").trim()

function create(year: number, day: number){
    if(!isValidDate(year, day)) Deno.exit(1)

    Deno.mkdirSync(`./${year}/${day}`, {recursive: true})

    getPuzzle(year, day, session).then(text => Deno.writeTextFile(`./${year}/${day}/puzzle.md`, text))
    .then(() => console.log(`Dowloaded ./${year}/${day}/puzzle.md`))

    getInput(year, day, session).then(text => Deno.writeTextFile(`./${year}/${day}/input.txt`, text))
    .then(() => console.log(`Dowloaded ./${year}/${day}/input.txt`))

    if(!existsSync(`./${year}/${day}/main.ts`)){ 
        copySync("./src/template.ts", `./${year}/${day}/main.ts`)
        console.log(`Created ./${year}/${day}/main.ts`)
    }
}

async function run(year: number, day: number){
    if(!existsSync(`./${year}/${day}/main.ts`)){
        console.error(red("main.ts not found."))
        Deno.exit(1)
    }

    Deno.chdir(`./${year}/${day}`)
    const cmd = new Deno.Command(Deno.execPath(), {args: ["--allow-read", "--allow-write", "main.ts"], stdout: "piped", stderr: "piped"}).spawn()
    
    copy(readerFromStreamReader(cmd.stdout.getReader()), Deno.stdout);
    copy(readerFromStreamReader(cmd.stderr.getReader()), Deno.stderr);

    const {code} = await cmd.status
    console.log("Done.")
    Deno.exit(code)
}

async function submit(year: number, day: number){
    if(!existsSync(`./${year}/${day}/output.txt`)){
        console.error(red("output.txt not found."))
        Deno.exit(1)
    }

    const text = Deno.readTextFileSync(`./${year}/${day}/output.txt`).trim()
    const output = text.split("\n")

    if(output.length > 2){
        console.error(red("output.txt is incorrectly formated."))
        Deno.exit(1)
    }

    const part = output.length
    const answer = output[part - 1]

    console.log(`Submitted : ${answer}`)

    const response = await submitAnswer(year, day, answer, part, session)
    console.log(response)

    if(response.includes("That's the right answer!")){
        getPuzzle(year, day, session).then(text => Deno.writeTextFile(`./${year}/${day}/puzzle.md`, text))
    }
}

// --- Main --- //

const command: Record<string, (year: number, day: number) => void> = { create, run, submit, c: create, r: run, s: submit }

function help(){
    console.log(red("Invalid command. Look at README.md"))
}

if(Deno.args.length === 0){
    help()
} else if(Deno.args.length === 1){
    const [ cmd ] = Deno.args 
    if(command[cmd]) command[cmd](toyear, today)
    else help()
} else {
    if(Deno.args.length > 3){
        help()
    } else if(command[Deno.args[0]]){
        const [cmd, year, day] = Deno.args
        command[cmd](parseInt(year), parseInt(day))
    } else {
        const [year, day, cmd] = Deno.args
        if(command[cmd]) command[cmd](parseInt(year), parseInt(day))
        else help()
    }
}