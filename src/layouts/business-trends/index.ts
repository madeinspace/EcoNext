import { sqlConnection } from '../../utils/sql';
import Page from './page';
import getActiveToggle from '../../utils/getActiveToggle';
import _ from 'lodash';

// select * from [dbo].[fn_ABR_Businessloc_ALL_1and3Digit](102,23000)
const BusinessTrendsQuery = ({ ClientID, Indkey = 999999 }) => {
  const query = `select * from CommData_Economy.[dbo].[fn_ABR_Trend](${ClientID},10,999999)`;
  return query;
};

const IndustryToggleQuery = () => {
  return `exec [CommApp].[dbo].[sp_Toggle_Econ_IndustryABR_Trend]`;
};

const fetchData = async ({ filters }) => {
  const BusinessTrendsData = await sqlConnection.raw(BusinessTrendsQuery(filters));
  const toggles = await sqlConnection.raw(IndustryToggleQuery());
  return { BusinessTrendsData, toggles };
};

const activeCustomToggles = ({ filterToggles }) => {
  const activeCustomToggles = {
    currentIndustryName: getActiveToggle(filterToggles, 'Indkey'),
  };
  return activeCustomToggles;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: ({ data }): string => {
        return `Business trends `;
      },
    },
    {
      Title: 'DataSource',
      renderString: ({ data }): string => {
        return `Australian Business Register - filtered counts - Current at 30th Sept 2020`;
      },
    },
  ],
  filterToggles: [
    {
      Database: 'CommApp',
      DefaultValue: '23000',
      Label: 'Select industry:',
      Params: [],
      StoredProcedure: 'sp_Toggle_Econ_IndustryABR_Trend',
      ParamName: 'Indkey',
    },
  ],
};

export { fetchData, activeCustomToggles, Page, pageContent };
