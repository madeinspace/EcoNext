/* eslint-disable @typescript-eslint/explicit-function-return-type */
// default chart: vertical
import { getParameterByName } from '../../../utils/';
import { formatShortDecimal, formatNumber, formatChangeNumber, formatChangePercent } from '../../../utils';
import * as deepmerge from 'deepmerge';

export const ChartDefault = (...opts) => {
  // eslint-disable-next-line prefer-spread
  const options = Object.assign.apply(Object, [{}].concat(...opts));
  const chartDefaults = {};

  const getHeight = () => {
    const yoffset = 50;
    const height = options.height !== undefined ? options.height : 400;
    return getParameterByName('pdf', null) === '1' ? height : height + yoffset;
  };

  chartDefaults.chart = {
    height: getHeight(),
    /* SETTING HEIGHT TO 400 FOR REPORTING TO PDF. TO FIT 2 CHARTS INSIDE ONE PAGE IN PDF EXPORT */
    spacingRight: 50,
    spacingLeft: 30,
    marginLeft: null,
    zoomType: 'x',
    className: 'standard-chart',
    styledMode: true,
  };

  chartDefaults.exporting = {
    enabled: false,
    sourceWidth: 850,
    fallbackToExportServer: true,
    chartOptions: {
      chart: {
        height: 500,
        spacingBottom: 60,
        events: {
          load() {
            // this.container.classList.add("export");
            // append svg logo to chart
            this.renderer
              .g()
              .attr({
                transform: `translate(740, 450)`,
                class: 'exportLogo',
              })
              .add();
            // tslint:disable-next-line:prefer-for-of

            this.renderer
              .text(options.source, 20, 470)
              .css({
                width: '600px',
                fontSize: '10px',
                color: '#6a6a6a',
              })
              .add();
          },
        },
      },
      title: {
        style: {
          color: 'black',
        },
      },
    },
  };

  chartDefaults.xAxis = {
    tickmarkPlacement: 'on',
    style: {
      textOverflow: 'none',
    },
    croshair: false,
    title: {
      align: 'low',
      text: 'xAxis title',
    },
    labels: {
      staggerLines: 0,
      format: '',
    },
    opposite: false,
    plotBands: [],
  };

  /* THIS CONDITION IS CATERING FOR DUAL YAXIS */
  if (options.yAxis.length === 1) {
    chartDefaults.yAxis = {
      style: {
        textOverflow: 'none',
      },
      alignTicks: true,
      allowDecimals: false,
      softMin: 0,
      title: {
        text: 'yAxis title',
        align: 'low',
      },
      labels: {
        staggerLines: 0,
        formatter: function() {
          const formatedNumber = formatChangePercent(this.value);
          return formatedNumber;
        },
        ...options.yAxis.labels,
      },
      opposite: false,
      plotBands: [],
      croshair: false,
    };
  } else {
    chartDefaults.series[0].yAxis = 0;
    chartDefaults.series[1].yAxis = 1;
    chartDefaults.yAxis = [
      {
        style: {
          textOverflow: 'none',
        },
        alignTicks: false,
        allowDecimals: false,
        title: {
          text: 'yAxis Primary title',
          align: 'low',
        },
        tickPositioner: function() {
          const maxDeviation = Math.ceil(Math.max(Math.abs(this.dataMax), Math.abs(this.dataMin)));
          if (this.dataMin < 0 && this.dataMax >= 0) {
            return this.getLinearTickPositions(this.tickInterval, -maxDeviation, maxDeviation);
          }
        },
        labels: options.yAxis[0].labels,
      },
      {
        style: {
          textOverflow: 'none',
        },
        className: 'yAxisSecondary',
        alignTicks: true,
        allowDecimals: false,
        title: {
          text: 'yAxis Secondary title',
          align: 'low',
        },
        tickPositioner: function() {
          const maxDeviation = Math.ceil(Math.max(Math.abs(this.dataMax), Math.abs(this.dataMin)));
          const halfMaxDeviation = Math.ceil(maxDeviation / 2);
          if (this.dataMin < 0 && this.dataMax >= 0) {
            return [-maxDeviation, -halfMaxDeviation, 0, halfMaxDeviation, maxDeviation];
          } else if (this.dataMax <= 0) {
            return [-maxDeviation, -halfMaxDeviation, 0];
          }
        },
        labels: {
          ...options.yAxis[1].labels,
          staggerLines: 0,
          formatter: function() {
            return formatNumber(this.value);
          },
        },
        opposite: true,
      },
    ];
  }

  chartDefaults.plotOptions = {
    series: {
      groupPadding: 0.2,
      pointPadding: 0,
      borderWidth: 0,
      stacking: undefined,
    },
    column: {
      pointPadding: 0.2,
      borderWidth: 0,
    },
    line: {
      marker: {
        enabled: false,
      },
    },
  };

  chartDefaults.tooltip = {
    shadow: false,
    delayForDisplay: 100,
    hideDelay: 10,
    headFormat: '<span> {point.y} - </span>',
  };

  chartDefaults.legend = {
    align: 'left',
    enabled: options.series.length !== 1,
    /* only display legend when more than 1 series exists */
    symbolWidth: 25,
    symbolRadius: 0,
    squareSymbol: false,
    symbolHeight: 12,
    verticalAlign: 'top',
    x: 5,
    y: -30,
    margin: 30,
  };

  chartDefaults.title = {
    x: 10,
    text: options.title.text,
    align: 'left',
    margin: 40,
    widthAdjust: -100,
  };
  chartDefaults.subtitle = {
    x: 10,
    align: 'left',
  };

  const deepmerged = deepmerge(chartDefaults, options);
  return deepmerged;
};
