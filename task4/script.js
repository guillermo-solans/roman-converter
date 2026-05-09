const ROMAN_TABLE = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
];

const CHAR_VALUES = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };

function toRoman(number) {
    if (!Number.isInteger(number) || number < 1 || number > 3999) {
        throw new RangeError('Number must be between 1 and 3999.');
    }
    let result = '';
    let n = number;
    for (const [value, symbol] of ROMAN_TABLE) {
        while (n >= value) {
            result += symbol;
            n -= value;
        }
    }
    return result;
}

function toInteger(roman) {
    if (roman === null || roman === undefined || typeof roman !== 'string') {
        throw new Error('Input must be a non-null string.');
    }
    roman = roman.trim().toUpperCase();
    if (roman.length === 0) {
        throw new Error('Roman numeral cannot be empty.');
    }
    for (const c of roman) {
        if (!(c in CHAR_VALUES)) {
            throw new Error(`Invalid Roman numeral character: '${c}'`);
        }
    }
    let total = 0;
    for (let i = 0; i < roman.length; i++) {
        const current = CHAR_VALUES[roman[i]];
        const next = i + 1 < roman.length ? CHAR_VALUES[roman[i + 1]] : 0;
        if (current < next) {
            total -= current;
        } else {
            total += current;
        }
    }
    if (total < 1 || total > 3999) {
        throw new RangeError('Roman numeral is out of range (must represent 1–3999).');
    }
    if (toRoman(total) !== roman) {
        throw new Error(`'${roman}' is not a valid canonical Roman numeral.`);
    }
    return total;
}
