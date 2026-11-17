# rupee-format

Small, dependency-free financial utilities for Indian JavaScript applications: INR formatting, lakh/crore grouping, GST calculations, and percentages.

Source code: [itsmeyash0091-design/NPM-PACKAGE](https://github.com/itsmeyash0091-design/NPM-PACKAGE)

> Status: built locally. The npm registry returned **not found** for `rupee-format` on 17 November 2026, but no package has been published.

## Install (after you publish)

```bash
npm install rupee-format
```

## Use it

```js
// ESM
import { formatINR, addGST, splitGST } from 'rupee-format';

formatINR(1234567.8);             // '₹12,34,567.80'
addGST(1000, 18);                 // { taxableAmount: 1000, gstRate: 18, gstAmount: 180, totalAmount: 1180 }
splitGST(180, 18);                // { cgstAmount: 90, sgstAmount: 90, cgstRate: 9, sgstRate: 9 }
```

```js
// CommonJS
const { formatINR } = require('rupee-format');
formatINR(50000);                 // '₹50,000.00'
```

## API

### `formatIndianNumber(value, options?)`

Formats numeric values with Indian digit grouping. `formatIndianNumber(1234567.89)` returns `'12,34,567.89'`.

### `formatINR(value, options?)`

Formats INR currency. Fraction options and `currencyDisplay` may be passed to the native formatter.

### `numberToIndianWords(integer)`

Converts safe integers to Indian English words: `numberToIndianWords(12500000)` returns `'One Crore Twenty Five Lakh'`.

### GST

`addGST(amount, rate)` calculates tax on a tax-exclusive amount. `removeGST(inclusiveAmount, rate)` extracts tax from an inclusive amount. `splitGST(gstAmount, rate?)` divides GST into CGST and SGST; pass the rate to also receive their rates.

### Percentages

`percentageOf(value, total)` returns the numeric percentage. `formatPercentage(value)` turns a percentage value into display text, so `formatPercentage(18.5)` returns `'18.5%'`.

## Validation and rounding

All public functions accept finite JavaScript numbers only; invalid values throw a `TypeError`. GST figures are rounded to two decimal places. `numberToIndianWords` only accepts safe integers.

## Development

```bash
npm test       # run the automated tests
npm run demo   # see example output
```

`dist/index.js` is the ES module entry, `dist/index.cjs` supports `require`, and `dist/index.d.ts` supplies TypeScript types.
