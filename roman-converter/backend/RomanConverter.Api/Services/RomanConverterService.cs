namespace RomanConverter.Api.Services;

public class RomanConverterService
{
    private static readonly (int Value, string Symbol)[] RomanTable =
    [
        (1000, "M"),
        (900,  "CM"),
        (500,  "D"),
        (400,  "CD"),
        (100,  "C"),
        (90,   "XC"),
        (50,   "L"),
        (40,   "XL"),
        (10,   "X"),
        (9,    "IX"),
        (5,    "V"),
        (4,    "IV"),
        (1,    "I"),
    ];

    private static readonly Dictionary<char, int> CharValue = new()
    {
        { 'I', 1    },
        { 'V', 5    },
        { 'X', 10   },
        { 'L', 50   },
        { 'C', 100  },
        { 'D', 500  },
        { 'M', 1000 },
    };

    public string ToRoman(int number)
    {
        if (number < 1 || number > 3999)
            throw new ArgumentOutOfRangeException(nameof(number), "Number must be between 1 and 3999.");

        var result = new System.Text.StringBuilder();
        foreach (var (value, symbol) in RomanTable)
        {
            while (number >= value)
            {
                result.Append(symbol);
                number -= value;
            }
        }
        return result.ToString();
    }

    public int ToInteger(string roman)
    {
        if (string.IsNullOrWhiteSpace(roman))
            throw new ArgumentException("Roman numeral cannot be empty.", nameof(roman));

        roman = roman.ToUpperInvariant().Trim();

        foreach (char c in roman)
        {
            if (!CharValue.ContainsKey(c))
                throw new ArgumentException($"Invalid Roman numeral character: '{c}'", nameof(roman));
        }

        int total = 0;
        for (int i = 0; i < roman.Length; i++)
        {
            int current = CharValue[roman[i]];
            int next    = (i + 1 < roman.Length) ? CharValue[roman[i + 1]] : 0;

            if (current < next)
                total -= current;
            else
                total += current;
        }

        if (total < 1 || total > 3999)
            throw new ArgumentException("Roman numeral is out of range (must represent 1-3999).", nameof(roman));

        // Cross-validate: reject non-canonical forms like IIII, VV, etc.
        if (ToRoman(total) != roman)
            throw new ArgumentException($"'{roman}' is not a valid canonical Roman numeral.", nameof(roman));

        return total;
    }
}
