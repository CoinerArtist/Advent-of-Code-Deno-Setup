import { red } from "@std/fmt/colors"

const date = new Date(new Date().toLocaleString("en-US", {timeZone: "EST"}))

export const toyear = date.getFullYear()
export const today = date.getDate()
const month = date.getMonth()

export function isValidDate(year: number, day: number){
    if(year < 2015 || year > toyear || (year == toyear && month != 11) || isNaN(year)){
        console.error(red("Invalid Year."))
        return false
    } else if((day < 1 || day > 25) || (year == toyear && day > today) || isNaN(day)){
        console.error(red("Invalid Day."))
        return false
    }
    return true
}