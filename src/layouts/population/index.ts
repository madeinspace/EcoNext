import { sqlConnection } from '../../utils/sql';

import Page from './page';

const fetchData = async ({ filters }) => {
  const { ClientID, WebID, IGBMID } = filters;

  const tableData = await sqlConnection.raw(PopulationDataSQL({ ClientID, WebID, IGBMID }));

  return tableData;
};

export { fetchData, Page };

const PopulationDataSQL = ({ ClientID, WebID, IGBMID }) => `
  select * from CommData_Economy.[dbo].[fn_IN_ERPPivot](${+ClientID},${+WebID},${+IGBMID}) ORDER BY Year DESC
`;
