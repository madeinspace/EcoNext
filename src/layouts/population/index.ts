import { sqlConnection } from '../../utils/sql';
import { formatNumber } from '../../utils';

import Page from './page';

const fetchData = async ({ filters }) => {
  const { ClientID, WebID, IGBMID } = filters;

  const tableData = await sqlConnection.raw(PopulationDataSQL({ ClientID, WebID, IGBMID }));

  return tableData;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `Population`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, tableData }): string =>
        `The Estimated Resident Population of ${data.currentAreaName} was ${formatNumber(
          tableData[0].Number,
        )} as of the 30th June ${tableData[0].Year}.`,
    },
    {
      Title: 'Description',
      renderString: ({ data, tableData }): string =>
        `<p>The Estimated Resident Population (ERP) is the official population of the area. It is updated annually by the Australian Bureau of Statistics, and reassessed every Census. The chart and table show last 10 years ERP for ${data.currentAreaName}, the state and Australia, with percentage comparisons. A growing population can indicate a growing economy, but this is not necessarily the case and depends on the residential role and function of the area.</p>`,
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

export { fetchData, Page, pageContent };

const PopulationDataSQL = ({ ClientID, WebID, IGBMID }) => `
  select * from CommData_Economy.[dbo].[fn_IN_ERPPivot](${+ClientID},${+WebID},${+IGBMID}) ORDER BY Year DESC
`;
