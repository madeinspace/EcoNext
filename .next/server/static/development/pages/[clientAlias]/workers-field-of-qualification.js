module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/define-property */ "core-js/library/fn/object/define-property");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/get-own-property-descriptor */ "core-js/library/fn/object/get-own-property-descriptor");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/get-own-property-symbols */ "core-js/library/fn/object/get-own-property-symbols");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/keys.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/keys.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/keys */ "core-js/library/fn/object/keys");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/parse-float.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/parse-float.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/parse-float */ "core-js/library/fn/parse-float");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/parse-int.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/parse-int.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/parse-int */ "core-js/library/fn/parse-int");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _defineProperty; });
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/object/define-property */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js");
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default()(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _objectSpread; });
/* harmony import */ var _core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/object/get-own-property-descriptor */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js");
/* harmony import */ var _core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core-js/object/get-own-property-symbols */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js");
/* harmony import */ var _core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_js_object_keys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core-js/object/keys */ "./node_modules/@babel/runtime-corejs2/core-js/object/keys.js");
/* harmony import */ var _core_js_object_keys__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_keys__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");




function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    var ownKeys = _core_js_object_keys__WEBPACK_IMPORTED_MODULE_2___default()(source);

    if (typeof _core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1___default.a === 'function') {
      ownKeys = ownKeys.concat(_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1___default()(source).filter(function (sym) {
        return _core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_0___default()(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      Object(_defineProperty__WEBPACK_IMPORTED_MODULE_3__["default"])(target, key, source[key]);
    });
  }

  return target;
}

/***/ }),

/***/ "./pages/[clientAlias]/workers-field-of-qualification.tsx":
/*!****************************************************************!*\
  !*** ./pages/[clientAlias]/workers-field-of-qualification.tsx ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! isomorphic-unfetch */ "isomorphic-unfetch");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _src_Utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../src/Utils */ "./src/Utils.ts");
var _jsxFileName = "C:\\Users\\fabrice\\Documents\\Workspace\\EcoNext\\pages\\[clientAlias]\\workers-field-of-qualification.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





const LocalWorkerFieldofQualififcation = ({
  clients
}) => {
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_3__["useRouter"])();
  const {
    clientAlias
  } = router.query;
  const tableData = tableBuilder({
    prettyName: 'prettyName',
    indName: 'indName',
    bmName: 'bmName',
    genderName: 'female',
    TabularData: []
  });
  console.log('tableData', tableData);
  return __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: undefined
  }, __jsx("h1", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: undefined
  }, "Workers field of qualification"), __jsx("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: undefined
  }, "Client alias is ", clientAlias), __jsx("select", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: undefined
  }, clients.map(client => __jsx("option", {
    key: client.ClientID,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: undefined
  }, client.Name))));
};

/* harmony default export */ __webpack_exports__["default"] = (LocalWorkerFieldofQualififcation);

LocalWorkerFieldofQualififcation.getInitialProps = async function () {
  const res = await isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_1___default()('http://localhost:3000/api/monash/workers-field-of-qualification');
  const data = await res.json();
  return data;
};

const Source = () => __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by", ' ', __jsx("a", {
  href: "http://home.id.com.au/about-us/",
  target: "_blank",
  title: ".id website",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 48
  },
  __self: undefined
}, ".id, the population experts.", __jsx("span", {
  className: "hidden",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 54
  },
  __self: undefined
}, " (opens a new window)")));

const tableBuilder = ({
  prettyName: clientName,
  indName: industry,
  bmName: benchmark,
  genderName: gender,
  TabularData: data
}) => {
  const footerRows = data.filter(item => item.IndustryName === 'Total');

  const parents = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.sortBy(data.filter(item => item.Heirarchy === 'P' && item.IndustryName !== 'Total'), item => item.LabelKey);

  const children = data.filter(item => item.Heirarchy === 'C');
  parents.forEach(parent => {
    parent.children = children.filter(child => child.LabelKey > parent.LabelKey && child.LabelKey < parent.LabelKey + 1000);
  });
  return {
    cssClass: '',
    allowExport: false,
    allowSort: true,
    allowSortReset: true,
    groupOn: '',
    clientAlias: 'Monash',
    source: __jsx(Source, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 90
      },
      __self: undefined
    }),
    rawDataSource: 'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by.id, the population experts.',
    anchorName: 'service-age-groups',
    headRows: [{
      cssClass: '',
      cols: [{
        cssClass: 'table-area-name',
        displayText: 'Local workers field of qualification - Summary',
        colSpan: 10,
        rowSpan: 0
      }],
      key: 'hr0'
    }, {
      cssClass: '',
      cols: [{
        cssClass: '',
        displayText: `${clientName} - ${industry}`,
        colSpan: 1,
        rowSpan: 0
      }, {
        cssClass: 'xeven start-year',
        displayText: ' 2016',
        colSpan: 3,
        rowSpan: 0
      }, {
        cssClass: 'xodd end-year',
        displayText: '2011',
        colSpan: 3,
        rowSpan: 0
      }, {
        cssClass: 'xeven start-year',
        displayText: 'Change',
        colSpan: 1,
        rowSpan: 0
      }],
      key: 'hr1'
    }],
    cols: [{
      id: 0,
      displayText: 'Field of qualification (Click rows to view sub-categories)',
      dataType: 'int',
      sortable: false,
      cssClass: 'xodd xfirst'
    }, {
      id: 1,
      displayText: 'Number',
      dataType: 'int',
      sortable: true,
      cssClass: 'xeven latest',
      format: '{0:#,0}'
    }, {
      id: 2,
      displayText: '%',
      dataType: 'money',
      sortable: true,
      cssClass: 'xeven latest',
      format: '{0:+#,0;-#,0;0}'
    }, {
      id: 3,
      displayText: `${benchmark}`,
      dataType: 'money',
      sortable: true,
      cssClass: 'xeven latest',
      format: '{0:+#,0;-#,0;0}'
    }, {
      id: 4,
      displayText: 'Number',
      title: '',
      dataType: 'int',
      sortable: true,
      cssClass: 'xodd',
      format: '{0:#,0}'
    }, {
      id: 5,
      displayText: '%',
      dataType: 'money',
      sortable: true,
      cssClass: 'per xodd',
      format: '{0:+#,0;-#,0;0}'
    }, {
      id: 6,
      displayText: `${benchmark}`,
      dataType: 'money',
      sortable: true,
      cssClass: 'xodd',
      format: '{0:+#,0;-#,0;0}'
    }, {
      id: 7,
      displayText: '2011 - 2016',
      title: '',
      dataType: 'int',
      sortable: true,
      cssClass: 'xeven',
      format: '{0:#,0}'
    }],
    rows: parents.map(row => ({
      expandable: row.children.length > 0,
      id: row.LabelKey,
      data: [row.LabelName, row.NoYear1, row.PerYear1, row.BMYear1, row.NoYear2, row.PerYear2, row.BMYear2, row.Change12],
      formattedData: [`${row.LabelName}`, Object(_src_Utils__WEBPACK_IMPORTED_MODULE_4__["formatNumber"])(row.NoYear1), Object(_src_Utils__WEBPACK_IMPORTED_MODULE_4__["formatNumber"])(row.PerYear1), Object(_src_Utils__WEBPACK_IMPORTED_MODULE_4__["formatNumber"])(row.BMYear1), Object(_src_Utils__WEBPACK_IMPORTED_MODULE_4__["formatNumber"])(row.NoYear2), Object(_src_Utils__WEBPACK_IMPORTED_MODULE_4__["formatNumber"])(row.PerYear2), Object(_src_Utils__WEBPACK_IMPORTED_MODULE_4__["formatNumber"])(row.BMYear2), Object(_src_Utils__WEBPACK_IMPORTED_MODULE_4__["formatChangeNumber"])(row.Change12, '--')],
      childRows: row.children.map(childRow => ({
        id: childRow.LabelKey,
        data: [childRow.LabelName, childRow.NoYear1, childRow.PerYear1, childRow.BMYear1, childRow.NoYear2, childRow.PerYear2, childRow.BMYear2, childRow.Change12],
        formattedData: [`${childRow.LabelName}`, Object(_src_Utils__WEBPACK_IMPORTED_MODULE_4__["formatNumber"])(childRow.NoYear1), Object(_src_Utils__WEBPACK_IMPORTED_MODULE_4__["formatNumber"])(childRow.PerYear1), Object(_src_Utils__WEBPACK_IMPORTED_MODULE_4__["formatNumber"])(childRow.BMYear1), Object(_src_Utils__WEBPACK_IMPORTED_MODULE_4__["formatNumber"])(childRow.NoYear2), Object(_src_Utils__WEBPACK_IMPORTED_MODULE_4__["formatNumber"])(childRow.PerYear2), Object(_src_Utils__WEBPACK_IMPORTED_MODULE_4__["formatNumber"])(childRow.BMYear2), Object(_src_Utils__WEBPACK_IMPORTED_MODULE_4__["formatChangeNumber"])(childRow.Change12, '--')]
      }))
    })),
    footRows: footerRows.map(row => {
      return {
        cssClass: '',
        cols: [{
          cssClass: '',
          displayText: `Total ${gender}`,
          colSpan: 1
        }, {
          cssClass: '',
          displayText: Object(_src_Utils__WEBPACK_IMPORTED_MODULE_4__["formatNumber"])(row.NoYear1),
          colSpan: 1
        }, {
          cssClass: '',
          displayText: Object(_src_Utils__WEBPACK_IMPORTED_MODULE_4__["formatNumber"])(row.PerYear1),
          colSpan: 1
        }, {
          cssClass: '',
          displayText: Object(_src_Utils__WEBPACK_IMPORTED_MODULE_4__["formatNumber"])(row.BMYear1),
          colSpan: 1
        }, {
          cssClass: '',
          displayText: Object(_src_Utils__WEBPACK_IMPORTED_MODULE_4__["formatNumber"])(row.NoYear2),
          colSpan: 1
        }, {
          cssClass: '',
          displayText: Object(_src_Utils__WEBPACK_IMPORTED_MODULE_4__["formatNumber"])(row.PerYear2),
          colSpan: 1
        }, {
          cssClass: '',
          displayText: Object(_src_Utils__WEBPACK_IMPORTED_MODULE_4__["formatNumber"])(row.BMYear2),
          colSpan: 1
        }, {
          cssClass: '',
          displayText: Object(_src_Utils__WEBPACK_IMPORTED_MODULE_4__["formatChangeNumber"])(row.Change12),
          colSpan: 1
        }]
      };
    }),
    noOfRowsOnInit: 16
  };
};

/***/ }),

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
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_float__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/parse-float */ "./node_modules/@babel/runtime-corejs2/core-js/parse-float.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_float__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_parse_float__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/parse-int */ "./node_modules/@babel/runtime-corejs2/core-js/parse-int.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var numeral__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! numeral */ "numeral");
/* harmony import */ var numeral__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(numeral__WEBPACK_IMPORTED_MODULE_4__);



 // import GatsbyPages from './GatsbyPages';


const getClassNames = (styles, classes) => {
  if (lodash__WEBPACK_IMPORTED_MODULE_3___default.a.isEmpty(classes)) {
    return;
  }

  const classArr = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.split(classes, ' ');

  let classNames = '';

  lodash__WEBPACK_IMPORTED_MODULE_3___default.a.forEach(classArr, classN => {
    classNames += lodash__WEBPACK_IMPORTED_MODULE_3___default.a.isUndefined(styles[classN]) ? ' ' + classN : ' ' + styles[classN];
  });

  return classNames;
};
const stripEndQuotes = s => {
  let t = s.length;
  if (s.charAt(0) == '"') s = s.substring(1, t--);
  if (s.charAt(--t) == '"') s = s.substring(0, t);
  return s;
};
const detectIE = () => {
  const ua = window.navigator.userAgent; // Test values; Uncomment to check result …
  // IE 10
  // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
  // IE 11
  // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
  // Edge 12 (Spartan)
  // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
  // Edge 13
  // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

  const msie = ua.indexOf('MSIE ');

  if (msie > 0) {
    // IE 10 or older => return version number
    return _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_2___default()(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  const trident = ua.indexOf('Trident/');

  if (trident > 0) {
    // IE 11 => return version number
    const rv = ua.indexOf('rv:');
    return _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_2___default()(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  const edge = ua.indexOf('Edge/');

  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_2___default()(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  } // other browser


  return 0;
};
const getHost = () => {
  const domain = document.location.hostname.toLowerCase();
  const parts = domain.split('.');

  if (parts[0] === 'www') {
    parts.shift();
  }

  parts.shift();
  const result = '.' + parts.join('.');
  return result;
};
const getHashParams = () => {
  const hashParams = {};
  let e = undefined;
  const a = /\+/g; // Regex for replacing addition symbol with a space

  const r = /([^&;=]+)=?([^&;]*)/g;

  const d = s => decodeURIComponent(s.replace(a, ' '));

  const q = window.location.hash.substring(1);

  while (e = r.exec(q)) {
    hashParams[d(e[1])] = d(e[2]);
  }

  return hashParams;
};
const buildQueryStringWithObjectKeys = (obj, jointer) => lodash__WEBPACK_IMPORTED_MODULE_3___default.a.map(lodash__WEBPACK_IMPORTED_MODULE_3___default.a.keys(obj), key => key + '=' + obj[key]).join(jointer);
const getParameterByName = (name, url = window.location.href) => {
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);

  if (!results) {
    return null;
  }

  if (!results[2]) {
    return '';
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};
const insertArrayAt = (array, index, arrayToInsert) => {
  Array.prototype.splice.apply(array, [index, 0].concat(arrayToInsert));
  return array;
};
const deserialiseQueryString = query => {
  return lodash__WEBPACK_IMPORTED_MODULE_3___default.a.chain(query).replace('?', '') // width=727&height=647&layers=1,4&zoom=14&lat=-36.641495731141354&lon=146.76125049591067&mapstyle=road
  .split('&') // ["width=727","height=647", ...]
  // @ts-ignore
  .map(lodash__WEBPACK_IMPORTED_MODULE_3___default.a.partial(lodash__WEBPACK_IMPORTED_MODULE_3___default.a.split, lodash__WEBPACK_IMPORTED_MODULE_3___default.a, '=', 2)) // [["width","727"],["height","647"], ...]
  .fromPairs() // {"width":"727","height":"647", ...}
  .value();
};
function naturalSort(a, b) {
  const re = /(^([+\-]?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?(?=\D|\s|$))|^0x[\da-fA-F]+$|\d+)/g;
  const sre = /^\s+|\s+$/g;
  const snre = /\s+/g;
  const dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/;
  const hre = /^0x[0-9a-f]+$/i;
  const ore = /^0/;

  const i = s => {
    return (('' + s).toLowerCase() || '' + s).replace(sre, '');
  };

  const x = i(a);
  const y = i(b);
  const xN = x.replace(re, '\0$1\0').replace(/\0$/, '').replace(/^\0/, '').split('\0');
  const yN = y.replace(re, '\0$1\0').replace(/\0$/, '').replace(/^\0/, '').split('\0');
  const mhre = x.match(hre);
  const yhre = y.match(hre);
  const xD = _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_2___default()(mhre, 16) || xN.length !== 1 && Date.parse(x);
  const yD = _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_2___default()(yhre, 16) || xD && y.match(dre) && Date.parse(y) || null;

  const normChunk = (s, l) => {
    return (!s.match(ore) || l === 1) && _babel_runtime_corejs2_core_js_parse_float__WEBPACK_IMPORTED_MODULE_1___default()(s) || s.replace(snre, ' ').replace(sre, '') || 0;
  };

  let oFxNcL;
  let oFyNcL;

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
function redirectToAreaByWebID(webID) {
  // redirect to small areas
  var path = window.location.href.split('?')[0];
  var reg = /\/[/home]+$/;

  if (reg.test(path)) {
    path = path.substr(0, path.lastIndexOf('/'));
  }

  window.location.href = `${path}about?WebID=${webID}`;
}
const mergeArraysById = (a1, a2, id) => a1.map(itm => Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, a2.find(item => item[id] === itm[id] && item), itm)); // export function mapByKey(list, keyGetter) {
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

const pathParts = path => {
  const REGEX = /^\/?(?<clientAlias>[^\/]+)\/?(?<pageAlias>[^\/]+)?\/?/;
  return path.match(REGEX).groups;
}; // export const IsGatsbyPage = path =>
//   GatsbyPages.includes(pathParts(path).pageAlias)

const formatNumber = number => numeral__WEBPACK_IMPORTED_MODULE_4___default()(number).format('0,0');
const formatPercent = (number, zero = '0') => number ? numeral__WEBPACK_IMPORTED_MODULE_4___default()(number).format('0,0.0') : zero;
const formatChangeNumber = (number, zero = '0') => number ? numeral__WEBPACK_IMPORTED_MODULE_4___default()(number).format('+0,0') : zero;
const formatChangePercent = (number, zero = '0') => number ? numeral__WEBPACK_IMPORTED_MODULE_4___default()(number).format('+0,0.00') : zero;
const formatShortDecimal = (number, zero = '0') => number ? numeral__WEBPACK_IMPORTED_MODULE_4___default()(number).format('0.0') : zero;

/***/ }),

/***/ 4:
/*!**********************************************************************!*\
  !*** multi ./pages/[clientAlias]/workers-field-of-qualification.tsx ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\fabrice\Documents\Workspace\EcoNext\pages\[clientAlias]\workers-field-of-qualification.tsx */"./pages/[clientAlias]/workers-field-of-qualification.tsx");


/***/ }),

/***/ "core-js/library/fn/object/define-property":
/*!************************************************************!*\
  !*** external "core-js/library/fn/object/define-property" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/define-property");

/***/ }),

/***/ "core-js/library/fn/object/get-own-property-descriptor":
/*!************************************************************************!*\
  !*** external "core-js/library/fn/object/get-own-property-descriptor" ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/get-own-property-descriptor");

/***/ }),

/***/ "core-js/library/fn/object/get-own-property-symbols":
/*!*********************************************************************!*\
  !*** external "core-js/library/fn/object/get-own-property-symbols" ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/get-own-property-symbols");

/***/ }),

/***/ "core-js/library/fn/object/keys":
/*!*************************************************!*\
  !*** external "core-js/library/fn/object/keys" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/keys");

/***/ }),

/***/ "core-js/library/fn/parse-float":
/*!*************************************************!*\
  !*** external "core-js/library/fn/parse-float" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/parse-float");

/***/ }),

/***/ "core-js/library/fn/parse-int":
/*!***********************************************!*\
  !*** external "core-js/library/fn/parse-int" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/parse-int");

/***/ }),

/***/ "isomorphic-unfetch":
/*!*************************************!*\
  !*** external "isomorphic-unfetch" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("isomorphic-unfetch");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "numeral":
/*!**************************!*\
  !*** external "numeral" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("numeral");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })

/******/ });
//# sourceMappingURL=workers-field-of-qualification.js.map