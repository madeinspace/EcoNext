import { sqlConnection } from '../../utils/sql';

import Page from './page';

const fetchData = async ({ filters }) => {
  const { ClientID, WebID, BMID } = filters;

  const tableData = await sqlConnection.raw(SQL({ ClientID, WebID, BMID }));

  return tableData;
};

export { fetchData, Page };

const SQL = ({ ClientID, WebID, BMID }) => `
  select * from CommData_Economy.[dbo].[fn_HeadlineGRP_Full](${+ClientID},${+WebID},${+BMID}) ORDER BY Year_End DESC
`;
