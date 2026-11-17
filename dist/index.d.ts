export interface NumberFormatOptions { minimumFractionDigits?: number; maximumFractionDigits?: number; }
export interface INROptions extends NumberFormatOptions { currencyDisplay?: 'symbol' | 'code' | 'name' | 'narrowSymbol'; }
export interface GSTBreakdown { taxableAmount: number; gstRate: number; gstAmount: number; totalAmount: number; }
export function formatIndianNumber(value: number, options?: NumberFormatOptions): string;
export function formatINR(value: number, options?: INROptions): string;
export function numberToIndianWords(value: number): string;
export function addGST(amount: number, rate: number): GSTBreakdown;
export function removeGST(inclusiveAmount: number, rate: number): GSTBreakdown;
export function splitGST(gstAmount: number, rate?: number): { cgstAmount: number; sgstAmount: number; cgstRate?: number; sgstRate?: number; };
export function percentageOf(value: number, total: number): number;
export function formatPercentage(value: number, options?: NumberFormatOptions): string;
