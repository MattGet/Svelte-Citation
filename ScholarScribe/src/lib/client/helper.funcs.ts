import { get } from "svelte/store";
import { sourceList } from "../../stores/sources";

// "suffixMe" function definition
export function suffixMe(num: number) {
    if (num < 1) return '';
    // remainder operations dealing with edge case
    const j = num % 10,
        k = num % 100;
    // return respective suffix accordingly
    if (j == 1 && k != 11) {
        return `${num}st`;
    } else if (j == 2 && k != 12) {
        return `${num}nd`;
    } else if (j == 3 && k != 13) {
        return `${num}rd`;
    } else {
        return `${num}th`;
    }
}

export async function getUser(userid: string) {
    let res = await fetch('/api/users/userid');
    let data = res.json();
    return data;
}

export const Months = {
    January: 'January',
    Febuary: 'Febuary',
    March: 'March',
    April: 'April',
    June: 'June',
    July: 'July',
    August: 'August',
    Spetember: 'September',
    October: 'October',
    November: 'November',
    December: 'December',
}

// Function to get names of selected items
function getSelectedSources() {
    const sources = get(sourceList);
    let sourceArray: string[] = Object.keys(sources).filter((key) => sources[key] === true);
    //console.log(`Selecting: ${sourceArray}`);
    return sourceArray;
}

export const selectedSources = () => getSelectedSources();