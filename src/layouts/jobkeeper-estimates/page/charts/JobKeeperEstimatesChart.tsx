import React, { useContext, useState } from 'react';
import ReactChart from '../../../../components/chart/ReactChart';
import { ChartTab, ChartTabs, ShadowWrapper } from '../../../../styles/MainContentStyles';
import { formatChangeNumber, formatNumber, formatPercent, idlogo } from '../../../../utils';
import { ClientContext, PageContext } from '../../../../utils/context';

const JobKeeperEstimatesChart = ({ measure }) => {
  const [Pane, setPane] = useState(1);
  const optionNum = chartBuilder(measure, '');
  const optionPer = chartBuilder(measure, '_Per');

  const handleTabChange = value => setPane(value);

  return (
    <>
      <ShadowWrapper>
        <ChartTabs>
          <ChartTab Pane={Pane} id={1} onClick={() => handleTabChange(1)}>
            number
          </ChartTab>
          <ChartTab Pane={Pane} id={2} onClick={() => handleTabChange(2)}>
            percentage
          </ChartTab>
        </ChartTabs>
        {Pane === 1 && <ReactChart height="650" options={optionNum} />}
        {Pane === 2 && <ReactChart height="650" options={optionPer} />}
      </ShadowWrapper>
    </>
  );
};
export default JobKeeperEstimatesChart;

const ChartSource = () => (
  <p>
    Source: National Institute of Economic and Industry Research (NIEIR). ©2020 Compiled and presented in economy.id by
    .id informed decisions.
  </p>
);

const chartBuilder = (measure, prefix = '') => {
  const {
    filters: { Ind },
    entityData: { currentQuarter },
    contentData: { JobKeeperData },
  } = useContext(PageContext);
  const { LongName } = useContext(ClientContext);

  const parents = JobKeeperData.filter(({ Hierarchy }) => Hierarchy === 'P');
  const children = JobKeeperData.filter(({ Hierarchy }) => Hierarchy === 'C');
  parents.forEach(parent => {
    parent.children = children.filter(
      child =>
        child.IndWebKey > parent.IndWebKey && child.IndWebKey < parent.IndWebKey + 100 && parent.WebID == child.WebID,
    );
  });
  const ParentSerie = parents.map(item => {
    const y = item[`${measure}${prefix}`];
    return {
      name: item.IndWebName,
      y,
      drilldown: `${item.IndWebName}-${currentQuarter}`,
    };
  });

  const drilldownLGASerie = parents.map(parent => {
    return {
      name: `${LongName}, ${parent.IndWebName}`,
      id: `${parent.IndWebName}-${currentQuarter}`,
      data: parent.children.map(child => {
        return [`${child.IndWebName}`, child[`${measure}${prefix}`]];
      }),
    };
  });

  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span>${this.name}<br/> ${
      prefix === '_Per' ? formatPercent(this.y) + '%' : `${formatNumber(this.y)} Jobs`
    }`;
  };

  return {
    highchartOptions: {
      height: 650,
      chart: {
        type: 'bar',
      },
      title: {
        text: `${
          measure === 'LJ_JK' ? 'Local Jobs Impact' : 'Employed Resident Impact'
        } in ${currentQuarter} (compared to Sept quarter 2019)`,
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
      series: [{ name: `${LongName}, All industries`, data: ParentSerie }],
      xAxis: {
        type: 'category',
        crosshair: true,
        title: {
          text: '',
        },
      },
      yAxis: {
        title: {
          text: `${currentQuarter} ${+Ind === 1 || +Ind === 2 ? '($M)' : ''}`,
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
      drilldown: {
        allowPointDrilldown: true,
        activeAxisLabelStyle: {
          textDecoration: 'none',
          fontStyle: 'italic',
        },
        activeDataLabelStyle: {
          textDecoration: 'none',
          fontStyle: 'italic',
        },
        series: drilldownLGASerie,
      },
    },
    reactChartOptions: {
      className: '',
      footer: {
        rawDataSource:
          'Source: National Institute of Economic and Industry Research (NIEIR). ©2020 Compiled and presented in economy.id by .id informed decisions.',
        dataSource: <ChartSource />,
        logoUrl: idlogo,
      },
    },
  };
};
