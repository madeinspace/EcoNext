import numeral from 'numeral';
const REGEX_CHANGE_CURRENCY = /^(\$\d*)/;
export const formatNumber = number => (number != null ? numeral(number).format('0,0') : '--'); // ie: 3,326,812
export const formatPercent = (number, zero = '0') => (number ? numeral(number).format('0,0.0') : zero);
export const formatChangeNumber = (number, zero = '0') => (number ? numeral(number).format('+0,0.00') : zero); //ie: +3.21
export const formatChangeInt = (number, zero = '0') => (number ? numeral(number).format('+0,0') : zero);
export const formatCurrency = number => (number != null ? numeral(number).format('$0,0') : '--');
export const formatChangeCurrency = (number, zero = '0') =>
  number
    ? `${REGEX_CHANGE_CURRENCY.test(numeral(number).format('$0,0')) ? '+' : ''}${numeral(number).format('$0,0')}`
    : zero;
export const formatChangePercent = (number, zero = '0') => (number ? numeral(number).format('+0,0.00') : zero);
export const formatShortDecimal = (number, zero = '0') => (number ? numeral(number).format('0.00') : zero); // ie: 4.37
export const formatMillionsCurrency = (number, zero = '0') => (number ? numeral(number).format('$0a') : zero);
export const formatMillionsCurrencyNoRounding = (number, zero = '0') =>
  number ? numeral(number).format('$0.000a') : zero;
