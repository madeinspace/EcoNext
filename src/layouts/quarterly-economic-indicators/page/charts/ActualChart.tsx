import React, { useContext } from 'react';
import ReactChart from '../../../../components/chart/ReactChart';
import { IdLink } from '../../../../components/ui/links';
import { ShadowWrapper } from '../../../../styles/MainContentStyles';
import { formatNumber, idlogo } from '../../../../utils';
import { ClientContext, PageContext } from '../../../../utils/context';

const ActualChart = () => {
  return (
    <ShadowWrapper>
      <ReactChart height="350" options={ChartBuilder()} />
    </ShadowWrapper>
  );
};

export default ActualChart;

const ChartSource = () => (
  <p>
    Source: National Institute of Economic and Industry Research (NIEIR). ©2021 Compiled and presented in economy.id by{' '}
    <IdLink />.
  </p>
);

const ChartBuilder = () => {
  const {
    contentData: { extendedData },
    filters: { Ind, WebID },
    entityData: { currentIndicator, currentArea },
  } = useContext(PageContext);

  const LGAID = +WebID;
  const lgaData = extendedData.filter(({ WebID }) => WebID === LGAID);
  const lookup = {
    1: 'GRP_Actual',
    2: 'JTW_Actual',
    3: 'UR_Actual',
  };

  const makeSerie = data => {
    const serie = data.map(item => item[lookup[+Ind]]);
    return {
      name: currentArea,
      data: serie,
    };
  };
  const categories = lgaData.map(({ Label }) => Label);
  const actualSerie = makeSerie(lgaData);
  const min = Math.min(...actualSerie.data);
  const lgaSerieNum = [actualSerie];

  const chartTitle = `Quarterly ${currentIndicator} (${+Ind === 1 ? '$m' : 'Total'})`;
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
      series: lgaSerieNum,
      xAxis: {
        categories,
        crosshair: true,
        title: {
          text: '',
        },
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
        softMin: undefined,
        min: Math.floor(min) - min * 0.1,
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
