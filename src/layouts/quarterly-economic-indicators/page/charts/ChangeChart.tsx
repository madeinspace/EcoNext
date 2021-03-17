import React, { useContext } from 'react';
import ReactChart from '../../../../components/chart/ReactChart';
import { IdLink } from '../../../../components/ui/links';
import { ShadowWrapper } from '../../../../styles/MainContentStyles';
import { formatChangeInt, formatNumber, idlogo } from '../../../../utils';
import { ClientContext, PageContext } from '../../../../utils/context';

const ChangeChart = () => {
  const {
    contentData: { extendedData },
    filters: { Ind, WebID },
    entityData: { currentArea },
  } = useContext(PageContext);

  const LGAID = +WebID;
  const lgaData = extendedData.filter(({ WebID }) => WebID === LGAID);

  const lookup = {
    1: 'GRP_Change',
    2: 'JTW_Change',
    3: 'UR_Change',
  };

  const makeSerie = data => {
    const serie = data.map(item => item[lookup[+Ind]]);
    return {
      name: currentArea,
      data: serie,
    };
  };
  const categories = lgaData.map(({ Label }) => Label);
  const lgaSerieNum = [makeSerie(lgaData)];
  const num = ChartBuilder(lgaSerieNum, categories);

  return (
    <ShadowWrapper>
      <ReactChart height="350" options={num} />
    </ShadowWrapper>
  );
};

export default ChangeChart;

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
  const chartTitle = `Quarterly change in ${currentIndicator} (${+Ind === 1 ? '$m' : 'Total'})`;
  const yAxisTitle = ``;
  const rawDataSource =
    'Source: National Institute of Economic and Industry Research (NIEIR). ©2021 Compiled and presented in economy.id by .id informed decisions.';

  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span>${this.series.name}<br/> ${
      this.category
    }:  ${formatNumber(this.y)} ${+Ind === 1 ? 'm' : ''}`;
  };

  return {
    highchartOptions: {
      height: 350,
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
      plotOptions: {
        series: {
          groupPadding: 0,
        },
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
