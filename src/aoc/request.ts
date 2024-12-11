import { red } from "@std/fmt/colors"

export async function getPuzzle(year: number, day: number, session: string){
    const url = `https://adventofcode.com/${year}/day/${day}`

    const request = new Request(url, {
        method: "GET",
        headers: {
            Cookie: `session=${session}`
        }
    })

    const rawHTML = await (await fetch(request)).text()
    const match = rawHTML.match(/<main>([\s\S]*?)<\/main>/)

    if(match === null){ 
        console.error(red(`Received unexpected response:\n${rawHTML}`))
        Deno.exit(1)
    }

    const puzzleHTML = match[1]

    const puzzleMD = puzzleHTML
        .replaceAll(/<p>|<\/li>|<ul>|<\/article>|<\/?span.*?>|<p class="day-success">[\s\S]+?<\/p>|<style>[\s\S]+?<\/style>/g, "")
        .replaceAll(/<\/p>|<\/ul>|<article class="day-desc">/g, "\n")
        .replaceAll(/<code><a href="(.+?)".*?>(.+?)<\/a><\/code>/g, "[`$2`]($1)")
        .replaceAll(/<a href="(.+?)".*?>(.+?)<\/a>/g, "[$2]($1)")
        .replaceAll(/<pre><code>|<\/code><\/pre>/g, "```\n")
        .replaceAll(/<\/h2>/g, "\n----------\n\n")
        .replaceAll(/<\/?em.*?>/g, "*")
        .replaceAll(/<\/?code>/g, "`")
        .replaceAll(/<h2.*?>/g, "\\")
        .replaceAll(/<li>/g, "* ")
        .replaceAll(/(To begin, \[get your puzzle input\]|<form method="post"|At this point, you should \[return to your Advent calendar\]|At this point, all that is left is for you to \[admire your Advent calendar\])[\s\S]+/g, "")
        .replaceAll(/\n\n\n+/g, "\n\n").replaceAll(/  +/g, " ").trim()

    return puzzleMD
}

export async function getInput(year: number, day: number, session: string){
    const url = `https://adventofcode.com/${year}/day/${day}/input`

    const request = new Request(url, {
        method: "GET",
        headers: {
            Cookie: `session=${session}`
        }
    })

    return await (await fetch(request)).text()
}

export async function submitAnswer(year: number, day: number, answer: string, part: number, session: string){
    const url = `https://adventofcode.com/${year}/day/${day}/answer`

    const request = new Request(url, {
        method: "POST",
        headers: {
            Cookie: `session=${session}`,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `level=${part}&answer=${answer}`
    })

    const rawHTML = await (await fetch(request)).text()
    const match = rawHTML.match(/<main>([\s\S]*?)<\/main>/)

    if(match === null){ 
        console.error(red(`Received unexpected response:\n${rawHTML}`))
        Deno.exit(1)
    }

    const text = match[1]
        .replaceAll(/<\/?article>|<\/?p>|<\/?a.*?>|<\/?span.*?>/g, "")
        .replaceAll(/You can \[Shareon[\s\S]*/g, "")
        .replaceAll(/  +/g, "\n").trim()

    return `\n${text}\n`
}