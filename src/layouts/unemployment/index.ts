import { sqlConnection } from '../../utils/sql';
import Page from './page';
import { formatPercent } from '../../utils';
import getActiveToggle from '../../utils/getActiveToggle';
import _ from 'lodash';

// select * from [dbo].[fn_IN_UnemploymentPivot](102,10,40)
const SQLQuery = ({ ClientID, WebID, BMID }) =>
  `SELECT * from CommData_Economy.[dbo].[fn_In_UnemploymentPivot](${ClientID},${WebID},${BMID}) ORDER BY Year ASC, Month ASC`;

const fetchData = async ({ filters }) => await sqlConnection.raw(SQLQuery(filters));

const activeCustomToggles = ({ filterToggles }) => ({
  currentBenchmarkName: getActiveToggle(filterToggles, 'BMID'),
});

const headline = ({ data, contentData }) => {
  const lastQuarter: any = _.takeRight(contentData, 1)[0];
  return `In the ${lastQuarter.Year} ${lastQuarter.LabelMonth} quarter, the unemployment rate in ${
    data.prefixedAreaName
  } was ${formatPercent(lastQuarter.NumberUnempRate)}%.`;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `Unemployment`,
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
