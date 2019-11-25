// #region imports
import _ from 'lodash';
import Layout from '../../../layouts/main';
import { formatNumber, formatPercent, formatMillionsCurrency } from '../../../utils/';
import {
  TitleContainer,
  MainTitle,
  SubTitle,
  Headline,
  ItemWrapper,
  EntityContainer,
  PageIntroFullWidth,
} from '../../../styles/MainContentStyles';
import { Actions, Share, ExportPage } from '../../../components/Actions';
import EntityTable from '../../../components/table/EntityTable';
import EntityChart from '../../../components/chart/EntityChart';
import { Context } from '../../../utils/context';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
// #endregion

// #region page export
const requestPDF = async (pageName, prettyName) => {
  const IDReportRequest = {
    FileName: `${pageName} - ${prettyName}`,
    Urls: [
      {
        Title: `${pageName} - ${prettyName}`,
        url: window.location.href,
      },
    ],
    Action: 0,
    EmailAddress: 'fabrice@id.com.au',
  };

  try {
    console.log(`Page report request: Population - ${prettyName}`);
    await postData(
      'https://idreportserviceweb.azurewebsites.net/api/IDReportService/RequestReport/',
      IDReportRequest,
    ).then(res => {
      console.log('Report Ok: ', res);
    });
  } catch (error) {
    console.error(error);
  }
};

const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};
// #endregion

// #region population page
const ValueOfBuildingApprovalsPage = () => (
  <Context.Consumer>
    {({ clientData, tableData }) => {
      const { LongName: prettyName, clientAlias } = clientData;
      const pageName = 'Value of total building approvals';
      const chartData = chartBuilder(tableData);
      const tableParams = tableBuilder(clientAlias, tableData);

      const FormattedTotalValueBuildingApprovals = () => {
        const num = _.filter(tableData, { Yr: 2019 }).pop();
        const formatedNumber = formatMillionsCurrency(num.Total * 1000);
        return <>{formatedNumber}</>;
      };

      const handleExport = () => requestPDF(pageName, prettyName);

      return (
        <Layout>
          <EntityContainer>
            <TitleContainer>
              <MainTitle>{prettyName}</MainTitle>
              <SubTitle>Value of building approvals</SubTitle>
            </TitleContainer>
            <Actions>
              <Share />
              <ExportPage
                onExport={e => handleExport()}
                exportOptions={{
                  formats: [{ displayText: 'PDF' } /*, { name: "PDF" }*/],
                }}
              />
            </Actions>
          </EntityContainer>
          <Headline>
            The value of building approvals in the City of Monash was <FormattedTotalValueBuildingApprovals /> in the
            2019-20 Sep FYTD financial year.
          </Headline>
          <PageIntroFullWidth>
            <p>
              This dataset shows the total assessed value of building approvals for construction in City of Monash by
              financial year in millions of dollars. The dataset is updated monthly to include the current financial
              year to date, and includes residential and non-residential building approvals separately. The percentage
              of the state total is shown.
            </p>
            <p>
              Building approvals for an area can be highly variable over time, particularly in the non-residential
              sector. Construction may take several years from the date of approval. A high rate of building approvals
              can indicate a growth area with a construction-led economy. A low rate of building approvals may indicate
              a settled area with established infrastructure, or an area with little growth. Note that this dataset is
              not adjusted for inflation.
            </p>
          </PageIntroFullWidth>

          <ItemWrapper>
            <ControlPanel />
          </ItemWrapper>

          <ItemWrapper>
            <EntityChart data={chartData} />
          </ItemWrapper>

          <ItemWrapper>
            <EntityTable data={tableParams} name={`${pageName}`} />
          </ItemWrapper>
        </Layout>
      );
    }}
  </Context.Consumer>
);

export default ValueOfBuildingApprovalsPage;
// #endregion

// #region Source
const Source = () => (
  <>
    Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in
    economy.id by{' '}
    <a href="http://home.id.com.au/about-us/" target="_blank" title=".id website">
      .id, the population experts.
      <span className="hidden"> (opens a new window)</span>
    </a>
  </>
);
// #endregion

// #region tableBuilder
const tableBuilder = (alias, nodes) => {
  return {
    cssClass: '',
    allowExport: false,
    allowSort: true,
    allowSortReset: true,
    groupOn: '',
    clientAlias: alias,
    source: <Source />,
    anchorName: 'service-age-groups',
    headRows: [
      {
        cssClass: '',
        cols: [
          {
            cssClass: 'table-area-name',
            displayText: 'Value of total building approvals',
            colSpan: 10,
            rowSpan: 0,
          },
        ],
        key: 'hr0',
      },
      {
        cssClass: '',
        cols: [
          {
            cssClass: '',
            displayText: '',
            colSpan: 1,
            rowSpan: 0,
          },
          {
            cssClass: 'xeven start-year',
            displayText: nodes[0].GeoName,
            colSpan: 3,
            rowSpan: 0,
          },
          {
            cssClass: 'xodd end-year',
            displayText: 'Victoria',
            colSpan: 3,
            rowSpan: 0,
          },
          {
            cssClass: 'xeven start-year',
            displayText: '',
            colSpan: 3,
            rowSpan: 0,
          },
        ],
        key: 'hr1',
      },
    ],
    cols: [
      {
        id: 0,
        displayText: 'Financial year',
        dataType: 'int',
        sortable: true,
        cssClass: 'xodd xfirst',
      },
      {
        id: 1,
        displayText: 'Residential',
        dataType: 'int',
        sortable: true,
        cssClass: 'xeven latest',
        format: '{0:#,0}',
      },
      {
        id: 2,
        displayText: 'Non-residential',
        dataType: 'money',
        sortable: true,
        cssClass: 'xeven latest',
        format: '{0:+#,0;-#,0;0}',
      },
      {
        id: 3,
        displayText: 'Total',
        dataType: 'money',
        sortable: true,
        cssClass: 'xeven latest',
        format: '{0:+#,0;-#,0;0}',
      },
      {
        id: 4,
        displayText: 'Residential',
        title: '',
        dataType: 'int',
        sortable: true,
        cssClass: 'xodd',
        format: '{0:#,0}',
      },
      {
        id: 5,
        displayText: 'Non-residential',
        dataType: 'money',
        sortable: true,
        cssClass: 'per xodd',
        format: '{0:+#,0;-#,0;0}',
      },
      {
        id: 6,
        displayText: 'Total',
        dataType: 'money',
        sortable: true,
        cssClass: 'xodd',
        format: '{0:+#,0;-#,0;0}',
      },
      {
        id: 7,
        displayText: 'City of Monash as a % of Victoria',
        title: '',
        dataType: 'int',
        sortable: true,
        cssClass: 'xeven',
        format: '{0:#,0}',
      },
    ],
    footRows: [],
    rows: nodes.map(
      (
        { LabelName, Residential, NonResidential, Total, ResidentialBM, NonResidentialBM, TotalBM, PerWebIDofBM },
        i: number,
      ) => ({
        data: [LabelName, Residential, NonResidential, Total, ResidentialBM, NonResidentialBM, TotalBM, PerWebIDofBM],
        formattedData: [
          LabelName,
          formatNumber(Residential),
          formatNumber(NonResidential),
          formatNumber(Total),
          formatNumber(ResidentialBM),
          formatNumber(NonResidentialBM),
          formatNumber(TotalBM),
          `${formatPercent(PerWebIDofBM)}%`,
        ],
        id: i,
      }),
    ),
    noOfRowsOnInit: 11,
  };
};
// #endregion

// #region  chartbuilder
const chartBuilder = nodes => {
  return {
    cssClass: '',
    highchartOptions: {
      chart: {
        type: 'column',
        styledMode: true,
      },
      title: {
        text: 'Value of total building approvals',
        align: 'left',
      },
      subtitle: {
        text: nodes[0].GeoName,
        align: 'left',
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: false,
          },
        },
      },
      series: [
        {
          color: '',
          yAxis: 0,
          name: 'Residential',
          data: _.map(nodes, 'Residential'),
        },
        {
          color: '',
          yAxis: 0,
          name: 'Non Residential',
          data: _.map(nodes, 'NonResidential'),
        },
      ],
      xAxis: {
        categories: _.map(nodes, 'LabelName').reverse(),
        croshair: false,
        title: {
          text: 'Year ending June',
          align: 'low',
        },
        labels: {
          staggerLines: 0,
          format: '',
        },
        opposite: false,
        plotBands: [],
      },
      yAxis: [
        {
          croshair: false,
          title: {
            text: 'Total value',
            align: 'low',
          },
          labels: {
            staggerLines: 0,
            formatter: function() {
              return formatNumber(this.value);
            },
          },
          opposite: false,
          plotBands: [],
        },
      ],
    },
    rawDataSource:
      'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by .id, the population experts.',
    dataSource: <Source />,
    chartContainerID: 'chart1',
    logoUrl: '/images/id-logo.png',
    entityID: 1,
    chartTemplate: 'Standard',
  };
};
// #endregion
