import { sqlConnection } from '../../utils/sql';

import Page from './page';

const fetchData = async filters => {
  const { ClientID, WebID } = filters;

  const data = await sqlConnection.raw(BuildingApprovalsSQL({ ClientID, WebID }));

  return data;
};

export { fetchData, Page };

const BuildingApprovalsSQL = ({ ClientID, WebID }) => `
 SELECT * from CommData_Economy.[dbo].[fn_IN_BuildingApprovals](${ClientID}, ${WebID}, 40 )
`;
