import { sqlConnection } from '../../utils/sql';

import Page from './page';
import { formatPercent } from '../../utils';
import getActiveToggle from '../../utils/getActiveToggle';
import _ from 'lodash';

//select * from [dbo].[fn_Unemployment_Keystats](102,10,20,2016,2011,0) order by labelkey
const SQLQuery = ({ ClientID, WebID, BMID }) =>
  `SELECT * from CommData_Economy.[dbo].[fn_Unemployment_Keystats](${ClientID},${WebID},${BMID},2016,2011,0)`;

const fetchData = async ({ filters }) => await sqlConnection.raw(SQLQuery(filters));

const activeCustomToggles = ({ filterToggles }) => ({
  currentBenchmarkName: getActiveToggle(filterToggles, 'BMID'),
  currentIndustryName: getActiveToggle(filterToggles, 'Indkey'),
});

const headline = ({ data, contentData }) => {
  const unemploymentRate = contentData.filter(({ LabelKey }) => LabelKey === 10004)[0];
  const unemployedArea = formatPercent(unemploymentRate.PerYear1);
  const unemployedBM = formatPercent(unemploymentRate.BMYear1);
  return `${unemployedArea}% of the resident workforce of ${data.prefixedAreaName} were unemployed in 2011, compared to ${unemployedBM}% in ${data.currentBenchmarkName}.`;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `Characteristics of the unemployed`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string => headline({ data, contentData }),
    },
    {
      Title: 'DataSource',
      renderString: (): string => `Australian Bureau of Statistics (ABS) – Census 2016 and 2011 – by usual residence`,
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
    {
      Database: 'CommApp',
      DefaultValue: '40',
      Label: 'Current benchmark:',
      Params: [
        {
          ClientID: '9',
        },
      ],
      StoredProcedure: 'sp_Toggle_Econ_Area_BM',
      ParamName: 'BMID',
    },
  ],
};

export { fetchData, activeCustomToggles, Page, pageContent };
