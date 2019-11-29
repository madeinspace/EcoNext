import { sqlConnection } from '../../utils/sql';

import Page from './page';

const fetchData = async ({ filters }) => {
  const { ClientID, WebID } = filters;

  const tableData = await sqlConnection.raw(BuildingApprovalsSQL({ ClientID, WebID }));

  return tableData;
};

export { fetchData, Page };

const BuildingApprovalsSQL = ({ ClientID, WebID }) => `
 SELECT * from CommData_Economy.[dbo].[fn_IN_BuildingApprovals](${ClientID}, ${WebID}, 40 ) ORDER BY Yr DESC
`;
