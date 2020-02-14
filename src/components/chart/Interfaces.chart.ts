export interface IData {
  chartTemplate: string;
  dataSource: JSX.Element;
  cssClass?: string;
}
export interface EntityChartProps {
  data: IData;
}

export interface IChartProps {
  config: any;
  highchartOptions?: any;
  exportOptions?: any;
  chartContainerID?: any;
  source?: any;
  dataSource?: any;
  sets?: any[];
  filterToggles?: any[];
  siblingsInfo?: any;
  enableExport?: boolean;
}

export interface IChartState {
  isLoaded: boolean;
}

export interface ExportImageData {
  imageData: Blob;
  width: number;
  height: number;
}
export interface IExportDropdownProps {
  exportOptions: any;
  handleExport: (item: IFormat) => void;
}

export interface IFormat {
  displayText: string;
  res: string;
  type: string;
}

export interface IPlayStopButttonProps {
  isPlaying: boolean;
  stop: () => void;
  play: () => void;
}

export interface IToggle {
  displayLabel: string;
  group: string;
  hasInfo: false;
  infoUrl: string;
  isSelected: false;
  label: string;
  paramsKeyValue: any;
  parentValue: string;
  textKeyValue: any;
  title: string;
  toolTip: any;
  url: string;
  value: string;
  valueInt: number;
}

export interface ITogglesProps {
  filterToggles: any[];
  currentToggle: IToggle;
  handleToggleClick: (toggle: IToggle) => void;
}
