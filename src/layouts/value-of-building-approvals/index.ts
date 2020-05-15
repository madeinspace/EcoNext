import { sqlConnection } from '../../utils/sql';

import Page from './page';
import { formatMillionsCurrency } from '../../utils';
import getActiveToggle from '../../utils/getActiveToggle';

const BuildingApprovalsSQL = ({ ClientID, WebID }) =>
  `SELECT * from CommData_Economy.[dbo].[fn_IN_BuildingApprovals](${ClientID}, ${WebID}, 40 ) ORDER BY Yr DESC`;

const fetchData = async ({ filters }) => await sqlConnection.raw(BuildingApprovalsSQL(filters));

const activeCustomToggles = ({ filterToggles }) => ({ activeBenchmarkName: getActiveToggle(filterToggles, 'BMID') });

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `Building approvals`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `The value of building approvals in ${data.currentAreaName} was ${formatMillionsCurrency(
          contentData[0].Total * 1000,
        )} in the ${contentData[0].LabelName} financial year.`,
    },
    {
      Title: 'Description',
      renderString: ({ data }): string =>
        `<p>This dataset shows the total assessed value of building approvals for construction in ${data.currentAreaName} by financial year in millions of dollars. The dataset is updated monthly to include the current financial year to date, and includes residential and non-residential building approvals separately. The percentage of the state total is shown.<br><br>Building approvals for an area can be highly variable over time, particularly in the non-residential sector. Construction may take several years from the date of approval. A high rate of building approvals can indicate a growth area with a construction-led economy. A low rate of building approvals may indicate a settled area with established infrastructure, or an area with little growth. Note that this dataset is not adjusted for inflation.</p>`,
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
