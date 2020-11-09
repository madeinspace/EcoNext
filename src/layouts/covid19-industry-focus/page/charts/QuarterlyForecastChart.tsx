import React from 'react';
import ReactChart from '../../../../components/chart/ReactChart';
import { IdLink } from '../../../../components/ui/links';
import { ShadowWrapper } from '../../../../styles/MainContentStyles';
import { formatNumber, idlogo } from '../../../../utils';

const QuarterlyForecastChart = ({ data }) => (
  <ShadowWrapper>
    <ReactChart height="350" options={ChartBuilder(data)} />
  </ShadowWrapper>
);

export default QuarterlyForecastChart;

const ChartBuilder = data => {
  const { chartTitle, type, series, categories, tooltip, yAxis, xAxis, plotOptions } = data;

  const rawDataSource =
    'Source: National Institute of Economic and Industry Research (NIEIR) Version 2.1 (Sept 2020). ©2020 Compiled and presented in economy.id by .id the population experts.';

  return {
    highchartOptions: {
      height: 350,
      chart: {
        type,
      },
      title: {
        text: chartTitle,
      },
      subtitle: {
        text: '',
      },
      tooltip: {
        headerFormat: '',
        pointFormatter: function() {
          return tooltip.apply(this);
        },
      },
      series: series,
      xAxis: {
        categories,
        crosshair: true,
        title: {
          text: '',
        },

        ...xAxis,
      },
      yAxis: {
        title: {
          text: 'title here',
        },
        labels: {
          staggerLines: 0,
          formatter: function() {
            return `${formatNumber(this.value)} `;
          },
        },
        ...yAxis,
      },
      legend: {
        enabled: true,
      },
      plotOptions: {
        series: {
          groupPadding: 0,
        },
        ...plotOptions,
      },
    },
    reactChartOptions: {
      className: '',
      footer: {
        rawDataSource,
        dataSource: (
          <p>
            Source: National Institute of Economic and Industry Research (NIEIR). ©2020 Compiled and presented in
            economy.id by <IdLink />.
          </p>
        ),
        logoUrl: idlogo,
      },
    },
  };
};
