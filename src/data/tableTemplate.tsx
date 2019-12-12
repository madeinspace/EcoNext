import { formatNumber, formatChangeNumber } from '../utils';

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

const tableBuilder = (currentBenchmark, clientAlias, rows) => {
  const tableTitle = 'Gross Regional Product (GRP)';
  const clientLongName = rows[0].GeoName;
  const totalColSpan = 8;

  return {
    cssClass: '',
    clientAlias,
    source: <Source />,
    anchorName: tableTitle,
    headRows: [
      {
        cssClass: '',
        cols: [
          {
            cssClass: 'table-area-name',
            displayText: tableTitle,
            colSpan: totalColSpan,
          },
        ],
      },
      {
        cssClass: 'heading',
        cols: [
          {
            colSpan: 1,
          },
          {
            cssClass: 'even ',
            displayText: clientLongName,
            colSpan: 3,
          },
          {
            cssClass: 'odd ',
            displayText: currentBenchmark,
            colSpan: 3,
          },
          {
            cssClass: 'even',
            colSpan: 1,
          },
        ],
      },
    ],
    cols: [
      {
        id: 0,
        displayText: 'Year (ending June 30)',
        cssClass: 'odd first',
      },
      {
        id: 1,
        displayText: '$GRP $m',
        cssClass: 'even int',
      },
      {
        id: 2,
        displayText: '% change from previous year',
        cssClass: 'even int',
      },
      {
        id: 3,
        displayText: 'Cumulative change',
        cssClass: 'even int',
      },
      {
        id: 4,
        displayText: '$GRP $m',
        cssClass: 'odd int',
      },
      {
        id: 5,
        displayText: '% change from previous year',
        cssClass: 'odd int',
      },
      {
        id: 6,
        displayText: 'Cumulative change',
        cssClass: 'odd int',
      },
      {
        id: 7,
        displayText: `${clientLongName} as a % of ${currentBenchmark}`,
        cssClass: 'even int',
      },
    ],
    footRows: [],
    rows: rows.map(({ Yr, ValWebID, PerWebID, ValBM, PerBM, PerWebIDofBM }, i: number) => ({
      data: [Yr, ValWebID, PerWebID, ValBM, PerWebID, PerWebIDofBM],
      formattedData: [
        Yr,
        formatNumber(ValWebID),
        formatChangeNumber(PerWebID, '--'),
        formatNumber(ValBM),
        formatChangeNumber(PerBM, '--'),
        formatChangeNumber(PerWebIDofBM, '--'),
        formatChangeNumber(PerWebIDofBM, '--'),
        formatChangeNumber(PerWebIDofBM, '--'),
      ],
      id: i,
    })),
  };
};
