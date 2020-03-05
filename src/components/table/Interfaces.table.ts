export interface TableProps {
  headers: any;
  columns: any;
  rows: any;
  footers: any;
  noOfRowsOnInit: any;
}
export interface IPropsData {
  allowExport?: boolean;
  allowSort?: boolean;
  allowSortReset?: boolean;
  anchorName: string;
  cols: IColumn[];
  crossLinks: any[];
  cssClass: string;
  footRows: IFooterRow[];
  groupOn: string;
  headRows: IHeaderRow[];
  noOfRowsOnInit: number;
  rawData: any[];
  rows: IRow[];
  smallNote: string;
  source: string;
  tableName: string;
}

export interface ITableState {
  showMore?: boolean;
  showMoreButton?: boolean;
  noOfRowsOnInit?: number;
  rows?: any[];
  cols?: any[];
  headRows?: any[];
  footRows?: any[];
  sortDir?: string;
  source?: string;
  resetState?: any[];
  sortedColIndex?: number;
  crossLinks?: any;
  expandedRows?: any[];
  columnClasses?: string[];
}

export interface ISourceAndTopicNotesProps {
  source: string;
  anchorName: any;
  clientAlias: string;
}

export interface ISmallNoteProps {
  note: string;
}

export interface IShowMoreButtonProps {
  showMore: boolean;
  nEntries: number;
  toggleShow?: any;
}

export interface ICell {
  colSpan: number;
  cssClass: string;
  displayText: string;
  rowSpan: number;
}

export interface IHeaderRow {
  cols: ICell[];
  cssClass: string;
  key: string;
}

export interface IFooterRow {
  cols: ICell[];
  cssClass: string;
  key: string;
}

export interface IColumn {
  columnName: string;
  controlCssText: any;
  controlType: number;
  cssClass: string;
  dataType: string;
  displayText: string;
  exportName: string;
  format: string;
  hidden: boolean;
  id: number;
  infoText: string;
  sortable: boolean;
  title: string;
}

export interface ICrossLink {
  url: string;
  cssClass: string;
  target: any;
  linkText: string;
}

export interface IRow {
  alreadyExpanded?: boolean;
  childRows: any[];
  childrenAPI: string;
  crossLink?: ICrossLink;
  cssClass?: string;
  data: any[];
  format: string;
  formattedData: any[];
  labelKey: string;
  spacer: string;
  spacerText: string;
  title: string;
  parentID?: any;
  id: any;
}
