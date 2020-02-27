import { sqlConnection } from '../../utils/sql';

import Page from './page';

const fetchData = async filters => {
  const data = { foo: 'bar' };

  return data;
};

const activeCustomToggles = () => {};

const pageContent = {
  entities: [],
  filterToggles: [],
};

export { fetchData, activeCustomToggles, Page, pageContent };
