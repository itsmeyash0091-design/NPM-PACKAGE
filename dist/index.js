/** Indian financial utilities (ES module). */

function assertFiniteNumber(value, name) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new TypeError(`${name} must be a finite number.`);
  }
}

function assertRate(rate) {
  assertFiniteNumber(rate, 'GST rate');
  if (rate < 0) throw new RangeError('GST rate cannot be negative.');
}

function round(value, decimals = 2) {
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

/** Formats a number using Indian digit grouping, e.g. 1234567.89 → 12,34,567.89. */
export function formatIndianNumber(value, options = {}) {
  assertFiniteNumber(value, 'Value');
  const { minimumFractionDigits = 0, maximumFractionDigits = 2 } = options;
  return new Intl.NumberFormat('en-IN', { minimumFractionDigits, maximumFractionDigits }).format(value);
}

/** Formats a value as Indian rupees. */
export function formatINR(value, options = {}) {
  assertFiniteNumber(value, 'Value');
  const { minimumFractionDigits = 2, maximumFractionDigits = 2, currencyDisplay = 'symbol' } = options;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', currencyDisplay, minimumFractionDigits, maximumFractionDigits
  }).format(value);
}

const SMALL = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
  'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

function underThousand(n) {
  const parts = [];
  if (n >= 100) { parts.push(`${SMALL[Math.floor(n / 100)]} Hundred`); n %= 100; }
  if (n >= 20) { parts.push(TENS[Math.floor(n / 10)]); if (n % 10) parts.push(SMALL[n % 10]); }
  else if (n) parts.push(SMALL[n]);
  return parts.join(' ');
}

/** Converts a safe integer into Indian English words (up to 99,99,99,99,99,999). */
export function numberToIndianWords(value) {
  assertFiniteNumber(value, 'Value');
  if (!Number.isSafeInteger(value)) throw new RangeError('Value must be a safe integer.');
  if (value === 0) return 'Zero';
  const sign = value < 0 ? 'Minus ' : '';
  let n = Math.abs(value);
  const groups = [[10000000, 'Crore'], [100000, 'Lakh'], [1000, 'Thousand'], [1, '']];
  const parts = [];
  for (const [size, label] of groups) {
    const group = Math.floor(n / size);
    if (group) { parts.push(underThousand(group) + (label ? ` ${label}` : '')); n %= size; }
  }
  return sign + parts.join(' ');
}

/** Returns the GST amount and final total for a tax-exclusive amount. */
export function addGST(amount, rate) {
  assertFiniteNumber(amount, 'Amount'); assertRate(rate);
  const gstAmount = round(amount * rate / 100);
  return { taxableAmount: amount, gstRate: rate, gstAmount, totalAmount: round(amount + gstAmount) };
}

/** Extracts the taxable amount and GST from a GST-inclusive amount. */
export function removeGST(inclusiveAmount, rate) {
  assertFiniteNumber(inclusiveAmount, 'Inclusive amount'); assertRate(rate);
  const taxableAmount = round(inclusiveAmount / (1 + rate / 100));
  return { taxableAmount, gstRate: rate, gstAmount: round(inclusiveAmount - taxableAmount), totalAmount: inclusiveAmount };
}

/** Splits GST equally into CGST and SGST for intra-state supplies. */
export function splitGST(gstAmount, rate) {
  assertFiniteNumber(gstAmount, 'GST amount');
  if (rate !== undefined) assertRate(rate);
  const cgstAmount = round(gstAmount / 2);
  const sgstAmount = round(gstAmount - cgstAmount);
  const result = { cgstAmount, sgstAmount };
  if (rate !== undefined) Object.assign(result, { cgstRate: rate / 2, sgstRate: rate / 2 });
  return result;
}

/** Calculates what percent `value` is of `total`. */
export function percentageOf(value, total) {
  assertFiniteNumber(value, 'Value'); assertFiniteNumber(total, 'Total');
  if (total === 0) throw new RangeError('Total cannot be zero.');
  return value / total * 100;
}

/** Formats a percentage value such as 18.5 as "18.50%". */
export function formatPercentage(value, options = {}) {
  assertFiniteNumber(value, 'Value');
  const { minimumFractionDigits = 0, maximumFractionDigits = 2 } = options;
  return new Intl.NumberFormat('en-IN', { style: 'percent', minimumFractionDigits, maximumFractionDigits }).format(value / 100);
}
