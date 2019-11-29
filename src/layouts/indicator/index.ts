import { sqlConnection } from '../../utils/sql';

import Page from './page';

const fetchData = async filters => {
  const data = { foo: 'bar' };

  return data;
};

const pageContent = {
  entities: [],
  filterToggles: [],
};

export { fetchData, Page, pageContent };
