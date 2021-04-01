import { ItemWrapper } from '../../../styles/MainContentStyles';
import EntityTable from '../../../components/table/EntityTable';
import { IdLink } from '../../../components/ui/links';

const tableData = [
  {
    term: 'ABS Census of Population and Housing	',
    definition: 'Official count of the population undertaken every five years.',
  },
  {
    term: 'ABS Business Register	',
    definition:
      'A register of businesses with an ABN that are actively registered for GST as maintained by the Australian Taxation Office. ',
  },
  {
    term: 'ABS Building Approvals	',
    definition: 'Monthly count of building work approved.',
  },
  {
    term: 'ABS Labour Force Survey	',
    definition:
      'Monthly survey of 30,000 households to provide information on the labour force and unemployment rates.    ',
  },
  {
    term: 'ABS National Accounts	',
    definition: 'Measure the economic activity of a nation.    ',
  },
  {
    term: 'ABS State Accounts	',
    definition: 'Measure the economic activity of a State or Territory.    ',
  },
  {
    term: 'ANZSIC',
    definition:
      'The Austalian New Zealand Standard Industry Classification used to classify industry sectors from the Census. These classifications are subject to change.    ',
  },
  {
    term: 'ANZSIC06',
    definition: 'The most recent industry classification which was updated in 2006.',
  },
  {
    term: 'Census Total Employment	',
    definition:
      'A count of the number of jobs at the time of the Census, regardless of whether they are full-time or part-time    ',
  },
  {
    term: 'Constant prices	',
    definition:
      'Price and value data which has been adjusted to a constant reference year to adjust for the effects of inflation. As at 2011-12, the data for all years from the NIEIR microsimulation model has been adjusted to constant prices based on a 2010/11 reference year and this is updated every few years.    ',
  },
  {
    term: 'Consumer Price Index (CPI)	',
    definition:
      'Measures quarterly changes in the price of a "basket" of goods and services on which the population group spend a high proportion of their income.    ',
  },
  {
    term: 'DEEWR Small Area Labour Markets	',
    definition:
      'Estimate the number of unemployed persons and unemployment rates for Statistical Local Areas across Australia.    ',
  },
  {
    term: 'Destination zones	',
    definition:
      'Geographic units designed by State Transport Authorities to enable the presentation of Place of Work data.    ',
  },
  {
    term: 'Disposable Income	',
    definition: 'Measures the income (after taxes) that is available for saving or spending. ',
  },
  {
    term: 'economy.id	',
    definition:
      'Online economic profile of a local government area or region produced by .id (informed decisions).    ',
  },
  {
    term: 'Employment capacity	',
    definition:
      'The ratio of the number of jobs in an industry in the local area to the number of employed residents working in the industry, regardless of where they work.    ',
  },
  {
    term: 'Estimated Resident Population (ERP)	',
    definition: 'Official estimates of the Australian population generated by the Australian Bureau of Statistics.    ',
  },
  {
    term: 'Estimated Total Employment	',
    definition: 'An estimate of the total number of jobs regardless of whether they are full-time or part-time.    ',
  },
  {
    term: 'Full-time Equivalent Employment	',
    definition: 'A measure of the number of full-time equivalent jobs in an industry sector.    ',
  },
  {
    term: 'Gross Local Product (residents)	',
    definition:
      'The economic value-added generated by the residents of the area regardless of where they work (i.e the income received by people in the local area). ',
  },
  {
    term: 'Gross Regional Product	',
    definition:
      'A measure of the size or net wealth generated by a region including the sum of all industry gross product plus ownership of dwellings.   ',
  },
  {
    term: 'Household Expenditure Survey	',
    definition:
      'Survey conducted by the Australian Bureau of Statistics to track the composition of household spending.    ',
  },
  {
    term: 'Journey to Work data	',
    definition: "A Census based data set cross tabulating people's place of residence with their place of work.    ",
  },
  {
    term: 'Local Government Area	',
    definition: 'An official geographic unit that equates to areas controlled by each individual Local Government.    ',
  },
  {
    term: 'Local resident workers	',
    definition:
      'The local resident workers refers to the people who reside in an area and are available to work. They may currently be either employed or unemployed. They may work either in the local area or elsewhere.    ',
  },
  {
    term: 'nfd',
    definition:
      'Not Further Described – a Census term for when a response can be coded to a higher level of classification but not a specific sub-category.    ',
  },
  {
    term: 'NIEIR',
    definition: 'National Institute of Economic and Industry Research - economic research and modelling firm.    ',
  },
  {
    term: 'Place of Work	',
    definition: 'A Census based data set showing the location of workers by Destination Zone.    ',
  },
  {
    term: 'Regional resident workers	',
    definition:
      'The regional resident workers refers to the people who reside in a defined region around the local area and are available to work. They may currently be either employed or unemployed. They may work either in the local area, the region or elsewhere.    ',
  },
  {
    term: 'Retail Trade Index	',
    definition:
      'ABS estimate of the value of turnover of retail trade compiled from a monthly Retail Business Survey.    ',
  },
  {
    term: 'Self-containment	',
    definition:
      'The percentage of an LGA or region’s employed residents who have a workplace located within the boundaries of the LGA or region.    ',
  },
  {
    term: 'Self-sufficiency	',
    definition:
      'The percentage of an LGA or region’s working population (working in the LGA) who also live within the boundaries of the LGA or region.    ',
  },
  {
    term: 'Statistical Local Area	',
    definition:
      'An official geographic unit equal to or smaller than a Local Government Area, which add up to LGAs.    ',
  },
  {
    term: 'Usual Residents	',
    definition: 'A count of where people usually live derived from the Census.    ',
  },
  {
    term: 'Value-added	',
    definition: 'Measure showing the productivity of an industry sector.    ',
  },
  {
    term: 'Local workers	',
    definition: 'The number of people who work in an area, regardless of where they live.    ',
  },
];
const GlossaryPage = () => {
  return (
    <>
      <ItemWrapper>
        <EntityTable data={tableBuilder()} />
      </ItemWrapper>
    </>
  );
};

export default GlossaryPage;
const TableSource = () => (
  <p>
    Compiled and presented by <IdLink />
  </p>
);
const tableBuilder = () => {
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by.id informed decisions.';
  const tableTitle = 'Glossary';
  const rows = tableData.map(({ term, definition }) => ({
    id: 'glossary',
    data: [term, definition],
    formattedData: [term, definition],
  }));

  return {
    allowExport: false,
    allowSortReset: false,
    rawDataSource,
    source: <TableSource />,
    anchorName: 'econglossary',
    headRows: [
      {
        cssClass: 'heading ',
        cols: [],
      },
    ],
    cols: [
      {
        id: 0,
        sortable: false,
        displayText: 'Glossary',
        cssClass: 'first XS',
      },
      {
        id: 1,
        sortable: false,
        displayText: 'Definition	',
        cssClass: ' XL left-align ',
      },
    ],
    rows,
    footRows: [],
    noOfRowsOnInit: 0,
  };
};
