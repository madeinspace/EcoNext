import { sqlConnection } from '../../utils/sql';
import Page from './page';
import { formatPercent, formatNumber, formatShortDecimal } from '../../utils';
import getActiveToggle from '../../utils/getActiveToggle';
import _ from 'lodash';

// select * from [fn_EmploymentCapacity_1and2Digit](102,10,2011,2006,1,null)
const SQLQuery = ({ ClientID, WebID, sStartYear, sEndYear }) =>
  `SELECT * from CommData_Economy.[dbo].[fn_EmploymentCapacity_1and2Digit](${ClientID},${WebID},${sStartYear}, ${sEndYear}, 1,null) ORDER BY LabelKey ASC`;

const fetchData = async ({ filters }) => await sqlConnection.raw(SQLQuery(filters));

const activeCustomToggles = ({ filterToggles }) => ({
  currentStartYear: getActiveToggle(filterToggles, 'sStartYear'),
  currentComparaisonYear: getActiveToggle(filterToggles, 'sEndYear'),
});

const headline = ({ data, contentData }) => {
  console.log('contentData: ', contentData);
  // const GRP = formatShortDecimal(contentData[0]['HeadLineGRP'] / 1000);
  // const GRPPrevious = formatNumber(contentData[1]['HeadLineGRP']);
  // const change = formatPercent(contentData[0]['ChangePer']);
  // const changeText = GRP > GRPPrevious ? 'growing' : 'decreasing';
  return `The jobs to residents ratio for {the City of Monash} in {2018/19} was {1.44}, meaning that there were {more} jobs than resident workers. {Construction} had the highest ratio ({2.43}), while the lowest ratio was found in {Mining} ({0.44}).`;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `Jobs to workers ratio`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string => headline({ data, contentData }),
    },
    {
      Title: 'DataSource',
      renderString: (): string => `National Economics (NIEIR) - Modelled series`,
    },
  ],
  filterToggles: [
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
    {
      Database: 'CommApp',
      DefaultValue: '2019',
      Label: 'Year:',
      Params: null,
      StoredProcedure: 'sp_Toggle_Econ_Struct_Years_Start',
      ParamName: 'sStartYear',
      Hidden: true,
    },
    {
      Database: 'CommApp',
      DefaultValue: '2014',
      Label: 'Comparison year:',
      Params: null,
      StoredProcedure: 'sp_Toggle_Econ_Struct_Years_End',
      ParamName: 'sEndYear',
    },
  ],
};

export { fetchData, activeCustomToggles, Page, pageContent };
