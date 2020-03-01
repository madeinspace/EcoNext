// #region imports
import _ from 'lodash';
import { formatNumber, formatPercent, idlogo, formatChangeInt } from '../../../utils/';
import { ItemWrapper, SourceBubble, PageIntro, Note } from '../../../styles/MainContentStyles';
import EntityTable from '../../../components/table/EntityTable';
import EntityChart from '../../../components/chart/EntityChart';
import { useContext } from 'react';
import { ClientContext, PageContext } from '../../../utils/context';
import { IdLink, ABSLinkBuilder, ABSLink, LinkBuilder } from '../../../components/ui/links';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import getActiveToggle from '../../../utils/getActiveToggle';
import useEntityText from '../../../utils/useEntityText';
// #endregion

// #region population page
const WorkersKeyStatisticsPage = () => {
  const {
    entityData: { prefixedAreaName },
  } = useContext(PageContext);

  const tableParams = tableBuilder();

  return (
    <>
      {' '}
      <PageIntro>
        <div>
          <p>
            Individual Income is an indicator of socio-economic status, skills and occupations required in a particular
            industry. With other data sources, such as Qualifications and Occupation, it helps to evaluate the economic
            opportunities of people in an industry.
          </p>
          <p>
            Income quartiles are used to condense income categories into manageable units, adjust for the effects of
            inflation, and allow areas to be compared over time relative to a benchmark. The incomes for a specified
            industry for the state are split into four equal groups, each containing 25% of the workers in that
            industry, and the quartiles allow users to compare changes in that industry in the local area to changes
            statewide, or against another benchmark. For more information on how quartiles are calculated please refer
            to the data notes.
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
        imputed using the same methodology. To provide this detail, {prefixedAreaName} in 2011 had to be constructed
        from a best fit of Work Destination Zones (DZNs). While it may not be an exact match to the LGA or region
        boundary, it is considered close enough to allow some comparison. Users should treat this time series data with
        caution, however, and not compare directly with 2011 data from any other source.
      </Note>
      <ControlPanel />
      <ItemWrapper>
        <EntityTable data={tableParams} name={useEntityText('SubTitle')} />
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
    parent.children = children.filter(({ TableId }) => TableId === parent.TableId);
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
    ],
    footRows: [],
    rows,
    noOfRowsOnInit: 0,
  };
};
// #endregion
