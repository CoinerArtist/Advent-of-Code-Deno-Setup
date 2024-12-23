const enc = new TextEncoder()
let files: Record<string, Deno.FsFile> = {}

export function log(value: any, outFile="console", options: Deno.InspectOptions = {}){
    if(files[outFile] === undefined){
        files[outFile] = Deno.openSync(outFile + ".txt", {write: true, create: true, truncate: true})
    }

    files[outFile].writeSync(enc.encode(Deno.inspect(value, options) + "\n"))
}