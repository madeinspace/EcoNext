import { sqlConnection } from '../../utils/sql';
import Page from './page';
import getActiveToggle from '../../utils/getActiveToggle';
import { formatPercent } from '../../utils';

// select * from [dbo].[fn_LQSS_Analysis_1and2Digit](102,10,40,2019,2013,1,null,1)

const contentDataQuery = ({ ClientID, BMID, WebID, sStartYear, sEndYear, LoQo }) => {
  return `select * from CommData_Economy.[dbo].[fn_LQSS_Analysis_1and2Digit]( ${ClientID}, ${WebID}, ${BMID}, ${sStartYear}, ${sEndYear}, 1,null, ${LoQo})`;
};

const largest = (arr, key) => {
  return arr
    .filter(a => a.LabelKey < 96000)
    .sort((a, b) => {
      return b[key] - a[key];
    })[0];
};

const fetchData = async ({ filters }) => await sqlConnection.raw(contentDataQuery(filters));

const activeCustomToggles = ({ filterToggles }) => ({
  currentBenchmarkName: getActiveToggle(filterToggles, 'BMID'),
  currentStartYear: getActiveToggle(filterToggles, 'sStartYear'),
  currentComparisonYear: getActiveToggle(filterToggles, 'sEndYear'),
  currentMeasure: getActiveToggle(filterToggles, 'LoQo'),
});

const headline = ({ data, contentData }): string => {
  const { prefixedAreaName, currentComparisonYear, currentStartYear } = data;
  const largestEmployer = largest(contentData, 'RegComp');
  const IndName = largestEmployer.LabelName;
  return `In ${prefixedAreaName}, the strongest regional competitive effect between ${currentComparisonYear} and ${currentStartYear} was experienced in ${IndName}.`;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `Shift-share analysis`,
    },
    {
      Title: 'DataSource',
      renderString: (): string => `National Economics (NIEIR) - Modelled series`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string => headline({ data, contentData }),
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
      DefaultValue: '1',
      Label: 'Measure',
      Params: null,
      StoredProcedure: 'sp_Toggle_Econ_LQ',
      ParamName: 'LoQo',
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
