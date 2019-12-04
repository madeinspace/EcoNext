import numeral from 'numeral';

export const formatNumber = number => numeral(number).format('0,0');
export const formatPercent = (number, zero = '0') => (number ? numeral(number).format('0,0.0') : zero);
export const formatChangeNumber = (number, zero = '0') => (number ? numeral(number).format('+0,0') : zero);
export const formatChangePercent = (number, zero = '0') => (number ? numeral(number).format('+0,0.00') : zero);
export const formatShortDecimal = (number, zero = '0') => (number ? numeral(number).format('0.0') : zero);
export const formatMillionsCurrency = (number, zero = '0') => (number ? numeral(number).format('$0.0a') : zero);
