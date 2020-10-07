import { useState, useContext } from 'react';
import { _SubTitle, ChartTabs, ChartTab, ShadowWrapper, Tab, Tabs } from '../../../../styles/MainContentStyles';
import { formatChangeInt, idlogo, formatChangePercent, formatNumber } from '../../../../utils';
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

  const localJobsNoTotal = _.sortBy(
    topThreeData.filter(
      ({ NieirInd1DigitWebKey, WebID, Measure }) =>
        NieirInd1DigitWebKey != 22000 && WebID === +filters.WebID && Measure === measure,
    ),
    'NJKQtrComp',
  ).reverse();

  const categoriesNum = localJobsNoTotal.map(({ NieirIndWeb1DigitName }) => NieirIndWeb1DigitName);

  const localJobsDBSerie = localJobsNoTotal.reduce((acc, cur) => {
    const dbIbject = { name: cur.NieirIndWeb1DigitName, low: cur.NJKQtrComp, high: cur.QtrChg };
    return [...acc, dbIbject];
  }, []);

  const impactWithJKComp = localJobsNoTotal.map(item => Math.abs(item.JKQtrComp));

  const localJobswithoutJKCompPer = localJobsNoTotal.map(item => Math.abs(item.JKQtrCompPer));

  const LocalJobsWithJKCompNumber: any = localJobsChartBuilder(impactWithJKComp, categoriesNum, measure, 1);
  const LocalJobswithoutJKCompPer: any = localJobsChartBuilder(localJobswithoutJKCompPer, categoriesNum, measure, 2);

  const dbOptions = localJobsDumbellChartBuilder(localJobsDBSerie, measure);

  const dataSetChoser = (key, paneID = Pane) => {
    switch (key) {
      case 1:
        return dbOptions;
      case 2:
        return paneID === 1 ? LocalJobsWithJKCompNumber : LocalJobswithoutJKCompPer;
      default:
        return dbOptions;
    }
  };

  const [options, setHighchartsOptions] = useState(dbOptions);

  const handleChartChange = key => {
    setChartPane(key);
    setHighchartsOptions(dataSetChoser(key));
  };

  const handleTabChange = key => {
    setPane(key);
    setHighchartsOptions(dataSetChoser(ChartPane, key));
  };

  return (
    <>
      <Tabs>
        <Tab Pane={ChartPane} id={1} onClick={() => handleChartChange(1)}>
          Jobs
        </Tab>
        <Tab Pane={ChartPane} id={2} onClick={() => handleChartChange(2)}>
          Jobs compensated by JobKeeper
        </Tab>
      </Tabs>
      <ShadowWrapper>
        {ChartPane === 2 && (
          <ChartTabs>
            <ChartTab Pane={Pane} id={1} onClick={() => handleTabChange(1)}>
              Number
            </ChartTab>
            <ChartTab Pane={Pane} id={2} onClick={() => handleTabChange(2)}>
              Percentage
            </ChartTab>
          </ChartTabs>
        )}
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

  const rawDataSource = `Source: National Institute of Economic and Industry Research (NIEIR) ${useEntityText(
    'Version',
  )} ©2020 Compiled and presented in economy.id by .id the population experts. Impacts have been split into: (1)not on JobKeeper – unemployed as defined by the ABS; and (2) JobKeeper – performing reduced hours or not working (i.e. 0 hours). Many will not be contributing to economic activity.`;

  return {
    highchartOptions: {
      height: 650,
      chart: {
        type: 'bar',
      },
      title: {
        text: `${
          measure === 'Local_Jobs' ? 'Local Jobs' : 'Employed Resident'
        } Impact in Sept quarter 2020 (compared to Sept quarter 2019)`,
      },
      subtitle: {
        text: `${currentAreaName}`,
      },
      tooltip: {
        headerFormat: '',
        formatter: function() {
          return `<span class="highcharts-color-${this.points[0].colorIndex}">\u25CF</span> ${this.x}, ${LongName}: ${
            type === 1 ? formatChangeInt(this.y) : formatChangePercent(this.y) + '%'
          }`;
        },
      },
      plotOptions: {
        series: {
          stacking: 'normal',
        },
      },
      series: [
        {
          className: 'jobkeeper',
          data: series,
        },
      ],
      xAxis: {
        categories,
        title: {
          text: 'Industry sector',
        },
      },
      yAxis: [
        {
          crosshair: true,
          title: {
            text:
              type === 1
                ? `Change in the number of employed (estimated)`
                : `% Change in the number of employed (estimated)`,
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

const localJobsDumbellChartBuilder = (series, measure) => {
  const { LongName } = useContext(ClientContext);
  const {
    entityData: { currentAreaName },
  } = useContext(PageContext);

  const rawDataSource = `Source: National Institute of Economic and Industry Research (NIEIR) ${useEntityText(
    'Version',
  )} ©2020 Compiled and presented in economy.id by .id the population experts. Impacts have been split into: (1)not on JobKeeper – unemployed as defined by the ABS; and (2) JobKeeper – performing reduced hours or not working (i.e. 0 hours). Many will not be contributing to economic activity.`;

  return {
    highchartOptions: {
      height: 650,
      chart: {
        type: 'dumbbell',
        inverted: true,
        zoomType: 'x',
      },

      legend: {
        enabled: false,
      },

      subtitle: {
        useHTML: true,
        text: '<ul><li class="lowDot"> Without JobKeeper</li><li class="highDot">With JobKeeper</li></ul>',
      },

      title: {
        text: `${
          measure === 'Local_Jobs' ? 'Local Jobs' : 'Employed Resident'
        } Impact in Sept quarter 2020 (compared to Sept quarter 2019)`,
      },

      tooltip: {
        shared: true,
        useHTML: true,
        formatter: function() {
          return (
            '<b>' +
            this.points[0].point.name +
            '</b> <br/> <span class="lowDot" >Without JobKeeper: ' +
            formatNumber(this.points[0].point.high) +
            ' </span>' +
            '<br/><span  class="highDot" >With JobKeeper: ' +
            formatNumber(this.points[0].point.low) +
            ' </span>' +
            '<br/><span  class="highDot" >Jobs compensated by JobKeeper: ' +
            formatNumber(Math.abs(this.points[0].point.high - this.points[0].point.low)) +
            ' </span>'
          );
        },
      },

      xAxis: {
        type: 'category',
        title: {
          text: 'Industry sector',
        },
      },

      yAxis: {
        labels: {
          staggerLines: 0,
          formatter: function() {
            return formatChangeInt(this.value);
          },
        },
        plotLines: [
          {
            dashStyle: 'longdashdot',
            width: 1,
            value: 0,
            zIndex: 2,
          },
        ],
        title: {
          text: `Change in the number of employed (estimated)`,
        },
      },
      plotOptions: {
        dumbbell: {
          grouping: false,
        },
      },

      series: [
        {
          data: series,
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
