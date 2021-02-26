import { sqlConnection } from '../../utils/sql';
import Page from './page';
import { formatPercent, formatNumber, formatShortDecimal } from '../../utils';
import getActiveToggle from '../../utils/getActiveToggle';
import _ from 'lodash';

// select * from [dbo].[fn_GrossRegionalProduct](223,10,40)
const SQLQuery = ({ ClientID, WebID, BMID = 40 }) =>
  `SELECT * from CommData_Economy.[dbo].[fn_GrossRegionalProduct](${ClientID},${WebID},${BMID}) ORDER BY Year_End DESC`;

const fetchData = async ({ filters }) => await sqlConnection.raw(SQLQuery(filters));

const activeCustomToggles = ({ filterToggles }) => ({
  currentIndustryName: getActiveToggle(filterToggles, 'Indkey'),
});

const headline = ({ data, contentData }) => {
  const GRP = formatShortDecimal(contentData[0]['HeadLineGRP'] / 1000);
  const GRPPrevious = formatNumber(contentData[1]['HeadLineGRP']);
  const change = formatPercent(contentData[0]['ChangePer']);
  const changeText = GRP > GRPPrevious ? 'growing' : 'decreasing';
  return `${data.currentAreaName}’s Gross Regional Product was $${GRP} billion in the year ending June 2020, ${changeText} ${change}% since the previous year.`;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `Gross Regional Product`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string => headline({ data, contentData }),
    },
    {
      Title: 'DataSource',
      renderString: (): string => `National Economics (NIEIR) - Modelled series`,
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
