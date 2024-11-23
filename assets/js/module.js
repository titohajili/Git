

export const numberToKilo = function (number){

    const num$tr = String(number);
    if (num$tr.length <= 3) {
        return num$tr;
    } else if (num$tr.length >= 4 && num$tr.length <= 5) {
        return `${num$tr.slice(0, -3)}.${num$tr.slice(-3, -2)}k`;
    } else if (num$tr.length === 6){

        return `${num$tr.slice(0, -3)}k`;
    } else {

        return `${num$tr.slice(0, -6)}M`
    }
}