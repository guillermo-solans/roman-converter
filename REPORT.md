# CI/CD Pipeline — Roman Numeral Converter

**Guillermo Solans Millá** · alu190416  
**Live website:** https://guillermo-solans.github.io/guillermo.solans.alu190416/

---

## What the System Achieves

### Automated Testing on Every Push

Every push to any branch triggers 23 automated unit tests covering the Roman numeral conversion logic. The test suite validates both `toRoman` and `toInteger` functions across boundary values, equivalence partitions, and error conditions. A push containing broken logic will fail the pipeline and block deployment.

The pipeline blocks a deploy when a test fails. No code reaches the live website without passing all 23 tests first.

### Automated Linting on Every Push

ESLint runs in parallel with the test suite on every push. It enforces code quality rules including mandatory semicolons, `const`/`let` over `var`, and strict equality checks. Linting failures block deployment just like test failures.

### Continuous Deployment to GitHub Pages

Any push to `main` that passes both tests and linting is automatically deployed to GitHub Pages within 2 minutes. The live website is a fully functional Roman numeral converter — users can convert integers (1–3999) to Roman numerals and vice versa.

The deployment is gated: if either the test or lint job fails, the deploy job never runs. This guarantees that the live website always reflects tested, quality-checked code.

---

## Pipeline Architecture

```
push (any branch)
  ├── Test  (23 Mocha/Chai unit tests)
  └── Lint  (ESLint static analysis)
         │
         ▼
push (main only, both jobs green)
  └── Deploy (GitHub Pages)
```

The test and lint jobs run **in parallel** to minimize feedback time. The deploy job requires **both** to succeed and only triggers on the `main` branch.

---

## Test Coverage Summary

| Function     | Test Cases | Techniques Applied              |
|------------- |-----------:|---------------------------------|
| `toRoman`    |          8 | BVA, Equivalence Partitioning   |
| `toInteger`  |         15 | BVA, EP, Edge Cases, Canonical  |
| **Total**    |     **23** |                                 |

Tests cover: boundary values (0, 1, 2, 3999, 4000), subtractive pairs (IV, IX, XL, CM), invalid characters, illegal repetitions (IIII), non-canonical forms (IC, IIX), null/empty inputs, lowercase normalization, and whitespace trimming.

---

## Evidence

### Pipeline Execution (All Jobs Green)

*Screenshot of GitHub Actions showing test, lint, and deploy jobs passing.*

### Test Results in CI

```
  toRoman
    ✔ TC-R-01: toRoman(-1) throws — negative number
    ✔ TC-R-02: toRoman(0) throws — just below lower boundary
    ✔ TC-R-03: toRoman(1) === "I" — lower boundary
    ✔ TC-R-04: toRoman(2) === "II" — just above lower boundary
    ✔ TC-R-05: toRoman(3999) === "MMMCMXCIX" — upper boundary
    ✔ TC-R-06: toRoman(4000) throws — just above upper boundary
    ✔ TC-R-07: toRoman(4) === "IV" — subtractive pair
    ✔ TC-R-08: toRoman(3) === "III" — maximum legal repetition

  toInteger
    ✔ TC-I-01 through TC-I-15: all passing

  23 passing
```

### Live Website

The converter is accessible at the URL above. It provides two-way conversion between integers and Roman numerals with input validation and error messages.

### Failed Pipeline Blocking Deploy

*Screenshot showing a failing test preventing deployment to GitHub Pages.*
