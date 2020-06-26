import { sqlConnection } from '../../utils/sql';

const COM_CLIENT_DB = 'CommApp';

const industrySelectorQuery = ({ ClientID }) => {
  return `exec ${COM_CLIENT_DB}.[dbo].sp_Toggle_Econ_BM_Area_Ind 0`;
};
const activeCustomToggles = () => {};
const fetchData = async ({ filters }) => {
  const IndustryList1Digits = await sqlConnection.raw(industrySelectorQuery(filters));
  return { IndustryList1Digits };
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `Employment reports`,
    },
  ],
  filterToggles: [],
};

export { fetchData, activeCustomToggles, pageContent };
