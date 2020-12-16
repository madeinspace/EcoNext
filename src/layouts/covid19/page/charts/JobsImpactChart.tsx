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

  const measureDisplayText = measure === 'Local_Jobs' ? 'Local jobs' : 'Employed residents';
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

  const Definition = () => {
    return (
      <p>
        Definition: {measureDisplayText} change – change in {measureDisplayText} as defined by the ABS; (2){' '}
        {measureDisplayText} change without JobKeeper – change in {measureDisplayText} in the absence of JobKeeper
        payments; and (3) {measureDisplayText} compensated by JobKeeper – {measureDisplayText} counted as employed who
        would have been unemployed without JobKeeper.
      </p>
    );
  };

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
      <Definition />
      <br />
      <Tabs>
        <Tab Pane={ChartPane} id={1} onClick={() => handleChartChange(1)}>
          {measureDisplayText}
        </Tab>
        <Tab Pane={ChartPane} id={2} onClick={() => handleChartChange(2)}>
          {measureDisplayText} compensated by JobKeeper
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

const ChartSource = measure => {
  const measureDisplayText = measure === 'Local_Jobs' ? 'Local jobs' : 'Employed residents';

  return `Source: National Institute of Economic and Industry Research (NIEIR) ${useEntityText(
    'Version',
  )}. ©2020 Compiled and presented in economy.id by .id informed decisions. `;
};

// #region chart builder change
const localJobsChartBuilder = (series, categories, measure, type) => {
  const { LongName } = useContext(ClientContext);
  const {
    entityData: { currentAreaName },
  } = useContext(PageContext);

  const rawDataSource = ChartSource(measure);

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
        dataSource: ChartSource(measure),
        logoUrl: idlogo,
      },
    },
  };
};

// #endregion

const localJobsDumbellChartBuilder = (series, measure) => {
  const withoutJKDisplayText = `${
    measure === 'Local_Jobs' ? 'Local Jobs change without JobKeeper' : 'Employed Residents change without JobKeeper'
  }`;
  const withJKDisplayText = `${measure === 'Local_Jobs' ? 'Local Jobs change' : 'Employed Residents change'}`;
  const rawDataSource = ChartSource(measure);
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
        text: `<ul><li class="lowDot">${withoutJKDisplayText}</li><li class="highDot">${withJKDisplayText}</li></ul>`,
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
            `</b> <br/> <span class="lowDot">${withoutJKDisplayText}: ` +
            formatNumber(this.points[0].point.high) +
            ' </span>' +
            `<br/><span  class="highDot">${withJKDisplayText}: ` +
            formatNumber(this.points[0].point.low) +
            ' </span>' +
            `<br/><span  class="highDot">Jobs compensated by JobKeeper: ` +
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
        dataSource: <p>{ChartSource(measure)}</p>,
        logoUrl: idlogo,
      },
    },
  };
};
