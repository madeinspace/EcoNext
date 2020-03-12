import { sqlConnection } from '../../utils/sql';
import Page from './page';
import { formatPercent } from '../../utils';
import getActiveToggle from '../../utils/getActiveToggle';
import _ from 'lodash';

// select * from [dbo].[fn_IN_RetailSalesFullTrend](102,40,50) order by Yr desc, Month desc
const SQLQuery = ({ ClientID }) => {
  return `SELECT * from CommData_Economy.[dbo].[fn_IN_RetailSalesFullTrend](${ClientID},40, 50) ORDER BY Yr DESC, Month DESC`;
};

const fetchData = async ({ filters }) => await sqlConnection.raw(SQLQuery(filters));

const activeCustomToggles = ({ filterToggles }) => ({
  currentBenchmarkName: getActiveToggle(filterToggles, 'BMID'),
});

const headline = ({ data, contentData }) => {
  const lastQuarter: any = _.take(contentData, 1)[0];
  const lastQuarterYear = contentData.find(item => item.Yr === lastQuarter.Yr - 1 && item.QTR === lastQuarter.QTR);
  const comparisonText = lastQuarter.Number > lastQuarterYear.Number ? 'rose' : 'decreased';
  return `In ${lastQuarter.MonthLabel} ${lastQuarter.Yr}, the retail trade estimate for ${
    data.currentBenchmarkName
  } ${comparisonText} ${formatPercent(lastQuarter.Change)}% from the previous year.`;
};

const pageContent = {
  entities: [
    {
      Title: 'MainTitle',
      renderString: ({ data }): string => `${data.currentBenchmarkName}`,
    },
    {
      Title: 'SubTitle',
      renderString: (): string => `Retail trade`,
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
