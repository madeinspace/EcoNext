import { sqlConnection } from '../../utils/sql';
import Page from './page';
import { formatPercent } from '../../utils';
import getActiveToggle from '../../utils/getActiveToggle';
import _ from 'lodash';

// select * from  [dbo].[fn_IN_CPI](102,40,50)
const SQLQuery = ({ ClientID, WebID, BMID }) => {
  return `SELECT * from CommData_Economy.[dbo].[fn_IN_CPI](${ClientID},40, 50) ORDER BY Yr DESC, Qtr DESC`;
};

const fetchData = async ({ filters }) => await sqlConnection.raw(SQLQuery(filters));

const activeCustomToggles = ({ filterToggles }) => ({
  currentBenchmarkName: getActiveToggle(filterToggles, 'BMID'),
});

const headline = ({ contentData }) => {
  const lastQuarter: any = _.take(contentData, 1)[0];
  const lastQuarterYear = contentData.find(item => item.Yr === lastQuarter.Yr - 1 && item.QTR === lastQuarter.QTR);
  const comparisonText = lastQuarter.Number > lastQuarterYear.Number ? 'increased' : 'decreased';
  const comparisonTextBM = lastQuarter.BMNumber > lastQuarterYear.BMNumber ? 'increased' : 'decreased';
  return `In the year to ${lastQuarter.MonthLabel} ${lastQuarter.Yr}, the CPI for ${
    lastQuarter.GeoName
  } ${comparisonText} ${formatPercent(
    lastQuarter.ChangePer,
  )}%. During the same period, the CPI for the eight capital cities in Australia ${comparisonTextBM} ${formatPercent(
    lastQuarter.BMChangePer,
  )}%.`;
};

const pageContent = {
  entities: [
    {
      Title: 'MainTitle',
      renderString: ({ data }): string => `${data.currentBenchmarkName}`,
    },
    {
      Title: 'SubTitle',
      renderString: (): string => `Consumer Price Index`,
    },
    {
      Title: 'Headline',
      renderString: ({ contentData }): string => headline({ contentData }),
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
