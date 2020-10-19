import React, { useContext } from 'react';
import ReactChart from '../../../../components/chart/ReactChart';
import { IdLink } from '../../../../components/ui/links';
import { ShadowWrapper } from '../../../../styles/MainContentStyles';
import { formatChangeInt, formatNumber, idlogo } from '../../../../utils';
import { ClientContext, PageContext } from '../../../../utils/context';
import useEntityText from '../../../../utils/useEntityText';

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
    Source: National Institute of Economic and Industry Research (NIEIR). ©2020 Compiled and presented in economy.id by{' '}
    <IdLink />.
  </p>
);

const ChartBuilder = () => {
  const {
    contentData: { extendedData },
    filters: { Ind },
    entityData: { currentIndicator, prefixedAreaName },
  } = useContext(PageContext);
  const { LongName } = useContext(ClientContext);

  const postData = extendedData.filter(({ Forecast }) => Forecast === 'Post');
  const lgaData = postData.filter(({ WebID }) => WebID === 10);
  const lookup = {
    1: 'GRP_Actual',
    2: 'JTW_Actual',
    3: 'UR_Actual',
  };

  const makeSerie = data => {
    const serie = data.map(item => item[lookup[+Ind]]);
    return {
      name: LongName,
      data: serie,
    };
  };
  const categories = lgaData.map(({ Label }) => Label);
  const lgaSerieNum = [makeSerie(lgaData)];

  const chartTitle = `Quarterly ${currentIndicator} forecast (${+Ind === 1 ? '$m' : 'Total'})`;
  const yAxisTitle = ``;
  const rawDataSource =
    'Source: National Institute of Economic and Industry Research (NIEIR) Version 2.1 (Sept 2020). ©2020 Compiled and presented in economy.id by .id the population experts.';

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