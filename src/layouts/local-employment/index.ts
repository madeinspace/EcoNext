import { sqlConnection } from '../../utils/sql';
import Page from './page';
import getActiveToggle from '../../utils/getActiveToggle';
import _ from 'lodash';

/* #region  contentDataQuery */
// select * from [dbo].[fn_JTW_Self_Sufficiency_Industry_LGA_2016](102,10,2016,2011)
const IndustryQuery = {
  id: 1,
  query: ({ ClientID, WebID, BMID }) =>
    `select * from CommData_Economy.[dbo].[fn_JTW_Self_Sufficiency_Industry_LGA_2016](${ClientID}, ${WebID}, 2016, 2011)`,
};

// select * from [dbo].[fn_JTW_Self_Containment_Occupation_LGA_2016](102,10,2016,2011)
const OccupationQuery = {
  id: 2,
  query: ({ ClientID, WebID, BMID }) =>
    `select * from CommData_Economy.[dbo].[fn_JTW_Self_Sufficiency_Occupation_LGA_2016](${ClientID}, ${WebID}, 2016, 2011)`,
};
/* #endregion */

const without = (str, exclude) => {
  return str === exclude ? '' : str;
};

const largest = (arr, key) => {
  return arr
    .filter(a => a.LabelKey < 96000)
    .sort((a, b) => {
      return b[key] - a[key];
    })[0];
};

const queries = [IndustryQuery, OccupationQuery];

const fetchData = async ({ filters }) =>
  await Promise.all(
    queries.map(async ({ query, id }) => {
      return { id, data: await sqlConnection.raw(query(filters)) };
    }),
  );

const activeCustomToggles = ({ filterToggles }) => {
  return {
    currentTypeName: getActiveToggle(filterToggles, 't'),
  };
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: ({ data }): string => {
        return `Employment self-sufficiency`;
      },
    },
    {
      Title: 'DataSource',
      renderString: ({ data }): string =>
        `Australian Bureau of Statistics (ABS) – Census 2011 (experimental imputed) & 2016 – by place of work`,
    },
  ],
  filterToggles: [
    {
      Database: 'CommApp',
      DefaultValue: '1',
      Label: 'Type:',
      Params: null,
      StoredProcedure: 'sp_Toggle_Econ_Topic_Type',
      ParamName: 't',
      Hidden: true,
    },
    {
      Database: 'CommApp',
      DefaultValue: '10',
      Label: 'Current area:',
      Params: [
        {
          ClientID: '2',
        },
      ],
      StoredProcedure: 'sp_Toggle_Econ_Area',
      ParamName: 'WebID',
    },
  ],
};

export { fetchData, activeCustomToggles, Page, pageContent };
