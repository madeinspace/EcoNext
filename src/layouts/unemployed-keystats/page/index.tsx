// #region imports
import _ from 'lodash';
import { formatNumber, formatPercent, formatChangeInt } from '../../../utils/';
import { ItemWrapper, SourceBubble, PageIntro, Note } from '../../../styles/MainContentStyles';
import EntityTable from '../../../components/table/EntityTable';
import { useContext } from 'react';
import { ClientContext, PageContext } from '../../../utils/context';
import { IdLink, LinkBuilder } from '../../../components/ui/links';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import useEntityText from '../../../utils/useEntityText';
// #endregion

// #region population page
const UnemployedKeyStatisticsPage = () => {
  const { clientAlias } = useContext(ClientContext);
  const {
    entityData: { prefixedAreaName },
  } = useContext(PageContext);

  return (
    <>
      <PageIntro>
        <div>
          <p>
            The local unemployed resident includes all people who are residents in the local area who are looking for
            part-time or full-time work. This is an important resource for the local economy, their characteristics
            inform us about the skills that are available locally, even if they are not currently employed in the local
            economy.{' '}
          </p>
          <p>
            For an overview of unemployment levels and trends in {prefixedAreaName} go to the{' '}
            {LinkBuilder(`http://economy.id.com.au/${clientAlias}/unemployment`, 'Unemployment')} page.
          </p>
        </div>
        <SourceBubble>
          <div>
            <h3>Data source</h3>
            <p>{useEntityText('DataSource')}</p>
          </div>
        </SourceBubble>
      </PageIntro>
      <ControlPanel />
      <ItemWrapper>
        <EntityTable data={tableBuilder()} name={useEntityText('SubTitle')} />
      </ItemWrapper>
    </>
  );
};

export default UnemployedKeyStatisticsPage;
// #endregion

// #region Source
const Source = () => (
  <p>
    Source: Australian Bureau of Statistics,{' '}
    {LinkBuilder('http://www.abs.gov.au/census', 'Census of Population and Housing 2011 and 2016')}. Compiled and
    presented by
    <IdLink />.
  </p>
);
// #endregion

// #region tableBuilder
const tableBuilder = () => {
  const { clientAlias } = useContext(ClientContext);
  const {
    contentData: data,
    entityData: { currentBenchmarkName, currentAreaName, currentIndustryName },
  } = useContext(PageContext);
  const anchorName = 'resident-workers---unemployed-key-statistics';
  const tableTitle = `Resident workers key statistics - ${currentIndustryName}`;
  const parents = _.sortBy(
    data.filter(({ DataType }) => DataType === null),
    item => item.LabelKey,
  );
  const children = data.filter(({ DataType }) => DataType != null);
  console.log('children: ', children);

  parents.forEach(parent => {
    parent.children = children.filter(
      ({ LabelKey }) => LabelKey > parent.LabelKey && LabelKey < parent.LabelKey + 10000,
    );
  });
  console.log('parents: ', parents);

  const rows = parents.map(({ LabelKey, LabelName, children }, id) => ({
    alreadyExpanded: true,
    expandable: children.length > 0,
    cssClass: 'plain',
    id: LabelKey,
    data: [LabelName, '', '', '', '', '', '', ''],
    formattedData: [`${LabelName}`, ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    childRows: children.map(
      ({ LabelKey, LabelName, NoYear1, PerYear1, BMYear1, NoYear2, PerYear2, BMYear2, Change12 }) => ({
        id: LabelKey,
        data: [LabelName, NoYear1, PerYear1, BMYear1, NoYear2, PerYear2, BMYear2, Change12],
        formattedData: [
          `${LabelName}`,
          formatNumber(NoYear1),
          formatPercent(PerYear1),
          formatPercent(BMYear1),
          formatNumber(NoYear2),
          formatPercent(PerYear2, '--'),
          formatPercent(BMYear2, '--'),
          formatChangeInt(Change12, '--'),
        ],
      }),
    ),
  }));

  return {
    cssClass: '',
    allowExport: false,
    allowSort: false,
    allowSortReset: true,
    groupOn: '',
    clientAlias: clientAlias,
    source: <Source />,
    anchorName,
    headRows: [
      {
        cssClass: '',
        cols: [
          {
            cssClass: 'table-area-name',
            displayText: tableTitle,
            colSpan: 10,
            rowSpan: 0,
          },
        ],
        key: 'hr0',
      },
      {
        cssClass: 'heading',
        cols: [
          {
            cssClass: 'sub first',
            displayText: `${currentAreaName}`,
            colSpan: 1,
          },
          {
            cssClass: 'even ',
            displayText: '2016',
            colSpan: 3,
          },
          {
            cssClass: 'odd ',
            displayText: '2011',
            colSpan: 3,
          },
          {
            cssClass: 'sub even',
            displayText: 'change',
            colSpan: 3,
          },
        ],
        key: 'hr1',
      },
    ],
    cols: [
      {
        id: 0,
        displayText: 'Name',
        cssClass: 'odd first ',
      },
      {
        id: 1,
        sortable: false,
        displayText: 'number',
        cssClass: 'even int S',
      },
      {
        id: 2,
        sortable: false,
        displayText: '%',
        cssClass: 'even int S',
      },
      {
        id: 3,
        sortable: false,
        displayText: `% ${currentBenchmarkName}`,
        cssClass: 'even int L',
      },
      {
        id: 4,
        sortable: false,
        displayText: 'number',
        cssClass: 'odd int S',
      },
      {
        id: 5,
        sortable: false,
        displayText: '%',
        cssClass: ' odd int S',
      },
      {
        id: 6,
        sortable: false,
        displayText: `% ${currentBenchmarkName}`,
        cssClass: 'odd int L',
      },
      {
        id: 7,
        sortable: false,
        displayText: `2011 to 2016`,
        cssClass: 'even int XL',
      },
    ],
    footRows: [],
    rows,
    noOfRowsOnInit: 0,
  };
};
// #endregion
