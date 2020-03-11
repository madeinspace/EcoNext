import { sqlConnection } from '../../utils/sql';
import Page from './page';
import { formatPercent, formatNumber, formatShortDecimal } from '../../utils';
import getActiveToggle from '../../utils/getActiveToggle';
import _ from 'lodash';

// select * from [dbo].[fn_JTW_Employment_Broad_1Digit](102,10,40,2019,2014,2009,1,null,1)
const SQLQuery = ({ ClientID, WebID, BMID }) =>
  `SELECT * from CommData_Economy.[dbo].[fn_JTW_Employment_Broad_1Digit](${ClientID},${WebID},${BMID}, 2019, 2014, 2009, 1, null,1) ORDER BY LabelKey`;

const fetchData = async ({ filters }) => await sqlConnection.raw(SQLQuery(filters));

const activeCustomToggles = () => {};

const largest = (arr, key) => {
  return arr
    .filter(a => a.LabelKey < 999999)
    .sort((a, b) => {
      return b[key] - a[key];
    })[0];
};

const headline = ({ data, contentData }) => {
  const { currentAreaName } = data;
  const largestInd = largest(contentData, 'PerYear1');
  const largestIndFirstYear = largestInd['PerYear3'];
  const comparisonText = largestIndFirstYear > largestInd['PerYear1'] ? 'declined' : 'increased';
  return `In 2019, the ${largestInd['LabelName']} sector accounted for ${formatPercent(
    largestInd['PerYear1'],
  )}% of employment in ${currentAreaName}. The importance of this sector has ${comparisonText} over the last 10 years (${formatPercent(
    largestIndFirstYear,
  )}% in 2009)`;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `Industry composition`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string => headline({ data, contentData }),
    },
  ],
  filterToggles: [
    {
      Database: 'CommApp',
      DefaultValue: '10',
      Label: 'Current area:',
      Params: [
        {
          ClientID: '2',
        },
      ],
      StoredProcedure: 'sp_Toggle_Econ_Area',
      ParamName: 'WebID',
    },
  ],
};

export { fetchData, activeCustomToggles, Page, pageContent };
