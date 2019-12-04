import { sqlConnection } from '../../utils/sql';

import Page from './page';

const fetchData = async ({ filters }) => {
  const tableData = {};
  // const tableData = await sqlConnection.raw(tableDataQuery(filters));

  return tableData;
};

const pageContent = {
  entities: [], // copy this from the relevant key in 'data/content.ts'
  filterToggles: [], // copy this from the relevant key in 'data/filterToggles.ts'
};

export { fetchData, Page, pageContent };

// uncomment the below function with the correct SQL

// const tableDataQuery = filters =>
// `select * from CommData_Economy.[dbo].[${TableName}]() order by ${OrderBy}`;
