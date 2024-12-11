import { Console } from "node:console";
import { createWriteStream, WriteStream } from "node:fs"

const consoles: Record<string, [Console, WriteStream]> = {}

export function log(value: any, outFile="console"){
    if(!consoles[outFile]){ 
        const stream = createWriteStream(outFile + ".txt")
        consoles[outFile] = [new Console(stream, stream), stream]
    }

    consoles[outFile][0].log(value)
}