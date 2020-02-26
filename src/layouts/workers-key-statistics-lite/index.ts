import { sqlConnection } from '../../utils/sql';

import Page from './page';
import { formatMillionsCurrency } from '../../utils';
import getActiveToggle from '../../utils/getActiveToggle';

//select * from [dbo].[fn_Industry_KeyStats](102,10,40,2016,2011,23000,'WP')
const workersKeyStatsLiteSQL = ({ ClientID, IGBMID, WebID }) =>
  `SELECT * from CommData_Economy.[dbo].[fn_Industry_KeyStats](${ClientID},${WebID},${IGBMID},2016,2011,23000,'WP')`;

const fetchData = async ({ filters }) => {
  const { ClientID, WebID, IGBMID } = filters;
  const contentData = await sqlConnection.raw(workersKeyStatsLiteSQL({ ClientID, IGBMID, WebID }));

  return contentData;
};

const activeCustomToggles = ({ filterToggles }) => {
  const activeCustomToggles = {
    currentBenchmarkName: getActiveToggle(filterToggles, 'IGBMID'),
    currentIndustryName: getActiveToggle(filterToggles, 'Indkey'),
  };
  return activeCustomToggles;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `Local workers - Key statistics (lite) - {industry}`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `The value of building approvals in ${data.currentAreaName} was ${formatMillionsCurrency(
          contentData[0].Total * 1000,
        )} in the ${contentData[0].LabelName} financial year.`,
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
      DefaultValue: '23000',
      Label: 'Current industry:',
      Params: [
        {
          IGBMID: '0',
        },
        {
          a: '0',
        },
      ],
      StoredProcedure: 'sp_Toggle_Econ_Industry',
      ParamName: 'Indkey',
    },
    {
      Database: 'CommApp',
      DefaultValue: '40',
      Label: 'Current benchmark:',
      Params: [
        {
          ClientID: '0',
        },
        {
          Indkey: '0',
        },
        {
          a: '0',
        },
      ],
      StoredProcedure: 'sp_Toggle_Econ_BM_Area_Ind',
      ParamName: 'IGBMID',
    },
  ],
};

export { fetchData, activeCustomToggles, Page, pageContent };
