import { sqlConnection } from '../../utils/sql';

const COM_CLIENT_DB = 'CommApp';

const industrySelectorQuery = ({ ClientID }) => {
  return `exec ${COM_CLIENT_DB}.[dbo].sp_Toggle_Econ_IndustryNieir86 2`;
};
const activeCustomToggles = () => {};
const fetchData = async ({ filters }) => {
  const IndustryList2Digits = await sqlConnection.raw(industrySelectorQuery(filters));
  return { IndustryList2Digits };
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `Industry sector reports`,
    },
  ],
  filterToggles: [],
};

export { fetchData, activeCustomToggles, pageContent };
