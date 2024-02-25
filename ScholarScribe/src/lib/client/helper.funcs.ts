// "suffixMe" function definition
export function suffixMe(num: number) {
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