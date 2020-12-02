import React, { useContext } from 'react';
import ReactChart from '../../../../components/chart/ReactChart';
import { IdLink } from '../../../../components/ui/links';
import { ShadowWrapper } from '../../../../styles/MainContentStyles';
import { formatChangeInt, formatNumber, formatPercent, idlogo } from '../../../../utils';
import { ClientContext, PageContext } from '../../../../utils/context';

const ImpactChart = ({ data }) => {
  const chartOptions = ChartBuilder(data);

  return (
    <ShadowWrapper>
      <ReactChart height="300" options={chartOptions} />
    </ShadowWrapper>
  );
};

export default ImpactChart;

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
          text: '',
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
        ...plotOptions,
        series: {
          pointPadding: 0,
          groupPadding: 0.14,
          borderWidth: 0,
        },
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
