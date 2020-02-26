import { sqlConnection } from '../../utils/sql';

import Page from './page';
import { formatMillionsCurrency } from '../../utils';
import getActiveToggle from '../../utils/getActiveToggle';

const BuildingApprovalsSQL = ({ ClientID, WebID }) =>
  `SELECT * from CommData_Economy.[dbo].[fn_IN_BuildingApprovals](${ClientID}, ${WebID}, 40 ) ORDER BY Yr DESC`;

const fetchData = async ({ filters }) => {
  const { ClientID, WebID } = filters;
  const contentData = await sqlConnection.raw(BuildingApprovalsSQL({ ClientID, WebID }));

  return contentData;
};

const activeCustomToggles = ({ filterToggles }) => {
  const activeCustomToggles = { activeBenchmarkName: getActiveToggle(filterToggles, 'BMID') };
  return activeCustomToggles;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `Local workers - Key statistics - {industry}`,
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
