import { useState, useContext } from 'react';
import { ItemWrapper, _SubTitle, Tab, Tabs, ChartTabs, ChartTab } from '../../../../styles/MainContentStyles';
import EntityChart from '../../../../components/chart/EntityChart';
import { formatChangeInt, idlogo, formatPercent } from '../../../../utils';
import { PageContext, ClientContext } from '../../../../utils/context';
import { IdLink } from '../../../../components/ui/links';
import _ from 'lodash';
import InfoBox from '../../../../components/ui/infoBox';
import useEntityText from '../../../../utils/useEntityText';

const JobsImpactChart = ({ measure }) => {
  const [Pane, setPane] = useState(1);
  const handleTabChange = (key, value) => setPane(value);
  const {
    filters,
    contentData: { topThreeData },
  } = useContext(PageContext);

  const localJobsNoTotal = topThreeData.filter(
    ({ NieirInd1DigitWebKey, WebID, Measure }) =>
      NieirInd1DigitWebKey != 22000 && WebID === +filters.WebID && Measure === measure,
  );
  const localJobsNoTotalPer = _.sortBy(localJobsNoTotal, 'QtrChgPer').reverse();

  const categoriesNum = localJobsNoTotal.map(({ NieirIndWeb1DigitName }) => NieirIndWeb1DigitName);
  const categoriesPer = localJobsNoTotalPer.map(({ NieirIndWeb1DigitName }) => NieirIndWeb1DigitName);
  const localJobsWithoutJK = localJobsNoTotal.map(item => item.NJKQtrComp);
  const localJobsWithJK = localJobsNoTotal.map(item => item.JKQtrComp);
  const localJobswithoutJKPer = localJobsNoTotalPer.map(item => item.ExJKCompPer);
  const localJobsWithJKPer = localJobsNoTotalPer.map(item => item.QtrChgPer - item.ExJKCompPer);

  const seriesNumber = [
    {
      className: 'jobkeeper',
      name: `JobKeeper Component`,
      data: localJobsWithJK,
    },
    {
      name: `Not on JobKeeper`,
      data: localJobsWithoutJK,
    },
  ];
  const seriesPer = [
    {
      className: 'jobkeeper',
      name: `JobKeeper Component`,
      data: localJobsWithJKPer,
    },
    {
      name: `Not on JobKeeper`,
      data: localJobswithoutJKPer,
    },
  ];
  return (
    <ItemWrapper>
      <ChartTabs>
        <ChartTab Pane={Pane} id={1} onClick={() => handleTabChange('t', 1)}>
          Number
        </ChartTab>
        <ChartTab Pane={Pane} id={2} onClick={() => handleTabChange('t', 2)}>
          Percentage
        </ChartTab>
      </ChartTabs>
      {Pane === 1 && <EntityChart data={localJobsChartBuilder(seriesNumber, categoriesNum, measure, 1)} />}
      {Pane === 2 && <EntityChart data={localJobsChartBuilder(seriesPer, categoriesPer, measure, 2)} />}
    </ItemWrapper>
  );
};

export default JobsImpactChart;

const ChartSource = () => (
  <p>
    Source: National Institute of Economic and Industry Research (NIEIR) {useEntityText('Version')}. ©2020 Compiled and
    presented in economy.id by <IdLink />. Impacts have been split into: (1) not on JobKeeper – unemployed as defined by
    the ABS; and (2) JobKeeper – performing reduced hours or not working (i.e. 0 hours). Many will not be contributing
    to economic activity.
  </p>
);

// #region chart builder change
const localJobsChartBuilder = (series, categories, measure, type) => {
  const { LongName } = useContext(ClientContext);
  const {
    entityData: { currentAreaName },
  } = useContext(PageContext);

  const chartType = 'bar';
  const chartTitle = `${
    measure === 'Local_Jobs' ? 'Local Jobs' : 'Employed Resident'
  } Impact in June Quarter 2020 (compared to 2018/19 quarter average)`;
  const chartSubtitle = `${currentAreaName}`;
  const xAxisTitle = 'Industry sector';
  const yAxisTitle =
    type === 1 ? `Change in the number of employed (estimated)` : `% Change in the number of employed (estimated)`;
  const rawDataSource = `Source: National Institute of Economic and Industry Research (NIEIR) ${useEntityText(
    'Version',
  )} ©2020 Compiled and presented in economy.id by .id the population experts. Impacts have been split into: (1)not on JobKeeper – unemployed as defined by the ABS; and (2) JobKeeper – performing reduced hours or not working (i.e. 0 hours). Many will not be contributing to economic activity.`;
  const chartContainerID = `${measure}JobsChart${type}`;
  const chartTemplate = 'Standard';
  const chartHeight = 500;

  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${this.category}, ${LongName}: ${
      type === 1 ? formatChangeInt(this.y) : formatPercent(this.y) + '%'
    }`;
  };

  return {
    cssClass: '',
    highchartOptions: {
      height: chartHeight,
      chart: {
        type: chartType,
      },
      title: {
        text: chartTitle,
      },
      subtitle: {
        text: chartSubtitle,
      },
      tooltip: {
        headerFormat: '',
        pointFormatter: function() {
          return tooltip.apply(this);
        },
      },
      plotOptions: {
        series: {
          stacking: 'normal',
        },
      },
      series,
      xAxis: {
        categories,
        title: {
          text: xAxisTitle,
        },
      },
      yAxis: [
        {
          crosshair: true,
          title: {
            text: yAxisTitle,
          },
          labels: {
            staggerLines: 0,
            formatter: function() {
              return formatChangeInt(this.value);
            },
          },
        },
      ],
    },
    rawDataSource,
    dataSource: <ChartSource />,
    chartContainerID,
    logoUrl: idlogo,
    chartTemplate,
  };
};

// #endregion
