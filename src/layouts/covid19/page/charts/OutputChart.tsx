import EntityChart from '../../../../components/chart/EntityChart';
import { formatChangeInt, idlogo, formatPercent, formatChangePercent, formatCurrency } from '../../../../utils';
import { useContext, useState } from 'react';
import { PageContext, ClientContext } from '../../../../utils/context';
import useEntityText from '../../../../utils/useEntityText';
import { IdLink } from '../../../../components/ui/links';
import { ItemWrapper, ChartTabs, ChartTab, ShadowWrapper } from '../../../../styles/MainContentStyles';
import ReactChart from '../../../../components/chart/ReactChart';
import _ from 'lodash';

const OutputChart = ({ measure }) => {
  const [Pane, setPane] = useState(1);

  const {
    filters,
    contentData: { outputValueAddedData },
  } = useContext(PageContext);
  const OutputData = outputValueAddedData.filter(
    ({ Measure, NieirInd1DigitWebKey, WebID }) =>
      Measure === measure && NieirInd1DigitWebKey != 22000 && WebID === +filters.WebID,
  );
  const categoriesNum = OutputData.map(({ NieirIndWeb1DigitName }) => NieirIndWeb1DigitName);

  const OutputDataPer = _.sortBy(OutputData, 'QtrChgPer').reverse();
  const categoriesPer = OutputDataPer.map(({ NieirIndWeb1DigitName }) => NieirIndWeb1DigitName);

  const outputNumber = OutputData.map(item => item.QtrChg);
  const outputPerc = OutputDataPer.map(item => item.QtrChgPer);

  const seriesNumber = [
    {
      data: outputNumber,
    },
  ];

  const seriesPer = [
    {
      data: outputPerc,
    },
  ];

  const Numbers: any = EconomicImpactChartBuilder(seriesNumber, categoriesNum, measure, 1);
  const Percentages: any = EconomicImpactChartBuilder(seriesPer, categoriesPer, measure, 2);

  const [options, setHighchartsOptions] = useState(Numbers);
  const handleTabChange = (key, value) => {
    setPane(value);
    setHighchartsOptions(value === 1 ? Numbers : Percentages);
  };
  return (
    <>
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

export default OutputChart;

const ChartSource = () => (
  <p>
    Source: National Institute of Economic and Industry Research (NIEIR) {useEntityText('Version')}. ©2020 Compiled and
    presented in economy.id by <IdLink />.
  </p>
);

// #region chart builder change
const EconomicImpactChartBuilder = (series, categories, measure, type) => {
  const { LongName } = useContext(ClientContext);
  const {
    entityData: { currentAreaName },
  } = useContext(PageContext);
  const measureText = `${measure === 'Output' ? measure : 'Value Added'}`;
  const chartType = 'bar';
  const chartTitle = `${measureText} impact in June Quarter 2020 (compared to 2018/19 quarter average)`;
  const chartSubtitle = `${currentAreaName}`;
  const xAxisTitle = 'Industry sector';
  const yAxisTitle = type === 1 ? `Change in ${measureText} ($million)` : `Change in ${measureText} (%)`;
  const rawDataSource = `Source: National Institute of Economic and Industry Research (NIEIR) ${useEntityText(
    'Version',
  )} ©2020 Compiled and presented in economy.id by .id the population experts. `;

  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${this.category}, ${LongName}: ${
      type === 1 ? formatCurrency(this.y) + 'm' : formatChangePercent(this.y) + '%'
    }`;
  };

  return {
    highchartOptions: {
      height: 500,
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
