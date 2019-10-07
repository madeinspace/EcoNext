webpackHotUpdate("static\\development\\pages\\[clientAlias]\\workers-field-of-qualification.js",{

/***/ "./node_modules/@babel/runtime-corejs2/core-js/array/from.js":
false,

/***/ "./node_modules/@babel/runtime-corejs2/core-js/is-iterable.js":
false,

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/arrayWithoutHoles.js":
false,

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/iterableToArray.js":
false,

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/nonIterableSpread.js":
false,

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/toConsumableArray.js":
false,

/***/ "./node_modules/core-js/library/fn/array/from.js":
false,

/***/ "./node_modules/core-js/library/fn/is-iterable.js":
false,

/***/ "./node_modules/core-js/library/modules/_create-property.js":
false,

/***/ "./node_modules/core-js/library/modules/core.is-iterable.js":
false,

/***/ "./node_modules/core-js/library/modules/es6.array.from.js":
false,

/***/ "./src/Utils.ts":
/*!**********************!*\
  !*** ./src/Utils.ts ***!
  \**********************/
/*! exports provided: getClassNames, stripEndQuotes, detectIE, getHost, getHashParams, buildQueryStringWithObjectKeys, getParameterByName, insertArrayAt, deserialiseQueryString, naturalSort, redirectToAreaByWebID, mergeArraysById, pathParts, formatNumber, formatPercent, formatChangeNumber, formatChangePercent, formatShortDecimal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getClassNames", function() { return getClassNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stripEndQuotes", function() { return stripEndQuotes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detectIE", function() { return detectIE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHost", function() { return getHost; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHashParams", function() { return getHashParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildQueryStringWithObjectKeys", function() { return buildQueryStringWithObjectKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getParameterByName", function() { return getParameterByName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insertArrayAt", function() { return insertArrayAt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deserialiseQueryString", function() { return deserialiseQueryString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "naturalSort", function() { return naturalSort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "redirectToAreaByWebID", function() { return redirectToAreaByWebID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeArraysById", function() { return mergeArraysById; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pathParts", function() { return pathParts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatNumber", function() { return formatNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatPercent", function() { return formatPercent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatChangeNumber", function() { return formatChangeNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatChangePercent", function() { return formatChangePercent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatShortDecimal", function() { return formatShortDecimal; });
/* harmony import */ var _babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/create */ "./node_modules/@babel/runtime-corejs2/core-js/object/create.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/keys */ "./node_modules/@babel/runtime-corejs2/core-js/object/keys.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_core_js_symbol_replace__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/symbol/replace */ "./node_modules/@babel/runtime-corejs2/core-js/symbol/replace.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_symbol_replace__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_symbol_replace__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_core_js_weak_map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/weak-map */ "./node_modules/@babel/runtime-corejs2/core-js/weak-map.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_weak_map__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_weak_map__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/wrapNativeSuper */ "./node_modules/@babel/runtime-corejs2/helpers/esm/wrapNativeSuper.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_float__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/parse-float */ "./node_modules/@babel/runtime-corejs2/core-js/parse-float.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_float__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_parse_float__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/parse-int */ "./node_modules/@babel/runtime-corejs2/core-js/parse-int.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var numeral__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! numeral */ "./node_modules/numeral/numeral.js");
/* harmony import */ var numeral__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(numeral__WEBPACK_IMPORTED_MODULE_12__);












function _wrapRegExp(re, groups) { _wrapRegExp = function _wrapRegExp(re, groups) { return new BabelRegExp(re, undefined, groups); }; var _RegExp = Object(_babel_runtime_corejs2_helpers_esm_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_7__["default"])(RegExp); var _super = RegExp.prototype; var _groups = new _babel_runtime_corejs2_core_js_weak_map__WEBPACK_IMPORTED_MODULE_3___default.a(); function BabelRegExp(re, flags, groups) { var _this = _RegExp.call(this, re, flags); _groups.set(_this, groups || _groups.get(re)); return _this; } Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(BabelRegExp, _RegExp); BabelRegExp.prototype.exec = function (str) { var result = _super.exec.call(this, str); if (result) result.groups = buildGroups(result, this); return result; }; BabelRegExp.prototype[_babel_runtime_corejs2_core_js_symbol_replace__WEBPACK_IMPORTED_MODULE_2___default.a] = function (str, substitution) { if (typeof substitution === "string") { var groups = _groups.get(this); return _super[_babel_runtime_corejs2_core_js_symbol_replace__WEBPACK_IMPORTED_MODULE_2___default.a].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) { return "$" + groups[name]; })); } else if (typeof substitution === "function") { var _this = this; return _super[_babel_runtime_corejs2_core_js_symbol_replace__WEBPACK_IMPORTED_MODULE_2___default.a].call(this, str, function () { var args = []; args.push.apply(args, arguments); if (typeof args[args.length - 1] !== "object") { args.push(buildGroups(args, _this)); } return substitution.apply(this, args); }); } else { return _super[_babel_runtime_corejs2_core_js_symbol_replace__WEBPACK_IMPORTED_MODULE_2___default.a].call(this, str, substitution); } }; function buildGroups(result, re) { var g = _groups.get(re); return _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_1___default()(g).reduce(function (groups, name) { groups[name] = result[g[name]]; return groups; }, _babel_runtime_corejs2_core_js_object_create__WEBPACK_IMPORTED_MODULE_0___default()(null)); } return _wrapRegExp.apply(this, arguments); }

 // import GatsbyPages from './GatsbyPages';


var getClassNames = function getClassNames(styles, classes) {
  if (lodash__WEBPACK_IMPORTED_MODULE_11___default.a.isEmpty(classes)) {
    return;
  }

  var classArr = lodash__WEBPACK_IMPORTED_MODULE_11___default.a.split(classes, ' ');

  var classNames = '';

  lodash__WEBPACK_IMPORTED_MODULE_11___default.a.forEach(classArr, function (classN) {
    classNames += lodash__WEBPACK_IMPORTED_MODULE_11___default.a.isUndefined(styles[classN]) ? ' ' + classN : ' ' + styles[classN];
  });

  return classNames;
};
var stripEndQuotes = function stripEndQuotes(s) {
  var t = s.length;
  if (s.charAt(0) == '"') s = s.substring(1, t--);
  if (s.charAt(--t) == '"') s = s.substring(0, t);
  return s;
};
var detectIE = function detectIE() {
  var ua = window.navigator.userAgent; // Test values; Uncomment to check result …
  // IE 10
  // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
  // IE 11
  // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
  // Edge 12 (Spartan)
  // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
  // Edge 13
  // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

  var msie = ua.indexOf('MSIE ');

  if (msie > 0) {
    // IE 10 or older => return version number
    return _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_10___default()(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');

  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_10___default()(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');

  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_10___default()(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  } // other browser


  return 0;
};
var getHost = function getHost() {
  var domain = document.location.hostname.toLowerCase();
  var parts = domain.split('.');

  if (parts[0] === 'www') {
    parts.shift();
  }

  parts.shift();
  var result = '.' + parts.join('.');
  return result;
};
var getHashParams = function getHashParams() {
  var hashParams = {};
  var e = undefined;
  var a = /\+/g; // Regex for replacing addition symbol with a space

  var r = /([^&;=]+)=?([^&;]*)/g;

  var d = function d(s) {
    return decodeURIComponent(s.replace(a, ' '));
  };

  var q = window.location.hash.substring(1);

  while (e = r.exec(q)) {
    hashParams[d(e[1])] = d(e[2]);
  }

  return hashParams;
};
var buildQueryStringWithObjectKeys = function buildQueryStringWithObjectKeys(obj, jointer) {
  return lodash__WEBPACK_IMPORTED_MODULE_11___default.a.map(lodash__WEBPACK_IMPORTED_MODULE_11___default.a.keys(obj), function (key) {
    return key + '=' + obj[key];
  }).join(jointer);
};
var getParameterByName = function getParameterByName(name) {
  var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  var results = regex.exec(url);

  if (!results) {
    return null;
  }

  if (!results[2]) {
    return '';
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};
var insertArrayAt = function insertArrayAt(array, index, arrayToInsert) {
  Array.prototype.splice.apply(array, [index, 0].concat(arrayToInsert));
  return array;
};
var deserialiseQueryString = function deserialiseQueryString(query) {
  return lodash__WEBPACK_IMPORTED_MODULE_11___default.a.chain(query).replace('?', '') // width=727&height=647&layers=1,4&zoom=14&lat=-36.641495731141354&lon=146.76125049591067&mapstyle=road
  .split('&') // ["width=727","height=647", ...]
  // @ts-ignore
  .map(lodash__WEBPACK_IMPORTED_MODULE_11___default.a.partial(lodash__WEBPACK_IMPORTED_MODULE_11___default.a.split, lodash__WEBPACK_IMPORTED_MODULE_11___default.a, '=', 2)) // [["width","727"],["height","647"], ...]
  .fromPairs() // {"width":"727","height":"647", ...}
  .value();
};
function naturalSort(a, b) {
  var re = /(^([+\-]?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?(?=\D|\s|$))|^0x[\da-fA-F]+$|\d+)/g;
  var sre = /^\s+|\s+$/g;
  var snre = /\s+/g;
  var dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/;
  var hre = /^0x[0-9a-f]+$/i;
  var ore = /^0/;

  var i = function i(s) {
    return (('' + s).toLowerCase() || '' + s).replace(sre, '');
  };

  var x = i(a);
  var y = i(b);
  var xN = x.replace(re, '\0$1\0').replace(/\0$/, '').replace(/^\0/, '').split('\0');
  var yN = y.replace(re, '\0$1\0').replace(/\0$/, '').replace(/^\0/, '').split('\0');
  var mhre = x.match(hre);
  var yhre = y.match(hre);
  var xD = _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_10___default()(mhre, 16) || xN.length !== 1 && Date.parse(x);
  var yD = _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_10___default()(yhre, 16) || xD && y.match(dre) && Date.parse(y) || null;

  var normChunk = function normChunk(s, l) {
    return (!s.match(ore) || l === 1) && _babel_runtime_corejs2_core_js_parse_float__WEBPACK_IMPORTED_MODULE_9___default()(s) || s.replace(snre, ' ').replace(sre, '') || 0;
  };

  var oFxNcL;
  var oFyNcL;

  if (yD) {
    if (xD < yD) {
      return -1;
    } else if (xD > yD) {
      return 1;
    }
  }

  for (var cLoc = 0, xNl = xN.length, yNl = yN.length, numS = Math.max(xNl, yNl); cLoc < numS; cLoc++) {
    oFxNcL = normChunk(xN[cLoc] || '', xNl);
    oFyNcL = normChunk(yN[cLoc] || '', yNl);

    if (isNaN(oFxNcL) !== isNaN(oFyNcL)) {
      return isNaN(oFxNcL) ? 1 : -1;
    }

    if (/[^\x00-\x80]/.test(oFxNcL + oFyNcL) && oFxNcL.localeCompare) {
      var comp = oFxNcL.localeCompare(oFyNcL);
      return comp / Math.abs(comp);
    }

    if (oFxNcL < oFyNcL) {
      return -1;
    } else if (oFxNcL > oFyNcL) {
      return 1;
    }
  }
}
function redirectToAreaByWebID(webID) {
  // redirect to small areas
  var path = window.location.href.split('?')[0];
  var reg = /\/[/home]+$/;

  if (reg.test(path)) {
    path = path.substr(0, path.lastIndexOf('/'));
  }

  window.location.href = "".concat(path, "about?WebID=").concat(webID);
}
var mergeArraysById = function mergeArraysById(a1, a2, id) {
  return a1.map(function (itm) {
    return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_8__["default"])({}, a2.find(function (item) {
      return item[id] === itm[id] && item;
    }), itm);
  });
}; // export function mapByKey(list, keyGetter) {
//   const map = new Map();
//   list.forEach(item => {
//     const key = keyGetter(item);
//     const collection = map.get(key);
//     if (!collection) {
//       map.set(key, [item]);
//     } else {
//       collection.push(item);
//     }
//   });
//   var mapAsc = new Map([...map].sort());
//   return mapAsc;
// }

var pathParts = function pathParts(path) {
  var REGEX = _wrapRegExp(/^\/?([\0-\.0-\uFFFF]+)\/?([\0-\.0-\uFFFF]+)?\/?/, {
    clientAlias: 1,
    pageAlias: 2
  });

  return path.match(REGEX).groups;
}; // export const IsGatsbyPage = path =>
//   GatsbyPages.includes(pathParts(path).pageAlias)

var formatNumber = function formatNumber(number) {
  return numeral__WEBPACK_IMPORTED_MODULE_12___default()(number).format('0,0');
};
var formatPercent = function formatPercent(number) {
  var zero = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0';
  return number ? numeral__WEBPACK_IMPORTED_MODULE_12___default()(number).format('0,0.0') : zero;
};
var formatChangeNumber = function formatChangeNumber(number) {
  var zero = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0';
  return number ? numeral__WEBPACK_IMPORTED_MODULE_12___default()(number).format('+0,0') : zero;
};
var formatChangePercent = function formatChangePercent(number) {
  var zero = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0';
  return number ? numeral__WEBPACK_IMPORTED_MODULE_12___default()(number).format('+0,0.00') : zero;
};
var formatShortDecimal = function formatShortDecimal(number) {
  var zero = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0';
  return number ? numeral__WEBPACK_IMPORTED_MODULE_12___default()(number).format('0.0') : zero;
};

/***/ })

})
//# sourceMappingURL=workers-field-of-qualification.js.df262ffdf14ffdbb8596.hot-update.js.map