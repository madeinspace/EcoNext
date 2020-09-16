import { ItemWrapper } from '../../../../styles/MainContentStyles';
import EntityChart from '../../../../components/chart/EntityChart';
import { useContext } from 'react';
import { PageContext } from '../../../../utils/context';
import { IdLink } from '../../../../components/ui/links';
import { idlogo, formatChangeInt } from '../../../../utils';
import useEntityText from '../../../../utils/useEntityText';

const ImpactByRegionChart = () => {
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

  const categories = ['GRP', 'Local Jobs (incl JobKeeper)', 'Employed Residents (incl Jobkeeper)'];
  const legends = Array.from(new Set(newArr.map((item: any) => item.GeoName)));

  const series = legends.reduce((acc: any, cur: any) => {
    const newSeries = newArr.filter(items => items.GeoName === cur);
    return [
      ...acc,
      {
        name: cur,
        className: 'covid19',
        data: newSeries.map(d => d.QtrChgPer),
      },
    ];
  }, []);
  return (
    <ItemWrapper>
      <EntityChart data={ImpactByRegionChartBuilder(series, categories)} />
    </ItemWrapper>
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
  const chartContainerID = `ImpactByRegionChart`;
  const chartTemplate = 'Standard';

  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span>${this.series.name}<br/> ${
      this.category
    }:  ${formatChangeInt(this.y)}%`;
  };

  return {
    cssClass: '',
    highchartOptions: {
      height: 300,
      chart: {
        type: 'column',
      },
      title: {
        text: chartTitle,
      },
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
      tooltip: {
        headerFormat: '',
        pointFormatter: function() {
          return tooltip.apply(this);
        },
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series,
    },
    rawDataSource,
    dataSource: <ChartSource />,
    chartContainerID,
    logoUrl: idlogo,
    chartTemplate,
  };
};
