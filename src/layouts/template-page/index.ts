import { sqlConnection } from '../../utils/sql';

import Page from './page';

const fetchData = async ({ filters }) => {
  const tableData = {};
  // const tableData = await sqlConnection.raw(tableDataQuery(filters));

  return tableData;
};

const pageContent = {
  entities: [], // copy this from the relevant key in 'data/content.ts'
  toggles: [], // copy this from the relevant key in 'data/toggles.ts'
};

export { fetchData, Page, pageContent };

// uncomment the below function with the correct SQL

// const tableDataQuery = filters =>
// `select * from CommData_Economy.[dbo].[fn_Industry_StudyField1and3Digit_Sex]() order by LabelKey ASC`;
