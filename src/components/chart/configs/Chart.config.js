import { formatChangePercent } from '../../../utils';
import * as deepmerge from 'deepmerge';

export const ChartDefault = (...opts) => {
  const options = Object.assign.apply(Object, [{}].concat(...opts));
  const chartDefaults = {};

  const getHeight = () => options.height !== undefined ? options.height : 400;

  chartDefaults.chart = {
    height: getHeight(),
    /* SETTING HEIGHT TO 400 FOR REPORTING TO PDF. TO FIT 2 CHARTS INSIDE ONE PAGE IN PDF EXPORT */
    spacingRight: 50,
    spacingLeft: 20,
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
            // append svg logo to chart
            this.renderer
              .g()
              .attr({
                transform: `translate(740, 450)`,
                class: 'exportLogo',
              })
              .add();
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
      align: 'middle',
      text: 'xAxis title',
    },
    labels: {
      staggerLines: 0,
      format: '',
    },
    opposite: false,
    plotBands: [],
  };

  chartDefaults.yAxis = {
    style: {
      textOverflow: 'none',
    },
    alignTicks: true,
    allowDecimals: false,
    softMin: 0,
    title: {
      text: 'yAxis title',
    },
    labels: {
      staggerLines: 0,
      formatter: function () {
        const formatedNumber = formatChangePercent(this.value);
        return formatedNumber;
      },
      // ...options.yAxis.labels,
    },
    opposite: false,
    plotBands: [],
    croshair: false,
  };

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

  chartDefaults.legend = {
    align: 'left',
    enabled: options.series != undefined ? options.series.length !== 1 : 1,
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
    text: options.title != undefined ? options.title.text : '',
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
