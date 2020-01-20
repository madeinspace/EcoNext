import { sqlConnection } from '../../utils/sql';

import Page from './page';

const fetchData = async ({ filters }) => {
  const contentData = {};
  // const contentData = await sqlConnection.raw(contentDataQuery(filters));

  return contentData;
};

const pageContent = {
  entities: [], // copy this from the relevant key in 'data/content.ts'
  filterToggles: [], // copy this from the relevant key in 'data/filterToggles.ts'
};

export { fetchData, Page, pageContent };

// uncomment the below function with the correct SQL

// const contentDataQuery = filters =>
// `select * from CommData_Economy.[dbo].[${TableName}]() order by ${OrderBy}`;
