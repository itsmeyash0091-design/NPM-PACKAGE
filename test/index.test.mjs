import test from 'node:test';
import assert from 'node:assert/strict';
import * as rupee from '../dist/index.js';
import cjs from '../dist/index.cjs';

test('formats INR and Indian grouping', () => {
  assert.equal(rupee.formatIndianNumber(1234567.89), '12,34,567.89');
  assert.equal(rupee.formatINR(1234567.8), '₹12,34,567.80');
});
test('converts safe integer to Indian words', () => assert.equal(rupee.numberToIndianWords(12345678), 'One Crore Twenty Three Lakh Forty Five Thousand Six Hundred Seventy Eight'));
test('calculates and removes GST', () => {
  assert.deepEqual(rupee.addGST(1000, 18), { taxableAmount: 1000, gstRate: 18, gstAmount: 180, totalAmount: 1180 });
  assert.deepEqual(rupee.removeGST(1180, 18), { taxableAmount: 1000, gstRate: 18, gstAmount: 180, totalAmount: 1180 });
  assert.deepEqual(rupee.splitGST(180, 18), { cgstAmount: 90, sgstAmount: 90, cgstRate: 9, sgstRate: 9 });
});
test('calculates and formats percentages', () => { assert.equal(rupee.percentageOf(45, 200), 22.5); assert.equal(rupee.formatPercentage(22.5), '22.5%'); });
test('rejects invalid input', () => assert.throws(() => rupee.addGST('1000', 18), TypeError));
test('CommonJS export works', () => assert.equal(cjs.formatINR(100), '₹100.00'));
