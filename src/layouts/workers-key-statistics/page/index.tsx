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
const WorkersKeyStatisticsPage = () => {
  const {
    entityData: { prefixedAreaName },
  } = useContext(PageContext);

  return (
    <>
      <PageIntro>
        <div>
          <p>
            The workforce is made up of all the people who are employed in the local area, regardless of where they
            live. Workforce statistics reveal how the characteristics of the workforce in {prefixedAreaName} vary
            between each industry sector and indicates specific industry sector workforce requirements and employment
            opportunities.
          </p>
          <p>Access the detailed tables for further exploration of each characteristic.</p>
          <p>
            <strong>NOTE:</strong> All tables in the workers section are based on Census employment data which differ
            from the NIEIR employment estimates. See data notes for more details.
          </p>
        </div>
        <SourceBubble>
          <div>
            <h3>Data source</h3>
            <p>{useEntityText('DataSource')}</p>
          </div>
        </SourceBubble>
      </PageIntro>
      <Note>
        <strong>Please note: </strong> The 2016 Census used a new methodology to “impute” a work location to people who
        didn’t state their workplace address. As a result, 2016 and 2011 place of work data are not normally comparable.
        To allow comparison between 2011 and 2016, .id has sourced a 2011 dataset from the ABS which was experimentally
        imputed using the same methodology. {prefixedAreaName} currently subscribe to the “LITE” version of economy.id,
        which does not feature this extended dataset. In order to directly compare worker numbers between 2011 and 2016,
        it is recommended that {prefixedAreaName} subscribe to the FULL version of economy.id.
      </Note>
      <ControlPanel />
      <ItemWrapper>
        <EntityTable data={tableBuilder()} name={useEntityText('SubTitle')} />
      </ItemWrapper>
    </>
  );
};

export default WorkersKeyStatisticsPage;
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
  const anchorName = 'local-workers--key-statistics';
  const tableTitle = `Local workers key statistics - ${currentIndustryName}`;
  const parents = _.sortBy(
    data.filter(({ DataType }) => DataType === null),
    item => item.LabelKey,
  );
  const children = data.filter(({ DataType }) => DataType != null);

  parents.forEach(parent => {
    parent.children = children.filter(({ TableId }) => TableId === parent.TableId);
  });

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
          formatPercent(PerYear2),
          formatPercent(BMYear2),
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
        displayText: 'number',
        cssClass: 'even int S',
      },
      {
        id: 2,
        displayText: '%',
        cssClass: 'even int S',
      },
      {
        id: 3,
        displayText: `${currentBenchmarkName}`,
        cssClass: 'even int L',
      },
      {
        id: 4,
        displayText: 'number',
        cssClass: 'odd int S',
      },
      {
        id: 5,
        displayText: '%',
        cssClass: ' odd int S',
      },
      {
        id: 6,
        displayText: `${currentBenchmarkName}`,
        cssClass: 'odd int L',
      },
      {
        id: 7,
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
