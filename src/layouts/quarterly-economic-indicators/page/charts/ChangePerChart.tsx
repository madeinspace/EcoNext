import React, { useContext } from 'react';
import ReactChart from '../../../../components/chart/ReactChart';
import { IdLink } from '../../../../components/ui/links';
import { ShadowWrapper } from '../../../../styles/MainContentStyles';
import { formatChangeInt, formatPercent, idlogo } from '../../../../utils';
import { ClientContext, PageContext } from '../../../../utils/context';

const ChangePerChart = () => {
  const {
    contentData: { extendedData },
    filters: { Ind, BMID, WebID },
    entityData: { currentBenchmark, currentArea },
  } = useContext(PageContext);
  const LGAID = +WebID;
  const lgaData = extendedData.filter(({ WebID }) => WebID === LGAID);
  const BMData = extendedData.filter(({ WebID }) => WebID === +BMID);
  const benchmarkData = BMData.filter(({ WebID }) => {
    return WebID === +BMID;
  });
  const lookup = {
    1: 'GRP_Change_Per',
    2: 'JTW_Change_Per',
    3: 'UR_Change_Per',
  };

  const makeSerie = (data, name) => {
    const serie = data.map(item => item[lookup[+Ind]] * 100);
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
    filters: { Ind },
    entityData: { currentIndicator },
  } = useContext(PageContext);
  const chartTitle = `Quarterly percentage change in ${currentIndicator} (%)`;
  const yAxisTitle = ``;
  const rawDataSource =
    'Source: National Institute of Economic and Industry Research (NIEIR). ©2021 Compiled and presented in economy.id by .id informed decisions.';

  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span>${this.series.name}<br/> ${
      this.category
    }:  ${formatPercent(this.y)}%`;
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
        allowDecimals: false,
        crosshair: true,
        title: {
          text: '',
        },
      },
      yAxis: {
        labels: {
          formatter: function() {
            return `${formatChangeInt(this.value)} `;
          },
        },
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
