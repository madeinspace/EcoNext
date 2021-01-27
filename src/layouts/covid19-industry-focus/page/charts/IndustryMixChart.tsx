import React, { useContext, useState } from 'react';
import ReactChart from '../../../../components/chart/ReactChart';
import { ChartTab, ChartTabs, ShadowWrapper } from '../../../../styles/MainContentStyles';
import { formatChangeNumber, formatNumber, formatPercent, idlogo } from '../../../../utils';
import { ClientContext, PageContext } from '../../../../utils/context';

const IndustryMixChart = () => {
  const [Pane, setPane] = useState(1);
  const optionNum = chartBuilder('');
  const optionPer = chartBuilder('Per');

  const handleTabChange = (key, value) => setPane(value);

  return (
    <>
      <ShadowWrapper>
        <ChartTabs>
          <ChartTab Pane={Pane} id={1} onClick={() => handleTabChange('EChImp', 1)}>
            number
          </ChartTab>
          <ChartTab Pane={Pane} id={2} onClick={() => handleTabChange('EChImp', 2)}>
            percentage
          </ChartTab>
        </ChartTabs>
        {Pane === 1 && <ReactChart height="600" options={optionNum} />}
        {Pane === 2 && <ReactChart height="600" options={optionPer} />}
      </ShadowWrapper>
    </>
  );
};
export default IndustryMixChart;

const ChartSource = () => (
  <p>
    Source: National Institute of Economic and Industry Research (NIEIR). ©2020 Compiled and presented in economy.id by
    .id informed decisions.
  </p>
);

const chartBuilder = (prefix = '') => {
  const {
    filters: { Ind },
    entityData: { currentIndicator, currentStartYear, currentEndYear },
    contentData: { industryMixData },
  } = useContext(PageContext);
  const { LongName } = useContext(ClientContext);
  console.log('industryMixData: ', industryMixData);

  const lookup = {
    1: 'OutputChange',
    2: 'VAChange',
    3: 'JTWChange',
    4: 'JTW_P_Change',
    5: 'URChange',
    6: 'UR_P_Change',
  };

  const parents = industryMixData.filter(({ Hierarchy }) => Hierarchy === 'P');
  const children = industryMixData.filter(({ Hierarchy }) => Hierarchy === 'C');
  parents.forEach(parent => {
    parent.children = children.filter(
      child =>
        child.IndWebKey > parent.IndWebKey && child.IndWebKey < parent.IndWebKey + 100 && parent.WebID == child.WebID,
    );
  });
  const LGASerie = parents.map(item => {
    return {
      name: item.IndWebName,
      y: item[`${lookup[+Ind]}${prefix}`],
      drilldown: `${item.IndWebName}-${currentIndicator}`,
    };
  });

  const drilldownLGASerie = parents.map(parent => {
    return {
      name: `${LongName}, ${parent.IndWebName}`,
      id: `${parent.IndWebName}-${currentIndicator}`,
      data: parent.children.map(child => {
        return [`${child.IndWebName}`, child[`${lookup[+Ind]}${prefix}`]];
      }),
    };
  });

  const tooltip = function() {
    const number = +Ind === 1 || +Ind === 2 ? `${formatChangeNumber(this.y)}M` : `${formatNumber(this.y)} Jobs`;
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span>${this.name}<br/> ${
      prefix === 'Per' ? formatPercent(this.y) + '%' : number
    }`;
  };

  return {
    highchartOptions: {
      height: 650,
      chart: {
        type: 'bar',
      },
      title: {
        text: `Change in ${currentIndicator} by Industry, ${LongName} ( ${currentStartYear} - ${currentEndYear})`,
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
      series: [{ name: `${LongName}, All industries`, data: LGASerie }],
      xAxis: {
        type: 'category',
        crosshair: true,
        title: {
          text: '',
        },
      },
      yAxis: {
        title: {
          text: `${currentIndicator} ${+Ind === 1 || +Ind === 2 ? '($M)' : ''}`,
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
