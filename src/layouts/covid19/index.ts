import { sqlConnection } from '../../utils/sql';
import Page from './page';

const topThreeQuery = ({ ClientID, WebID = 10, BMID = 40 }) =>
  `select * from CommData_Economy.[dbo].[fn_COVID19_Headline_Industry_Top3](${ClientID},${WebID},${BMID}) ORDER BY QtrChg DESC`;
const headlineQuery = ({ ClientID, WebID = 10, BMID = 40 }) =>
  `select * from CommData_Economy.[dbo].[fn_COVID19_Headline](${ClientID},${WebID},${BMID})`;

const fetchData = async ({ filters }) => {
  if(filters.IsLite){
    return {}
  }
  const headlineData = await sqlConnection.raw(headlineQuery(filters));
  const topThreeData = await sqlConnection.raw(topThreeQuery(filters));
  return { topThreeData, headlineData };
};

const activeCustomToggles = ({ filterToggles }) => ({});

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `COVID-19 Economic Outlook Tool`,
      StoredProcedure: 'sp_Condition_IsLiteClient',
      Params: [
        {
          ClientID: '0',
        },
      ],
      Value: '177',
    },
    {
      Title: 'SubTitle',
      renderString: (): string => `COVID-19 update`,
      StoredProcedure: 'sp_Condition_IsLiteClient',
      Params: [
        {
          ClientID: '0',
        },
      ],
      Value: '178',
    },
  ],
  filterToggles: [
    {
      Database: 'CommApp',
      DefaultValue: '40',
      Label: 'Current benchmark:',
      Params: [
        {
          ClientID: '9',
        },
      ],
      StoredProcedure: 'sp_Toggle_Econ_Area_BM',
      ParamName: 'BMID',
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

export { fetchData, Page, activeCustomToggles, pageContent };
