
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