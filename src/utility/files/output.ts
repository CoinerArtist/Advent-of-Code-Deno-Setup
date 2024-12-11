const enc = new TextEncoder();
let file: Deno.FsFile | null = null

let part = 1

export function output(text: any){
    if(!file){
        file = Deno.openSync("./output.txt", {write: true, create: true, truncate: true})
    }

    console.log(`Output ${part}: ${text}`)
    part++

    file.writeSync(enc.encode(text + "\n"))
}