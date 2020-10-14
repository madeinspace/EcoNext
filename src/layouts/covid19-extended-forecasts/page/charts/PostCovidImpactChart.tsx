import { ChartTab, ChartTabs, ItemWrapper, ShadowWrapper } from '../../../../styles/MainContentStyles';
import EntityChart from '../../../../components/chart/EntityChart';
import React, { useContext, useState } from 'react';
import { PageContext } from '../../../../utils/context';
import { IdLink } from '../../../../components/ui/links';
import { idlogo, formatChangeInt } from '../../../../utils';
import useEntityText from '../../../../utils/useEntityText';
import ReactChart from '../../../../components/chart/ReactChart';

const PostCovidImpactChart = () => {
  const [Pane, setPane] = useState(1);
  const {
    contentData: { extendedData },
  } = useContext(PageContext);
  console.log('extendedData: ', extendedData);

  const lgaPost = extendedData.filter(({ WebID, Forecast }) => {
    return WebID === 10 && (Forecast === 'Post' || Forecast === 'Post_Real');
  });

  return (
    <ShadowWrapper>
      <ReactChart height="300" options={ImpactByRegionChartBuilder()} />
    </ShadowWrapper>
    // <EntityChart data={ImpactByRegionChartBuilder(series, categories)} />
  );
};
export default PostCovidImpactChart;

const ChartSource = () => (
  <p>
    Source: National Institute of Economic and Industry Research (NIEIR) {useEntityText('Version')}. ©2020 Compiled and
    presented in economy.id by <IdLink />.
  </p>
);

const ImpactByRegionChartBuilder = () => {
  const chartTitle = `COVID-19 Impacts by Region, Sept 2019 to Sept 2020`;
  const yAxisTitle = `Impact %`;
  const rawDataSource =
    'Source: National Institute of Economic and Industry Research (NIEIR) Version 1.1 (May 2020) ©2020 Compiled and presented in economy.id by .id the population experts. Impacts have been split into: (1)not on JobKeeper – unemployed as defined by the ABS; and (2) JobKeeper – performing reduced hours or not working (i.e. 0 hours). Many will not be contributing to economic activity.';

  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span>${this.series.name}<br/> ${
      this.category
    }:  ${formatChangeInt(this.y)}%`;
  };

  return {
    highchartOptions: {
      title: {
        text: 'Post COVID-19 Forecasts',
        x: -20, //center
      },
      subtitle: {
        text: '',
        x: -20,
      },
      xAxis: {
        categories: ['0', '2007', '2009', '2013', '2018'],
      },
      yAxis: {
        plotLines: [
          {
            value: 0,
            width: 1,
            color: '#808080',
          },
        ],
      },

      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0,
      },
      series: [
        {
          data: [0, 1, 2, 3, 5],
          zoneAxis: 'x',
          zones: [
            {
              value: 3,
            },
            {
              className: 'dash',
            },
          ],
        },
      ],
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
