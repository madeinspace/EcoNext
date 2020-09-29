import { useState, useContext } from 'react';
import { _SubTitle, ChartTabs, ChartTab, ShadowWrapper, Tab, Tabs } from '../../../../styles/MainContentStyles';
import { formatChangeInt, idlogo, formatChangePercent } from '../../../../utils';
import { PageContext, ClientContext } from '../../../../utils/context';
import { IdLink } from '../../../../components/ui/links';
import _ from 'lodash';
import useEntityText from '../../../../utils/useEntityText';
import ReactChart from '../../../../components/chart/ReactChart';

const JobsImpactChart = ({ measure }) => {
  const [Pane, setPane] = useState(1);
  const [ChartPane, setChartPane] = useState(1);
  const {
    filters,
    contentData: { topThreeData },
  } = useContext(PageContext);

  const localJobsNoTotal = topThreeData.filter(
    ({ NieirInd1DigitWebKey, WebID, Measure }) =>
      NieirInd1DigitWebKey != 22000 && WebID === +filters.WebID && Measure === measure,
  );
  console.log(`${measure}`, localJobsNoTotal);
  const localJobsNoTotalPer = localJobsNoTotal;

  const categoriesNum = localJobsNoTotal.map(({ NieirIndWeb1DigitName }) => NieirIndWeb1DigitName);

  const impactWithJK = localJobsNoTotal.map(item => item.NJKQtrComp);
  const impactWithoutJK = localJobsNoTotal.map(item => item.QtrChg);
  const impactWithJKComp = localJobsNoTotal.map(item => Math.abs(item.JKQtrComp));

  const localJobsWithJKPer = localJobsNoTotalPer.map(item => item.QtrChgPer - item.ExJKCompPer);
  const localJobswithoutJKPer = localJobsNoTotalPer.map(item => item.ExJKCompPer);
  const localJobswithoutJKCompPer = localJobsNoTotalPer.map(item => Math.abs(item.JKQtrCompPer));

  const seriesimpactWithJKNumber = [
    {
      className: 'jobkeeper',
      name: `With JK scheme`,
      data: impactWithJK,
    },
  ];
  const seriesImpactWithoutJKNumber = [
    {
      className: 'jobkeeper',
      name: `Without JK scheme`,
      data: impactWithoutJK,
    },
  ];
  const seriesImpactWithJKCompNumber = [
    {
      className: 'jobkeeper',
      name: `Jobs compensated by JK scheme`,
      data: impactWithJKComp,
    },
  ];

  const seriesImpactWithJKPer = [
    {
      className: 'jobkeeper',
      name: `With JK scheme`,
      data: localJobsWithJKPer,
    },
  ];
  const serieImpactWithoutJKPer = [
    {
      className: 'jobkeeper',
      name: `Without JK scheme`,
      data: localJobswithoutJKPer,
    },
  ];
  const seriesImpactWithJKCompPer = [
    {
      className: 'jobkeeper',
      name: `Jobs compensated by JK scheme`,
      data: localJobswithoutJKCompPer,
    },
  ];

  const LocalJobsWithJKNumber: any = localJobsChartBuilder(seriesimpactWithJKNumber, categoriesNum, measure, 1);
  const LocalJobsWithoutJKNumber: any = localJobsChartBuilder(seriesImpactWithoutJKNumber, categoriesNum, measure, 1);
  const LocalJobsWithJKCompNumber: any = localJobsChartBuilder(seriesImpactWithJKCompNumber, categoriesNum, measure, 1);
  const LocalJobsWithJKPer: any = localJobsChartBuilder(seriesImpactWithJKPer, categoriesNum, measure, 2);
  const LocalJobswithoutJKPer: any = localJobsChartBuilder(serieImpactWithoutJKPer, categoriesNum, measure, 2);
  const LocalJobswithoutJKCompPer: any = localJobsChartBuilder(seriesImpactWithJKCompPer, categoriesNum, measure, 2);

  const dataSetChoser = (key, paneID = Pane) => {
    console.log('Pane: ', Pane);
    switch (key) {
      case 1:
        return paneID === 1 ? LocalJobsWithJKNumber : LocalJobsWithJKPer;
      case 2:
        return paneID === 1 ? LocalJobsWithoutJKNumber : LocalJobswithoutJKPer;
      case 3:
        return paneID === 1 ? LocalJobsWithJKCompNumber : LocalJobswithoutJKCompPer;
      default:
        return LocalJobsWithJKNumber;
    }
  };

  const [options, setHighchartsOptions] = useState(LocalJobsWithJKNumber);

  const handleChartChange = key => {
    setChartPane(key);
    setHighchartsOptions(dataSetChoser(key));
  };

  const handleTabChange = (key, value) => {
    setPane(value);
    setHighchartsOptions(dataSetChoser(ChartPane, value));
  };

  return (
    <>
      <Tabs>
        <Tab Pane={ChartPane} id={1} onClick={() => handleChartChange(1)}>
          With JK scheme
        </Tab>
        <Tab Pane={ChartPane} id={2} onClick={() => handleChartChange(2)}>
          Without JK scheme
        </Tab>
        <Tab Pane={ChartPane} id={3} onClick={() => handleChartChange(3)}>
          Jobs compensated by JK scheme
        </Tab>
      </Tabs>
      <ShadowWrapper>
        <ChartTabs>
          <ChartTab Pane={Pane} id={1} onClick={() => handleTabChange('t', 1)}>
            Number
          </ChartTab>
          <ChartTab Pane={Pane} id={2} onClick={() => handleTabChange('t', 2)}>
            Percentage
          </ChartTab>
        </ChartTabs>
        <ReactChart height="500" options={options} />
      </ShadowWrapper>
    </>
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
  } Impact in Sept quarter 2020 (compared to Sept quarter 2019)`;
  const chartSubtitle = `${currentAreaName}`;
  const xAxisTitle = 'Industry sector';
  const yAxisTitle =
    type === 1 ? `Change in the number of employed (estimated)` : `% Change in the number of employed (estimated)`;
  const rawDataSource = `Source: National Institute of Economic and Industry Research (NIEIR) ${useEntityText(
    'Version',
  )} ©2020 Compiled and presented in economy.id by .id the population experts. Impacts have been split into: (1)not on JobKeeper – unemployed as defined by the ABS; and (2) JobKeeper – performing reduced hours or not working (i.e. 0 hours). Many will not be contributing to economic activity.`;
  const chartHeight = 650;

  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${this.category}, ${LongName}: ${
      type === 1 ? formatChangeInt(this.y) : formatChangePercent(this.y) + '%'
    }`;
  };

  return {
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

// #endregion
