import { ChartTab, ChartTabs, ItemWrapper, ShadowWrapper } from '../../../../styles/MainContentStyles';
import EntityChart from '../../../../components/chart/EntityChart';
import React, { useContext, useState } from 'react';
import { PageContext } from '../../../../utils/context';
import { IdLink } from '../../../../components/ui/links';
import { idlogo, formatChangeInt } from '../../../../utils';
import useEntityText from '../../../../utils/useEntityText';
import ReactChart from '../../../../components/chart/ReactChart';

const PostCovidImpactChart = measure => {
  const {
    contentData: { extendedData },
  } = useContext(PageContext);

  const lgaPost = extendedData.filter(({ WebID, Forecast }) => {
    return WebID === 10 && Forecast === 'Post';
  });
  const lgaPostReal = extendedData.filter(({ WebID, Forecast }) => {
    return WebID === 10 && Forecast === 'Pre';
  });

  const MakeSerie = (data, measure) => {
    return data.map(d => d[measure]);
  };

  const lgaPostSerie = MakeSerie(lgaPost, 'GRP_Actual');
  const lgaPostRealSerie = MakeSerie(lgaPostReal, 'GRP_Actual');

  const series = [
    {
      name: 'New projections',
      data: lgaPostSerie,
      zoneAxis: 'x',
      zones: [
        {
          value: 6,
        },
        {
          className: 'dash red',
        },
      ],
    },
    {
      name: 'NIER 2019 projections',
      data: lgaPostRealSerie,
      zones: [
        {
          value: 6,
        },
        {
          className: 'dash',
        },
      ],
    },
  ];

  const categories = lgaPost.map(({ Label }) => Label);

  return (
    <ShadowWrapper>
      <ReactChart height="300" options={ImpactByRegionChartBuilder(categories, series)} />
    </ShadowWrapper>
  );
};
export default PostCovidImpactChart;

const ChartSource = () => (
  <p>
    Source: National Institute of Economic and Industry Research (NIEIR) {useEntityText('Version')}. ©2020 Compiled and
    presented in economy.id by <IdLink />.
  </p>
);

const ImpactByRegionChartBuilder = (categories, series) => {
  const rawDataSource =
    'Source: National Institute of Economic and Industry Research (NIEIR) Version 1.1 (May 2020) ©2020 Compiled and presented in economy.id by .id informed decisions. Impacts have been split into: (1)not on JobKeeper – unemployed as defined by the ABS; and (2) JobKeeper – performing reduced hours or not working (i.e. 0 hours). Many will not be contributing to economic activity.';

  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span>${this.series.name}<br/> ${
      this.category
    }:  ${formatChangeInt(this.y)}%`;
  };

  return {
    highchartOptions: {
      title: {
        text: 'Post COVID-19 Forecasts',
      },
      xAxis: {
        categories,
        title: {
          text: '',
        },
      },
      yAxis: {
        title: {
          text: 'Measure',
        },
      },
      series,
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
