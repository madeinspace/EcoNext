import _ from 'lodash';

/* #region  detectIE */
export const detectIE = () => {
  const ua: any = window.navigator.userAgent;

  // Test values; Uncomment to check result …

  // IE 10
  // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

  // IE 11
  // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

  // Edge 12 (Spartan)
  // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

  // Edge 13
  // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

  const msie: any = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  const trident: any = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    const rv: any = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  const edge: any = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return 0;
};
/* #endregion */

/* #region  query string utils */
export const getHashParams = () => {
  const hashParams = {};
  let e = undefined;
  const a = /\+/g; // Regex for replacing addition symbol with a space
  const r = /([^&;=]+)=?([^&;]*)/g;
  const d = s => decodeURIComponent(s.replace(a, ' '));
  const q = window.location.hash.substring(1);

  while ((e = r.exec(q))) {
    hashParams[d(e[1])] = d(e[2]);
  }
  return hashParams;
};
export const getParameterByName = (name: string, url: string = window.location.href): string => {
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex: any = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);
  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};
/* #endregion */

/* #region  natural sorting */
export function naturalSort(a, b) {
  const re: any = /(^([+\-]?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?(?=\D|\s|$))|^0x[\da-fA-F]+$|\d+)/g;
  const sre: any = /^\s+|\s+$/g;
  const snre: any = /\s+/g;
  const dre: any = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/;
  const hre: any = /^0x[0-9a-f]+$/i;
  const ore: any = /^0/;
  const i: any = s => {
    return (('' + s).toLowerCase() || '' + s).replace(sre, '');
  };
  const x: any = i(a);
  const y: any = i(b);
  const xN: any = x
    .replace(re, '\0$1\0')
    .replace(/\0$/, '')
    .replace(/^\0/, '')
    .split('\0');
  const yN = y
    .replace(re, '\0$1\0')
    .replace(/\0$/, '')
    .replace(/^\0/, '')
    .split('\0');
  const mhre: any = x.match(hre);
  const yhre: any = y.match(hre);
  const xD: any = parseInt(mhre, 16) || (xN.length !== 1 && Date.parse(x));
  const yD: any = parseInt(yhre, 16) || (xD && y.match(dre) && Date.parse(y)) || null;
  const normChunk: any = (s, l) => {
    return ((!s.match(ore) || l === 1) && parseFloat(s)) || s.replace(snre, ' ').replace(sre, '') || 0;
  };
  let oFxNcL: any;
  let oFyNcL: any;

  if (yD) {
    if (xD < yD) {
      return -1;
    } else if (xD > yD) {
      return 1;
    }
  }
  for (let cLoc = 0, xNl = xN.length, yNl = yN.length, numS = Math.max(xNl, yNl); cLoc < numS; cLoc++) {
    oFxNcL = normChunk(xN[cLoc] || '', xNl);
    oFyNcL = normChunk(yN[cLoc] || '', yNl);
    if (isNaN(oFxNcL) !== isNaN(oFyNcL)) {
      return isNaN(oFxNcL) ? 1 : -1;
    }
    if (/[^\x00-\x80]/.test(oFxNcL + oFyNcL) && oFxNcL.localeCompare) {
      const comp = oFxNcL.localeCompare(oFyNcL);
      return comp / Math.abs(comp);
    }
    if (oFxNcL < oFyNcL) {
      return -1;
    } else if (oFxNcL > oFyNcL) {
      return 1;
    }
  }
}
/* #endregion */

export const capitalise = lower => lower.replace(/^\w/, chr => chr.toUpperCase());

export const absSort = (arr, sortKey) => {
  //build comparison function
  function absoluteValueComparison(a, b) {
    //sort by absolute value
    if (Math.abs(a[sortKey]) < Math.abs(b[sortKey])) {
      return -1;
    } else if (Math.abs(a[sortKey]) > Math.abs(b[sortKey])) {
      return 1;
      //sort identical absolute values in numerical order
    } else if (a[sortKey] < b[sortKey]) {
      return -1;
    } else if (a[sortKey] > b[sortKey]) {
      return 1;
    } else {
      return 0;
    }
  }
  //call comparison function as callback in array sort
  return arr.sort(absoluteValueComparison);
};

export const getSerieByKey = (data, key) =>
  data.map(item => ({
    name: item.LabelName,
    y: item[key],
  }));
