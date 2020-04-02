// #region imports
import { formatNumber, formatPercent, formatLongNumber, multiplesOf, getParameterByName } from '../../../utils/';
import { ItemWrapper, PageIntro, SourceBubble, Headline } from '../../../styles/MainContentStyles';
import EntityTable from '../../../components/table/EntityTable';
import { useContext, useState, useEffect } from 'react';
import { ClientContext, PageContext } from '../../../utils/context';
import { LinkBuilder } from '../../../components/ui/links';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import useEntityText from '../../../utils/useEntityText';
import * as Highcharts from 'highcharts';
import RelatedPagesCTA from '../../../components/RelatedPages';
import styled from 'styled-components';
import qs from 'qs';
// #endregion

const largest = (arr, key) => {
  return arr
    .filter(a => a.LabelKey < 96000)
    .sort((a, b) => {
      return b[key] - a[key];
    })[0];
};

// #region population page
const TourismWorkforcePage = () => {
  const { clientAlias } = useContext(ClientContext);
  const {
    handle,
    contentData,
    entityData: { prefixedAreaName },
  } = useContext(PageContext);
  const [Pane, setPane] = useState(14);

  useEffect(() => {
    const tabNumber = getParameterByName('es');
    tabNumber && setPane(+tabNumber);
  });

  const handleTabChange = (key, value) => {
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });
    query[key] = value;
    const stringiifiedQuery = qs.stringify(query);
    const href = `/${clientAlias}/${handle}?${stringiifiedQuery}`;
    window.history.replaceState(query, '', href);
    setPane(value);
  };

  const Tabs = styled.ul`
    display: flex;
    border-bottom: 1px solid #d7dbdd;
  `;
  const Tab = styled.li`
    cursor: pointer;
    padding: 15px 40px;
    font-size: 16px;
    color: ${props => (Pane === props.id ? 'white' : '#5f6062')};
    background-color: ${props => (Pane === props.id ? '#70b859' : '#e0e0e0')};
    &:hover {
      background-color: #70b859;
      color: #fff;
    }
  `;

  const totalWorkers = contentData[0].data.filter(({ LabelKey }) => LabelKey === 10001)[0];
  const fulltimeWorkers = contentData[0].data.filter(({ LabelKey }) => LabelKey === 30001)[0];
  const parttimeWorkers = contentData[0].data.filter(({ LabelKey }) => LabelKey === 30002)[0];
  const awayFromWork = contentData[0].data.filter(({ LabelKey }) => LabelKey === 30003)[0];
  const heading1 = `In 2016, there were ${formatNumber(
    totalWorkers.NoYear1,
  )} people who make up the tourism and hospitality workforce in ${prefixedAreaName}, of this ${formatPercent(
    fulltimeWorkers.PerYear1,
  )}% worked full-time and ${formatPercent(
    parttimeWorkers.PerYear1 + awayFromWork.PerYear1,
  )}% worked part-time or were away from work.`;

  const largestOccupation = largest(contentData[1].data, 'NoYear1');
  const heading2 = `${
    largestOccupation.LabelName
  } was the largest tourism & hospitality occupation, making up ${formatPercent(
    largestOccupation.PerYear1,
  )}% of the total tourism workforce in ${prefixedAreaName}.`;

  return (
    <>
      <Headline>{Pane === 14 ? heading1 : heading2}</Headline>
      <PageIntro>
        <div>
          <p>
            Tourism and hospitality are key industries in many parts of Australia, but it has not been well represented
            in economic profiles in the past due to the difficulty in defining it.
          </p>
          <p>
            The tourism and hospitality industries are defined by the ABS not as regular industries but as a set of
            occupation categories working across a number of industries.
          </p>
          <p>
            This page presents some key statistics for tourism and hospitality workers in {prefixedAreaName} with
            comparisons to benchmark areas. Tourism and hospitality data should be viewed in conjunction with the{' '}
            {LinkBuilder(
              `https://economy.id.com.au/${clientAlias}/industry-sector-analysis`,
              'Industry sector analysis',
            )}{' '}
            page for the accomodation sector, which has modelled estimates of the size of the industry on an annual
            basis. The{' '}
            {LinkBuilder(`https://economy.id.com.au/${clientAlias}/employment-locations`, 'Employment locations')} page
            will show where accommodation activity is taking place and the{' '}
            {LinkBuilder(`https://economy.id.com.au/${clientAlias}/workers-key-statistics`, 'Local workers')} section
            will reveal the characteristics of accommodation workers.
          </p>
          <p>
            <strong>Please note:</strong> Due to a change in the occupation classification, Tourism and Hospitality
            occupation data are currently only available from the 2016 Census.
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

      <Tabs>
        <Tab id={14} onClick={() => handleTabChange('es', 14)}>
          Key Statistics
        </Tab>
        <Tab id={15} onClick={() => handleTabChange('es', 15)}>
          Occupations
        </Tab>
      </Tabs>

      {Pane === 14 && (
        <ItemWrapper>
          <EntityTable data={tableKeyStats()} name={'Tourism and hospitality workforce'} />
        </ItemWrapper>
      )}
      {Pane === 15 && (
        <ItemWrapper>
          <EntityTable data={tableOccupation()} name={'Tourism and hospitality occupations'} />
        </ItemWrapper>
      )}
      <RelatedPagesCTA />
    </>
  );
};

export default TourismWorkforcePage;
// #endregion

// #region Source
const Source = () => (
  <p>
    Source: {LinkBuilder(`https://www.abs.gov.au/census`, 'Australian Bureau of Statistics')}, Census of Population and
    Housing 2016. Compiled and presented by .id , the population experts.
  </p>
);
// #endregion

// #region tableBuilder
const tableKeyStats = () => {
  const { clientAlias } = useContext(ClientContext);
  const {
    contentData,
    entityData: { currentAreaName, currentStartYear, currentComparisonYear, currentBenchmarkName },
  } = useContext(PageContext);
  const anchorName = 'tourism-workforce---key-statistics';
  const tableTitle = `Value of tourism and hospitality`;
  const distinctMeasures = multiplesOf(contentData[0].data, 10);
  const parents: any = distinctMeasures.reduce(
    (acc: any, cur: any) => [
      ...acc,
      {
        id: cur.LabelKey,
        displayText: cur.LabelName,
        children: contentData[0].data.filter(({ LabelKey }) => LabelKey > cur.LabelKey && LabelKey < cur.LabelKey + 10),
      },
    ],
    [],
  );
  const orderedParents = [...parents].sort();
  const rows = orderedParents.map(({ id, displayText, children }) => {
    return {
      alreadyExpanded: true,
      expandable: false,
      cssClass: 'plain',
      id: id,
      data: [displayText, '', '', '', ''],
      formattedData: [`${displayText}`, ' ', ' ', ' ', ' '],
      childRows: children.map(({ LabelName, LabelKey, NoYear1, PerYear1, BMYear1, PerTTWINoYear1 }) => ({
        id: LabelKey,
        data: [LabelName, NoYear1, PerYear1, BMYear1, PerTTWINoYear1],
        formattedData: [
          LabelName,
          id === 30 || id === 40 ? formatLongNumber(NoYear1) : formatNumber(NoYear1),
          formatPercent(PerYear1),
          formatPercent(BMYear1),
          formatPercent(PerTTWINoYear1),
        ],
      })),
    };
  });

  return {
    cssClass: '',
    allowSort: false,
    allowSortReset: false,
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
            colSpan: 5,
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
            displayText: `2016`,
            colSpan: 4,
          },
        ],
        key: 'hr1',
      },
    ],
    cols: [
      {
        id: 0,
        displayText: 'Measure',
        cssClass: 'odd int first XXXXL ',
      },
      {
        id: 1,
        displayText: `${currentAreaName}`,
        cssClass: 'even int ',
      },
      {
        id: 2,
        displayText: '% of total industry',
        cssClass: 'even int ',
      },
      {
        id: 3,
        displayText: `${currentBenchmarkName}%`,
        cssClass: 'even int ',
      },
      {
        id: 4,
        displayText: `${currentAreaName} as % of ${currentBenchmarkName}`,
        cssClass: 'even int ',
      },
    ],
    footRows: [],
    rows,
    noOfRowsOnInit: 0,
  };
};
// #endregion

// #region tableBuilder
const tableOccupation = () => {
  const { clientAlias } = useContext(ClientContext);
  const {
    contentData,
    entityData: { currentAreaName, currentBenchmarkName },
  } = useContext(PageContext);
  const anchorName = 'value-of-tourism';
  const tableTitle = `Tourism and hospitality occupations - Detailed ranked by size`;
  const data = [...contentData[1].data];
  const rows = data.map(({ id, LabelName, NoYear1, PerYear1, BMYear1 }) => {
    return {
      id: id,
      data: [LabelName, NoYear1, PerYear1, BMYear1],
      formattedData: [`${LabelName}`, `${NoYear1}`, `${PerYear1}`, `${BMYear1}`],
    };
  });

  return {
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
            colSpan: 7,
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
            displayText: `2016`,
            colSpan: 3,
          },
        ],
        key: 'hr1',
      },
    ],
    cols: [
      {
        id: 0,
        displayText: 'Occupation',
        cssClass: 'odd int first XXXXL ',
      },
      {
        id: 1,
        displayText: `Number`,
        cssClass: 'even int XL',
      },
      {
        id: 2,
        displayText: '% ',
        cssClass: 'even int XS',
      },
      {
        id: 3,
        displayText: `${currentBenchmarkName}%`,
        cssClass: 'even int XS',
      },
    ],
    footRows: [],
    rows,
    noOfRowsOnInit: 0,
  };
};
// #endregion
