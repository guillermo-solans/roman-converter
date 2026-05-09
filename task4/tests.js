const { expect } = chai;

// ─── toRoman ──────────────────────────────────────────────────────────────────

describe('toRoman', () => {

    describe('Invalid inputs', () => {
        it('TC-R-01: toRoman(-1) throws — negative number (EP-R2)', () => {
            expect(() => toRoman(-1)).to.throw();
        });
        it('TC-R-02: toRoman(0) throws — just below lower boundary (BVA)', () => {
            expect(() => toRoman(0)).to.throw();
        });
        it('TC-R-06: toRoman(4000) throws — just above upper boundary (BVA)', () => {
            expect(() => toRoman(4000)).to.throw();
        });
    });

    describe('Valid inputs', () => {
        it('TC-R-03: toRoman(1) === "I" — lower boundary (BVA)', () => {
            expect(toRoman(1)).to.equal('I');
        });
        it('TC-R-04: toRoman(2) === "II" — just above lower boundary (BVA)', () => {
            expect(toRoman(2)).to.equal('II');
        });
        it('TC-R-05: toRoman(3999) === "MMMCMXCIX" — upper boundary (BVA)', () => {
            expect(toRoman(3999)).to.equal('MMMCMXCIX');
        });
        it('TC-R-07: toRoman(4) === "IV" — subtractive pair (EP-R1)', () => {
            expect(toRoman(4)).to.equal('IV');
        });
        it('TC-R-08: toRoman(3) === "III" — maximum legal repetition (EP-R1)', () => {
            expect(toRoman(3)).to.equal('III');
        });
    });

});

// ─── toInteger ────────────────────────────────────────────────────────────────

describe('toInteger', () => {

    describe('Valid inputs', () => {
        it('TC-I-01: toInteger("I") === 1 — lower boundary (BVA)', () => {
            expect(toInteger('I')).to.equal(1);
        });
        it('TC-I-02: toInteger("MMMCMXCIX") === 3999 — upper boundary (BVA)', () => {
            expect(toInteger('MMMCMXCIX')).to.equal(3999);
        });
        it('TC-I-03: toInteger("IV") === 4 — subtractive pair IV (EP-I1)', () => {
            expect(toInteger('IV')).to.equal(4);
        });
        it('TC-I-04: toInteger("IX") === 9 — subtractive pair IX (EP-I1)', () => {
            expect(toInteger('IX')).to.equal(9);
        });
        it('TC-I-05: toInteger("XL") === 40 — subtractive pair XL (EP-I1)', () => {
            expect(toInteger('XL')).to.equal(40);
        });
        it('TC-I-06: toInteger("CM") === 900 — subtractive pair CM (EP-I1)', () => {
            expect(toInteger('CM')).to.equal(900);
        });
        it('TC-I-07: toInteger("xlii") === 42 — lowercase normalisation (EP-I1)', () => {
            expect(toInteger('xlii')).to.equal(42);
        });
        it('TC-I-08: toInteger("  XIV  ") === 14 — leading/trailing spaces (EP-I1)', () => {
            expect(toInteger('  XIV  ')).to.equal(14);
        });
        it('TC-I-15: toInteger("MCMXCIX") === 1999 — complex multi-symbol (EP-I1)', () => {
            expect(toInteger('MCMXCIX')).to.equal(1999);
        });
    });

    describe('Invalid inputs', () => {
        it('TC-I-09: toInteger("") throws — empty string (EP-I2)', () => {
            expect(() => toInteger('')).to.throw();
        });
        it('TC-I-10: toInteger(null) throws — null input (EP-I2)', () => {
            expect(() => toInteger(null)).to.throw();
        });
        it('TC-I-11: toInteger("ABC") throws — invalid characters (EP-I3)', () => {
            expect(() => toInteger('ABC')).to.throw();
        });
        it('TC-I-12: toInteger("IIII") throws — illegal repetition (EP-I4)', () => {
            expect(() => toInteger('IIII')).to.throw();
        });
        it('TC-I-13: toInteger("IC") throws — illegal subtractive pair (EP-I4)', () => {
            expect(() => toInteger('IC')).to.throw();
        });
        it('TC-I-14: toInteger("IIX") throws — two smaller symbols before larger (EP-I4)', () => {
            expect(() => toInteger('IIX')).to.throw();
        });
    });

});
