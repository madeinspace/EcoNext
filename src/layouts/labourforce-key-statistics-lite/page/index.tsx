// #region imports
import _ from 'lodash';
import { formatNumber, formatPercent } from '../../../utils/';
import { ItemWrapper, SourceBubble, PageIntro } from '../../../styles/MainContentStyles';
import EntityTable from '../../../components/table/EntityTable';
import { useContext } from 'react';
import { ClientContext, PageContext } from '../../../utils/context';
import { IdLink, LinkBuilder } from '../../../components/ui/links';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import useEntityText from '../../../utils/useEntityText';
// #endregion

// #region population page
const ResidentWorkersKeyStatisticsLitePage = () => (
  <>
    <PageIntro>
      <div>
        <p>
          The local resident workers include all employed people who are resident in the local area regardless of where
          they work. In other words, it is the people who live locally and therefore have the potential to work locally
          and is an important resource for the local economy. Their characteristics inform us about the skills that are
          available locally, even if they are not currently employed in the local economy.
        </p>
        <p>Access the detailed tables for further exploration of each characteristic.</p>
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

export default ResidentWorkersKeyStatisticsLitePage;
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
    entityData: { currentBenchmarkName, currentAreaName },
  } = useContext(PageContext);
  const anchorName = 'local-workers--key-statistics';
  const tableTitle = `Local workers key statistics - All industry sectors`;
  const parents = _.sortBy(
    data.filter(({ DataType }) => DataType === null),
    item => item.LabelKey,
  );
  const children = data.filter(({ DataType }) => DataType != null);

  parents.forEach(parent => {
    parent.children = children.filter(
      ({ LabelKey }) => LabelKey > parent.LabelKey && LabelKey < parent.LabelKey + 1000,
    );
  });

  const rows = parents.map(({ LabelKey, LabelName, children }, id) => ({
    alreadyExpanded: true,
    expandable: children.length > 0,
    cssClass: 'plain',
    id: LabelKey,
    data: [LabelName, '', '', ''],
    formattedData: [`${LabelName}`, ' ', ' ', ' '],
    childRows: children.map(({ LabelKey, LabelName, NoYear1, PerYear1, BMYear1 }) => ({
      id: LabelKey,
      data: [LabelName, NoYear1, PerYear1, BMYear1],
      formattedData: [`${LabelName}`, formatNumber(NoYear1), formatPercent(PerYear1), formatPercent(BMYear1)],
    })),
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
        cssClass: 'even int XL',
      },
      {
        id: 2,
        sortable: false,
        displayText: '%',
        cssClass: 'even int XL',
      },
      {
        id: 3,
        sortable: false,
        displayText: `% ${currentBenchmarkName}`,
        cssClass: 'even int XXL',
      },
    ],
    footRows: [],
    rows,
    noOfRowsOnInit: 0,
  };
};
// #endregion
