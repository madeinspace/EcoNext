// #region imports
import { useContext } from 'react';
import { PageIntro, SourceBubble, ItemWrapper, ShadowWrapper } from '../../../styles/MainContentStyles';
import { PageContext, ClientContext } from '../../../utils/context';
import { IdLink } from '../../../components/ui/links';
import useEntityText from '../../../utils/useEntityText';
import { formatNumber, formatChangeInt, idlogo } from '../../../utils';
import EntityTable from '../../../components/table/EntityTable';
import RelatedPagesCTA from '../../../components/RelatedPages';
import useDropdown from '../../../utils/hooks/useDropdown';
import { Headline as StyledHeadline } from '../../../styles/MainContentStyles';
import ReactChart from '../../../components/chart/ReactChart';
import _ from 'lodash';
// #endregion

// #region template page
const BusinessTrendsPage = () => {
  const { clientAlias, LongName } = useContext(ClientContext);
  const {
    contentData: { BusinessTrendsData, toggles },
    filters,
    entityData: { currentIndustryName, prefixedAreaName },
  } = useContext(PageContext);

  const industryDropDownInitialState = {
    label: 'All industries',
    value: '23000',
  };
  const dropdownData = toggles.map(toggle => {
    return { value: toggle.Value, label: toggle.Label };
  });
  const [industry, IndustryDropdown] = useDropdown('All industries', industryDropDownInitialState, dropdownData);
  const yearStart = 2015;

  const getDataByIndustry = indKey =>
    BusinessTrendsData.filter(({ LabelKey, Year }) => Year >= yearStart && LabelKey === indKey);
  const data = _.sortBy(getDataByIndustry(+industry.value), ['After']);

  const lastQuarter = data.slice(-1).pop();
  const indLabel = +industry.value === 23000 ? 'total GST registered' : `GST registered ${industry.label}`;
  const chartSub = `${LongName} - ${industry.label}`;

  const registeredBizQuarterly = registeredBizChartBuilder(data, chartSub);
  const ChangeInRegisteredBizQuarterly = registeredBizChangeChartBuilder(data, chartSub);
  const tabledata = tableBuilder(data, chartSub);

  return (
    <>
      <StyledHeadline>
        There were an estimated {formatNumber(lastQuarter.Tot_Reg_Bus)} {indLabel} businesses in {prefixedAreaName} in
        the {lastQuarter.label} quarter. There were {formatNumber(lastQuarter.New_Reg_Bus)} new businesses and{' '}
        {formatNumber(lastQuarter.Cancel_Reg_Bus)} business GST cancellations in the same quarter.
      </StyledHeadline>
      <PageIntro>
        <div>
          <p>
            The Australian Business Register (ABR) is a register of all business entities and sole traders in Australia,
            based on Australian Business Numbers (ABNs), maintained by the Australian Taxation Office.
          </p>
          <p>
            Data from the ABR is useful in planning and economic development, to identify the spatial patterns of
            businesses across the City of Monash, clusters and change in business growth patterns across the area.
          </p>
          <p>
            The raw business register dataset contains large numbers of ABNs which are not relevant to local government
            planning, including trusts, superannuation funds, non-active businesses and micro businesses not registered
            for GST. These have been filtered out of the data presented here, to provide a more meaningful dataset for
            Local Government Decision making.
          </p>
          <p>
            Data are presented as aggregates of ABNs at the Local Government level for each of the time period. The
            graph of the number of GST registered businesses, the number of new GST registered businesses, and the
            number of cancelled GST registerations can be selected at the 1-digit ANZSIC classification level. For more
            information, including actual business locations and name and address details, LGAs are entitled to access
            the raw ABR unit record dataset directly from the ATO.
          </p>
        </div>

        <SourceBubble>
          <div>
            <h3>Data source</h3>
            <p>{useEntityText('DataSource')}</p>
          </div>
        </SourceBubble>
      </PageIntro>
      {/* <ControlPanel /> */}
      <IndustryDropdown />
      <>
        <ShadowWrapper>
          <ReactChart height="400" options={registeredBizQuarterly} />
        </ShadowWrapper>
        <ShadowWrapper>
          <ReactChart height="400" options={ChangeInRegisteredBizQuarterly} />
        </ShadowWrapper>
      </>
      <ItemWrapper>
        <EntityTable data={tabledata} name={`Business trends by industry sector - ${currentIndustryName}`} />
      </ItemWrapper>
      <RelatedPagesCTA />
    </>
  );
};
export default BusinessTrendsPage;
// #endregion

const ChartSource = () => (
  <p>
    Source: Australian Business Register. ©2020 Compiled and presented in economy.id by <IdLink />.
  </p>
);

// #region chart builder change
const registeredBizChartBuilder = (data: any[], subtitle) => {
  const chartType = 'column';
  const chartTitle = `Number of GST registered business`;
  const chartSubtitle = subtitle;
  const xAxisTitle = ``;
  const yAxisTitle = ``;
  const rawDataSource = `Source: National Institute of Economic and Industry Research (NIEIR) ${useEntityText(
    'Version',
  )} ©2020 Compiled and presented in economy.id by .id the population experts. `;
  const serie = data.map(({ Tot_Reg_Bus }) => Tot_Reg_Bus);
  const categories = data.map(({ label }) => label);

  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${formatNumber(this.y)}`;
  };

  return {
    highchartOptions: {
      height: 400,
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
      series: [
        {
          data: serie,
        },
      ],
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
              return this.value;
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

// #region chart builder change
const registeredBizChangeChartBuilder = (data: any[], subtitle) => {
  const chartType = 'spline';
  const chartTitle = `Change in GST registered business`;
  const chartSubtitle = subtitle;
  const xAxisTitle = ``;
  const yAxisTitle = `Number of GST registrations`;
  const rawDataSource = `Source: National Institute of Economic and Industry Research (NIEIR) ${useEntityText(
    'Version',
  )} ©2020 Compiled and presented in economy.id by .id the population experts. `;

  const newBizSerie = data.map(({ New_Reg_Bus }) => New_Reg_Bus);
  const cancelBizSerie = data.map(({ Cancel_Reg_Bus }) => Cancel_Reg_Bus);
  const netChange = data.map(({ New_Reg_Bus, Cancel_Reg_Bus }) => New_Reg_Bus - Cancel_Reg_Bus);
  const categories = data.map(({ label }) => label);

  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${formatChangeInt(this.y)}`;
  };

  return {
    highchartOptions: {
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
      series: [
        { className: 'new', name: 'New GST registrations', data: newBizSerie },
        { className: 'cancelled', name: 'Cancelled GST registrations', data: cancelBizSerie },
        { className: 'change', name: 'Net change', data: netChange },
      ],
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
              return this.value;
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

// #region table builders
const tableBuilder = (data: any[], subtitle) => {
  const { clientAlias } = useContext(ClientContext);
  const rawDataSource =
    'Source: Australian Business Register. Compiled and presented in economy.id by .id , the population experts.';
  const tableTitle = `Business trends by industry sector`;

  const serie = data.reverse().map(({ After, label, Tot_Reg_Bus, New_Reg_Bus, Cancel_Reg_Bus }) => {
    const newDate = `${label.split('-')[0]}-20${label.split('-')[1]}`;
    return {
      id: After,
      data: [label, Tot_Reg_Bus, New_Reg_Bus, Cancel_Reg_Bus, New_Reg_Bus - Cancel_Reg_Bus],
      formattedData: [
        newDate,
        formatNumber(Tot_Reg_Bus),
        formatNumber(New_Reg_Bus),
        formatNumber(Cancel_Reg_Bus),
        formatChangeInt(New_Reg_Bus - Cancel_Reg_Bus),
      ],
    };
  });

  return {
    cssClass: '',
    clientAlias,
    source: <ChartSource />,
    rawDataSource,
    anchorName: '#business-locations',
    headRows: [
      {
        cssClass: '',
        cols: [
          {
            cssClass: 'table-area-name',
            displayText: tableTitle,
            colSpan: 5,
          },
        ],
      },
      {
        cssClass: 'heading',
        cols: [
          {
            cssClass: 'sub first',
            displayText: `${subtitle}`,
            colSpan: 5,
          },
        ],
      },
    ],
    cols: [
      {
        id: 0,
        displayText: 'Quarter',
        cssClass: 'odd first XL',
      },
      {
        id: 1,
        displayText: 'Number of registered businesses',
        cssClass: 'odd int XXXL',
      },
      {
        id: 2,
        displayText: 'New GST Registration',
        cssClass: 'even int XXXL',
      },
      {
        id: 3,
        displayText: 'Cancelled GST Registration',
        cssClass: 'odd int XXXL',
      },
      {
        id: 4,
        displayText: 'Net change',
        cssClass: 'even int XXXL',
      },
    ],
    rows: serie,
    footRows: [],
    noOfRowsOnInit: 0,
  };
};
// #endregion
