import { sqlConnection } from '../../utils/sql';

const COM_CLIENT_DB = 'CommApp';

const industrySelector2DigitQuery = () => {
  return `exec ${COM_CLIENT_DB}.[dbo].sp_Toggle_Econ_IndustryNieir86 2`;
};

const industrySelector1DigitQuery = () => {
  return `exec ${COM_CLIENT_DB}.[dbo].sp_Toggle_Econ_BM_Area_Ind 0`;
};

const activeCustomToggles = () => {};
const fetchData = async ({ filters }) => {
  const IndustryList1Digits = await sqlConnection.raw(industrySelector1DigitQuery());
  const IndustryList2Digits = await sqlConnection.raw(industrySelector2DigitQuery());
  return { IndustryList1Digits, IndustryList2Digits };
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
