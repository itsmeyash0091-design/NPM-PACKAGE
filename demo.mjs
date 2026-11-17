import { formatINR, formatIndianNumber, numberToIndianWords, addGST, splitGST, percentageOf, formatPercentage } from './dist/index.js';

const amount = 1234567.89;
console.log('Indian number:', formatIndianNumber(amount));
console.log('Currency:', formatINR(amount));
console.log('Words:', numberToIndianWords(12345678));
const invoice = addGST(50000, 18);
console.log('Invoice:', invoice, 'GST split:', splitGST(invoice.gstAmount, 18));
console.log('Completed:', formatPercentage(percentageOf(47, 80)));
