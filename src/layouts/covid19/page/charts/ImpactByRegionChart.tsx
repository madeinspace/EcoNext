import { ChartTab, ChartTabs, ItemWrapper, ShadowWrapper } from '../../../../styles/MainContentStyles';
import EntityChart from '../../../../components/chart/EntityChart';
import React, { useContext, useState } from 'react';
import { PageContext } from '../../../../utils/context';
import { IdLink } from '../../../../components/ui/links';
import { idlogo, formatChangeInt } from '../../../../utils';
import useEntityText from '../../../../utils/useEntityText';
import ReactChart from '../../../../components/chart/ReactChart';

const ImpactByRegionChart = () => {
  const [Pane, setPane] = useState(1);
  const {
    contentData: { impactByRegionData },
  } = useContext(PageContext);
  const newArr = [];

  const sorter = { GRP: 1, Local_Jobs: 2, UR_Jobs: 3 };

  impactByRegionData.forEach(element => {
    if (element.WebID > 50) {
      newArr.unshift(element);
    } else {
      newArr.push(element);
    }
  });

  newArr.sort((a, b) => sorter[a.Measure] - sorter[b.Measure]);

  const categories = ['GRP', 'Local Jobs', 'Employed Residents'];
  const legends = Array.from(new Set(newArr.map((item: any) => item.GeoName)));

  const makeSerie = param => {
    return legends.reduce((acc: any, cur: any) => {
      const newSeries = newArr.filter(items => items.GeoName === cur);
      return [
        ...acc,
        {
          name: cur,
          className: 'covid19',
          data: newSeries.map(d => d[param]),
        },
      ];
    }, []);
  };

  const withJK = ImpactByRegionChartBuilder(makeSerie('ExJKCompPer'), categories);
  const withoutJK = ImpactByRegionChartBuilder(makeSerie('QtrChgPer'), categories);
  const [options, setHighchartsOptions] = useState(withJK);
  const handleTabChange = (key, value) => {
    setPane(value);
    setHighchartsOptions(value === 1 ? withJK : withoutJK);
  };

  return (
    <ShadowWrapper>
      <ChartTabs Top="90">
        <ChartTab Pane={Pane} id={1} onClick={() => handleTabChange('t', 1)}>
          with the JK scheme
        </ChartTab>
        <ChartTab Pane={Pane} id={2} onClick={() => handleTabChange('t', 2)}>
          without the JK scheme
        </ChartTab>
      </ChartTabs>
      <ReactChart height="300" options={options} />
    </ShadowWrapper>
  );
};
export default ImpactByRegionChart;

const ChartSource = () => (
  <p>
    Source: National Institute of Economic and Industry Research (NIEIR) {useEntityText('Version')}. ©2020 Compiled and
    presented in economy.id by <IdLink />.
  </p>
);

const ImpactByRegionChartBuilder = (series, categories) => {
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
      height: 430,
      chart: {
        marginTop: 130,
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
        reversed: true,
        title: {
          text: yAxisTitle,
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
