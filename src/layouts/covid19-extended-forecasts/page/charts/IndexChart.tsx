import React, { useContext } from 'react';
import ReactChart from '../../../../components/chart/ReactChart';
import { IdLink } from '../../../../components/ui/links';
import { ShadowWrapper } from '../../../../styles/MainContentStyles';
import { formatNumber, formatPercent, idlogo } from '../../../../utils';
import { ClientContext, PageContext } from '../../../../utils/context';

const ChangePerChart = () => {
  const {
    contentData: { extendedData },
    filters: { Ind, BMID },
    entityData: { currentBenchmark },
  } = useContext(PageContext);
  const { LongName } = useContext(ClientContext);

  const postData = extendedData.filter(({ Forecast }) => Forecast === 'Post');
  const lgaData = postData.filter(({ WebID }) => WebID === 10);
  const benchmarkData = postData.filter(({ WebID }) => WebID === +BMID);
  const lookup = {
    1: 'GRP_Index',
    2: 'JTW_Index',
    3: 'UR_Index',
  };

  const makeSerie = (data, name) => {
    const serie = data.map(item => item[lookup[+Ind]]);
    return {
      name: name,
      data: serie,
    };
  };
  const categories = lgaData.map(({ Label }) => Label);
  const lgaSerie = makeSerie(lgaData, LongName);
  const bmSerie = makeSerie(benchmarkData, currentBenchmark);
  const lgaSerieNum = [lgaSerie, bmSerie];
  const num = ChartBuilder(lgaSerieNum, categories);

  return (
    <ShadowWrapper>
      <ReactChart height="300" options={num} />
    </ShadowWrapper>
  );
};

export default ChangePerChart;

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
  const chartTitle = `Indexed ${currentIndicator} forecast (Index, 100 = March Qtr 2020)`;
  const yAxisTitle = ``;
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
        type: 'line',
        className: 'extended-forecasts',
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
        tickPositions: [85, 100, 115],
        title: {
          text: yAxisTitle,
        },
        labels: {
          staggerLines: 0,
          formatter: function() {
            return `${this.value} `;
          },
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
