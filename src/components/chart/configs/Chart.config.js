import { formatChangePercent } from '../../../utils';
import * as deepmerge from 'deepmerge';


const idLogo = ["M9,0h6.85V6H9Zm6.85,10.23V33.8H9V10.23Z", "M34.87,30.42a8.13,8.13,0,0,1-7.09,3.85c-5.54,0-9.62-4.65-9.62-12.25S22.1,9.81,27.69,9.81a8,8,0,0,1,7.09,3.66V0h6.81V29.06a31.82,31.82,0,0,0,.23,4.74H35.1Zm-5-.7c3,0,5-2.77,5-7.65s-2-7.7-5-7.7-4.79,2.72-4.79,7.7S26.93,29.72,29.89,29.72Z", "M3.47,34.1A3.47,3.47,0,1,0,0,30.63,3.47,3.47,0,0,0,3.47,34.1", "M48.92,3H50.3v.85H48.92V8c0,.76.21,1,.8,1l.58,0v.9a4.59,4.59,0,0,1-1,.12c-1.21,0-1.58-.45-1.58-1.56V3.86h-1V3h1V1.61L48.92,1Z", "M55,5.49c0-1.18-.21-1.75-1.14-1.75s-1.35.73-1.35,2.18v4H51.29V0h1.18V3.8a2.13,2.13,0,0,1,1.85-1A1.72,1.72,0,0,1,56.16,4.7V9.91H55Z", "M60.09,10.08c-1.94,0-2.59-1.17-2.59-3.68s.74-3.55,2.59-3.55,2.48.91,2.48,2.81V6.73H58.73v.4c0,1.32.39,1.94,1.36,1.94.72,0,1.19-.47,1.3-1.32h1.18A2.28,2.28,0,0,1,60.09,10.08ZM61.4,5.84V5.25c0-1-.44-1.58-1.27-1.58s-1.38.7-1.4,2.18Z", "M47.35,14.2A8.6,8.6,0,0,0,47.3,13h1.21l.07.66a1.93,1.93,0,0,1,1.63-.84c1.6,0,2.26,1.17,2.26,3.54s-.69,3.72-2.26,3.72a1.86,1.86,0,0,1-1.65-1v3.4h-1.2ZM50,19c.92,0,1.28-.87,1.28-2.64s-.28-2.73-1.36-2.73-1.34.9-1.34,2.78C48.53,18.19,48.95,19,50,19Z", "M56.25,12.82c1.87,0,2.59,1.14,2.59,3.61s-.72,3.62-2.59,3.62-2.6-1.14-2.6-3.64S54.39,12.82,56.25,12.82Zm-1.38,3.61c0,1.79.33,2.62,1.38,2.62s1.38-.83,1.38-2.6-.33-2.62-1.38-2.62S54.87,14.67,54.87,16.43Z", "M60.2,14.2A8.7,8.7,0,0,0,60.15,13h1.21l.07.66a1.93,1.93,0,0,1,1.63-.84c1.6,0,2.26,1.17,2.26,3.54s-.69,3.72-2.26,3.72a1.86,1.86,0,0,1-1.65-1v3.4H60.2ZM62.81,19c.92,0,1.28-.87,1.28-2.64s-.28-2.73-1.36-2.73-1.33.9-1.33,2.78C61.39,18.19,61.8,19,62.81,19Z", "M67.82,17.38c0,1.19.21,1.75,1.14,1.75s1.35-.72,1.35-2.16V13H71.5V18.8a10.49,10.49,0,0,0,.07,1.09H70.35l-.06-.81a2.12,2.12,0,0,1-1.83,1,1.72,1.72,0,0,1-1.85-1.86V13h1.2Z", "M73,19.88V10h1.18v9.91Z", "M75.62,14.78v-.14c0-1.2.84-1.83,2.45-1.83s2.33.63,2.33,2V18a13.41,13.41,0,0,0,.12,1.85H79.33L79.25,19a2.27,2.27,0,0,1-1.79.94,2,2,0,0,1-2-2.12c0-1.58,1-2.4,3.07-2.4h.66v-.34c0-1-.21-1.43-1.06-1.43s-1.27.36-1.27,1v.07Zm1,2.95a1.11,1.11,0,0,0,1.09,1.18c.89,0,1.47-.7,1.47-2.11v-.54C77.43,16.26,76.66,16.59,76.66,17.72Z", "M83.59,13H85v.85H83.59V18c0,.76.21,1,.8,1l.58,0v.89a4.63,4.63,0,0,1-1,.12c-1.21,0-1.58-.45-1.58-1.56V13.83h-1V13h1V11.58L83.59,11Z", "M86.05,10H87.2v1.27H86.05Zm0,3H87.2v6.91H86.05Z", "M91.26,12.82c1.87,0,2.59,1.14,2.59,3.61s-.72,3.62-2.59,3.62-2.6-1.14-2.6-3.64S89.4,12.82,91.26,12.82Zm-1.38,3.61c0,1.79.33,2.62,1.38,2.62s1.38-.83,1.38-2.6-.33-2.62-1.38-2.62S89.88,14.67,89.88,16.43Z", "M98.91,15.46c0-1.18-.21-1.75-1.14-1.75s-1.35.73-1.35,2.18v4H95.23V14.06A10.49,10.49,0,0,0,95.16,13h1.21l.06.8a2.1,2.1,0,0,1,1.83-1,1.72,1.72,0,0,1,1.84,1.86v5.22h-1.2Z", "M49.79,31.4c-1.94,0-2.59-1.17-2.59-3.68s.74-3.55,2.59-3.55,2.48.91,2.48,2.81v1.07H48.43v.4c0,1.32.39,1.94,1.36,1.94.72,0,1.19-.47,1.29-1.32h1.18A2.27,2.27,0,0,1,49.79,31.4Zm1.31-4.24v-.59c0-1-.44-1.58-1.27-1.58s-1.38.7-1.4,2.17Z", "M52.89,31.23l2.2-3.69-2-3.22h1.36l1.4,2.44,1.45-2.44H58.6L56.51,27.6l2.35,3.63H57.47l-1.71-2.85L54.2,31.23Z", "M59.72,25.55a8.59,8.59,0,0,0-.06-1.22h1.21l.07.66a1.93,1.93,0,0,1,1.62-.84c1.6,0,2.26,1.17,2.26,3.54s-.69,3.72-2.26,3.72a1.86,1.86,0,0,1-1.65-.95v3.4h-1.2Zm2.6,4.85c.92,0,1.28-.87,1.28-2.64S63.33,25,62.24,25s-1.33.89-1.33,2.78C60.91,29.54,61.32,30.39,62.32,30.39Z", "M73.59,25.21a1.68,1.68,0,0,1,1.73-1.07h.22v1.21h-.3c-1.21,0-1.65.5-1.65,1.69v4.19H72.41V25.48c0-.1,0-.48-.11-1.17h1.19Z", "M77.94,24.32h1.38v.85H77.94v4.15c0,.76.21,1,.8,1l.58,0v.9a4.57,4.57,0,0,1-1,.12c-1.21,0-1.58-.46-1.58-1.56V25.17h-1v-.85h1V22.93l1.18.1Z", "M81.35,29.13c0,.85.43,1.29,1.17,1.29s1.13-.37,1.13-.92-.32-.74-1-1.1l-1.25-.65c-.85-.44-1.24-.87-1.24-1.63,0-1.17.94-2,2.4-2s2.27.72,2.27,1.85v.12H83.55A1,1,0,0,0,82.43,25a.93.93,0,0,0-1,.87c0,.37.23.61.7.84l1.14.56c1.16.58,1.69,1,1.69,2,0,1.27-1,2.11-2.45,2.11s-2.41-.77-2.42-2.27Z", "M68.62,31.4c-1.94,0-2.59-1.17-2.59-3.68s.74-3.55,2.59-3.55,2.48.91,2.48,2.81v1.07H67.25v.4c0,1.32.39,1.94,1.36,1.94.72,0,1.18-.47,1.29-1.32H71.1A2.27,2.27,0,0,1,68.62,31.4Zm1.31-4.24v-.59c0-1-.44-1.58-1.27-1.58s-1.38.7-1.4,2.17Z"];

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
            const group = this.renderer
              .g()
              .attr({
                transform: `translate(740, 450)`,
                class: "exportLogo",
              })
              .add()
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < idLogo.length; i++) {
              this.renderer
                .path()
                .attr({
                  d: idLogo[i],
                  fill: "gray",
                })
                .add(group)
            }
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
      groupPadding: 0,
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
