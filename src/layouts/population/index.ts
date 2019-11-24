import { sqlConnection } from '../../utils/sql';

import Page from './page';

const fetchData = async filters => {
  const { ClientID, WebID, IGBMID } = filters;

  const data = await sqlConnection.raw(PopulationDataSQL({ ClientID, WebID, IGBMID }));

  return data;
};

export { fetchData, Page };

const PopulationDataSQL = ({ ClientID, WebID, IGBMID }) => `
  select * from CommData_Economy.[dbo].[fn_IN_ERPPivot](${+ClientID},${+WebID},${+IGBMID})
`;
