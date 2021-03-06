import React, { useContext } from 'react';
import ReactChart from '../../../../components/chart/ReactChart';
import { IdLink } from '../../../../components/ui/links';
import { ShadowWrapper } from '../../../../styles/MainContentStyles';
import { formatNumber, idlogo } from '../../../../utils';
import { ClientContext, PageContext } from '../../../../utils/context';

const ChangePerChart = () => {
  const {
    contentData: { extendedData },
    filters: { Ind, BMID, WebID },
    entityData: { currentBenchmark, currentArea },
  } = useContext(PageContext);
  const LGAID = +WebID;
  const lgaData = extendedData.filter(({ WebID }) => WebID === LGAID);
  const benchmarkData = extendedData.filter(({ WebID }) => WebID === +BMID);
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
  const lgaSerie = makeSerie(lgaData, currentArea);
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
    Source: National Institute of Economic and Industry Research (NIEIR). ©2021 Compiled and presented in economy.id by{' '}
    <IdLink />.
  </p>
);

const ChartBuilder = (series, categories) => {
  const {
    entityData: { currentIndicator },
  } = useContext(PageContext);
  const chartTitle = `Indexed ${currentIndicator} (Index, 100 = Sept Qtr 2016)`;
  const yAxisTitle = ``;
  const rawDataSource =
    'Source: National Institute of Economic and Industry Research (NIEIR). ©2021 Compiled and presented in economy.id by .id informed decisions.';

  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span>${this.series.name}<br/> ${
      this.category
    }:  ${formatNumber(this.y)}`;
  };
  const values = [...series[0].data, ...series[1].data];

  const max = Math.ceil(Math.max(...values));
  const min = Math.floor(Math.min(...values));

  const maxDiff = () => Math.max(Math.abs(Math.min(max, min) - 100), Math.abs(Math.max(max, min) - 100));
  const maxdif = maxDiff() + 2;

  const indexRange = [100 - maxdif, 100, 100 + maxdif];

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
        tickPositions: indexRange,
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
