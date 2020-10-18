import React, { useContext } from 'react';
import ReactChart from '../../../../components/chart/ReactChart';
import { IdLink } from '../../../../components/ui/links';
import { ShadowWrapper } from '../../../../styles/MainContentStyles';
import { formatNumber, idlogo } from '../../../../utils';
import { PageContext } from '../../../../utils/context';

const ChangeChart = () => {
  const {
    contentData: { extendedData },
    filters: { Ind },
    entityData: { currentIndicator, prefixedAreaName },
  } = useContext(PageContext);

  const postData = extendedData.filter(({ Forecast }) => Forecast === 'Post');
  const lgaData = postData.filter(({ WebID }) => WebID === 10);
  const lookup = {
    1: 'GRP_Change',
    2: 'JTW_Change',
    3: 'UR_Change',
  };

  const makeSerie = data => {
    const serie = data.map(item => item[lookup[+Ind]]);
    return {
      name: prefixedAreaName,
      data: serie,
    };
  };
  const categories = lgaData.map(({ Label }) => Label);
  const lgaSerieNum = [makeSerie(lgaData)];
  const num = ChartBuilder(lgaSerieNum, categories);

  return (
    <ShadowWrapper>
      <ReactChart height="300" options={num} />
    </ShadowWrapper>
  );
};

export default ChangeChart;

const ChartSource = () => (
  <p>
    Source: National Institute of Economic and Industry Research (NIEIR). ©2020 Compiled and presented in economy.id by{' '}
    <IdLink />.
  </p>
);

const ChartBuilder = (series, categories) => {
  const {
    entityData: { currentIndicator },
  } = useContext(PageContext);
  const chartTitle = `Change`;
  const yAxisTitle = `${currentIndicator}`;
  const rawDataSource =
    'Source: National Institute of Economic and Industry Research (NIEIR) Version 2.1 (Sept 2020). ©2020 Compiled and presented in economy.id by .id the population experts.';

  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span>${this.series.name}<br/> ${
      this.category
    }:  ${formatNumber(this.y)}`;
  };

  return {
    highchartOptions: {
      height: 300,
      chart: {
        type: 'column',
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
      series,
      xAxis: {
        categories,
        crosshair: true,
        title: {
          text: '',
        },
      },
      yAxis: {
        title: {
          text: yAxisTitle,
        },
      },
      legend: {
        enabled: true,
      },
    },
    reactChartOptions: {
      className: '',
      footer: {
        rawDataSource,
        dataSource: <ChartSource />,
        logoUrl: idlogo,
      },
    },
  };
};
