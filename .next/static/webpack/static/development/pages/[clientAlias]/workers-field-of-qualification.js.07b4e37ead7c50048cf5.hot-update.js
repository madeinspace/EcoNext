webpackHotUpdate("static\\development\\pages\\[clientAlias]\\workers-field-of-qualification.js",{

/***/ "./pages/[clientAlias]/workers-field-of-qualification.tsx":
/*!****************************************************************!*\
  !*** ./pages/[clientAlias]/workers-field-of-qualification.tsx ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! isomorphic-unfetch */ "./node_modules/isomorphic-unfetch/browser.js");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _src_Utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../src/Utils */ "./src/Utils.ts");


var _jsxFileName = "C:\\Users\\fabrice\\Documents\\Workspace\\EcoNext\\pages\\[clientAlias]\\workers-field-of-qualification.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;





var LocalWorkerFieldofQualififcation = function LocalWorkerFieldofQualififcation(_ref) {
  var clients = _ref.clients;
  var router = Object(next_router__WEBPACK_IMPORTED_MODULE_5__["useRouter"])();
  var clientAlias = router.query.clientAlias;
  var tableData = tableBuilder({
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
    __self: this
  }, __jsx("h1", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: this
  }, "Workers field of qualification"), __jsx("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: this
  }, "Client alias is ", clientAlias), __jsx("ul", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: this
  }, clients.map(function (client) {
    return __jsx("li", {
      key: client.ClientID,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 26
      },
      __self: this
    }, client.Name);
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (LocalWorkerFieldofQualififcation);
LocalWorkerFieldofQualififcation.getInitialProps =
/*#__PURE__*/
Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
  var res, data;
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_3___default()('http://localhost:3000/api/monash/workers-field-of-qualification');

        case 2:
          res = _context.sent;
          _context.next = 5;
          return res.json();

        case 5:
          data = _context.sent;
          return _context.abrupt("return", data);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));

var Source = function Source() {
  return __jsx(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, "Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by", ' ', __jsx("a", {
    href: "http://home.id.com.au/about-us/",
    target: "_blank",
    title: ".id website",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48
    },
    __self: this
  }, ".id, the population experts.", __jsx("span", {
    className: "hidden",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: this
  }, " (opens a new window)")));
};

var tableBuilder = function tableBuilder(_ref3) {
  var clientName = _ref3.prettyName,
      industry = _ref3.indName,
      benchmark = _ref3.bmName,
      gender = _ref3.genderName,
      data = _ref3.TabularData;
  var footerRows = data.filter(function (item) {
    return item.IndustryName === 'Total';
  });

  var parents = lodash__WEBPACK_IMPORTED_MODULE_4___default.a.sortBy(data.filter(function (item) {
    return item.Heirarchy === 'P' && item.IndustryName !== 'Total';
  }), function (item) {
    return item.LabelKey;
  });

  var children = data.filter(function (item) {
    return item.Heirarchy === 'C';
  });
  parents.forEach(function (parent) {
    parent.children = children.filter(function (child) {
      return child.LabelKey > parent.LabelKey && child.LabelKey < parent.LabelKey + 1000;
    });
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
      __self: this
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
        displayText: "".concat(clientName, " - ").concat(industry),
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
      displayText: "".concat(benchmark),
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
      displayText: "".concat(benchmark),
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
    rows: parents.map(function (row) {
      return {
        expandable: row.children.length > 0,
        id: row.LabelKey,
        data: [row.LabelName, row.NoYear1, row.PerYear1, row.BMYear1, row.NoYear2, row.PerYear2, row.BMYear2, row.Change12],
        formattedData: ["".concat(row.LabelName), Object(_src_Utils__WEBPACK_IMPORTED_MODULE_6__["formatNumber"])(row.NoYear1), Object(_src_Utils__WEBPACK_IMPORTED_MODULE_6__["formatNumber"])(row.PerYear1), Object(_src_Utils__WEBPACK_IMPORTED_MODULE_6__["formatNumber"])(row.BMYear1), Object(_src_Utils__WEBPACK_IMPORTED_MODULE_6__["formatNumber"])(row.NoYear2), Object(_src_Utils__WEBPACK_IMPORTED_MODULE_6__["formatNumber"])(row.PerYear2), Object(_src_Utils__WEBPACK_IMPORTED_MODULE_6__["formatNumber"])(row.BMYear2), Object(_src_Utils__WEBPACK_IMPORTED_MODULE_6__["formatChangeNumber"])(row.Change12, '--')],
        childRows: row.children.map(function (childRow) {
          return {
            id: childRow.LabelKey,
            data: [childRow.LabelName, childRow.NoYear1, childRow.PerYear1, childRow.BMYear1, childRow.NoYear2, childRow.PerYear2, childRow.BMYear2, childRow.Change12],
            formattedData: ["".concat(childRow.LabelName), Object(_src_Utils__WEBPACK_IMPORTED_MODULE_6__["formatNumber"])(childRow.NoYear1), Object(_src_Utils__WEBPACK_IMPORTED_MODULE_6__["formatNumber"])(childRow.PerYear1), Object(_src_Utils__WEBPACK_IMPORTED_MODULE_6__["formatNumber"])(childRow.BMYear1), Object(_src_Utils__WEBPACK_IMPORTED_MODULE_6__["formatNumber"])(childRow.NoYear2), Object(_src_Utils__WEBPACK_IMPORTED_MODULE_6__["formatNumber"])(childRow.PerYear2), Object(_src_Utils__WEBPACK_IMPORTED_MODULE_6__["formatNumber"])(childRow.BMYear2), Object(_src_Utils__WEBPACK_IMPORTED_MODULE_6__["formatChangeNumber"])(childRow.Change12, '--')]
          };
        })
      };
    }),
    footRows: footerRows.map(function (row) {
      return {
        cssClass: '',
        cols: [{
          cssClass: '',
          displayText: "Total ".concat(gender),
          colSpan: 1
        }, {
          cssClass: '',
          displayText: Object(_src_Utils__WEBPACK_IMPORTED_MODULE_6__["formatNumber"])(row.NoYear1),
          colSpan: 1
        }, {
          cssClass: '',
          displayText: Object(_src_Utils__WEBPACK_IMPORTED_MODULE_6__["formatNumber"])(row.PerYear1),
          colSpan: 1
        }, {
          cssClass: '',
          displayText: Object(_src_Utils__WEBPACK_IMPORTED_MODULE_6__["formatNumber"])(row.BMYear1),
          colSpan: 1
        }, {
          cssClass: '',
          displayText: Object(_src_Utils__WEBPACK_IMPORTED_MODULE_6__["formatNumber"])(row.NoYear2),
          colSpan: 1
        }, {
          cssClass: '',
          displayText: Object(_src_Utils__WEBPACK_IMPORTED_MODULE_6__["formatNumber"])(row.PerYear2),
          colSpan: 1
        }, {
          cssClass: '',
          displayText: Object(_src_Utils__WEBPACK_IMPORTED_MODULE_6__["formatNumber"])(row.BMYear2),
          colSpan: 1
        }, {
          cssClass: '',
          displayText: Object(_src_Utils__WEBPACK_IMPORTED_MODULE_6__["formatChangeNumber"])(row.Change12),
          colSpan: 1
        }]
      };
    }),
    noOfRowsOnInit: 16
  };
};

/***/ })

})
//# sourceMappingURL=workers-field-of-qualification.js.07b4e37ead7c50048cf5.hot-update.js.map