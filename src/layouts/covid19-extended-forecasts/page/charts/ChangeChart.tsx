import React, { useContext } from 'react';
import ReactChart from '../../../../components/chart/ReactChart';
import { IdLink } from '../../../../components/ui/links';
import { ShadowWrapper } from '../../../../styles/MainContentStyles';
import { formatChangeInt, formatNumber, idlogo } from '../../../../utils';
import { ClientContext, PageContext } from '../../../../utils/context';

const ChangeChart = () => {
  const {
    contentData: { extendedData },
    filters: { Ind },
  } = useContext(PageContext);
  const { LongName } = useContext(ClientContext);

  const postData = extendedData.filter(({ Forecast }) => Forecast === 'Post');
  const lgaData = postData.filter(({ WebID }) => WebID === 10);
  const lookup = {
    1: 'GRP_Change',
    2: 'JTW_Change',
    3: 'JTW_P_Change',
    4: 'UR_Change',
    5: 'UR_P_Change',
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
    Source: National Institute of Economic and Industry Research (NIEIR). ©2020 Compiled and presented in economy.id by{' '}
    <IdLink />.
  </p>
);

const ChartBuilder = (series, categories) => {
  const {
    filters: { Ind },
    entityData: { currentIndicator },
  } = useContext(PageContext);
  const chartTitle = `Quarterly change in ${currentIndicator} forecast (${+Ind === 1 ? '$m' : 'Total'})`;
  const yAxisTitle = ``;
  const rawDataSource =
    'Source: National Institute of Economic and Industry Research (NIEIR) Version 2.1 (Sept 2020). ©2020 Compiled and presented in economy.id by .id informed decisions.';

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
