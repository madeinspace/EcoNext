import { sqlConnection } from '../../utils/sql';
import Page from './page';
import getActiveToggle from '../../utils/getActiveToggle';
import { formatPercent } from '../../utils';

const contentDataQuery = filters => {
  const { ClientID, WebID, sStartYear, sEndYear, BType } = filters;
  return `select * from CommData_Economy.[dbo].[fn_BusinessRegister](${ClientID}, ${WebID}, 40, ${sStartYear}, ${sEndYear}, 1, null, ${BType}) order by LabelKey`;
};

const fetchData = async ({ filters }) => {
  const query = contentDataQuery(filters);
  const contentData = await sqlConnection.raw(query);
  return contentData;
};

const activeCustomToggles = ({ filterToggles }) => {
  const activeCustomToggles = {
    currentBtype: getActiveToggle(filterToggles, 'BType'),
    currentBenchmarkName: getActiveToggle(filterToggles, 'BMID'),
  };
  return activeCustomToggles;
};

const headline = ({ data, contentData }) => {
  const { currentBtype, currentBenchmarkName, currentAreaName } = data;

  const lookup = {
    'Non-employing': 'registered non-employing businesses',
    Employing: 'registered employing businesses',
    '1 to 4 ': 'businesses employing 1 to 4 people',
    '5 to 19': 'businesses employing 5 to 19 people',
    '20 to 199': 'businesses employing 20 to 199 people',
    '200 or more': 'businesses employing 200 or more people',
    'Total businesses': 'total registered businesses',
  };

  const totalLabelKey = 999999;

  const TopInd = contentData
    .filter(ind => ind.LabelKey !== totalLabelKey)
    .reduce((prev, current) => {
      return prev.NoYear1 > current.NoYear1 ? prev : current;
    });

  const BusinessType = lookup[currentBtype] || '';
  return `The ${
    TopInd.LabelName
  } industry had the largest number of ${BusinessType} in ${currentAreaName}, comprising ${formatPercent(
    TopInd.PerYear1,
  )}% of all ${BusinessType}, compared to ${formatPercent(TopInd.BMYear1)}% in ${currentBenchmarkName}.`;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `Businesses by industry`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string => headline({ data, contentData }),
    },
  ],
  filterToggles: [
    {
      Database: 'CommApp',
      DefaultValue: '600',
      Label: 'Number of employees:',
      Params: null,
      StoredProcedure: 'sp_Toggle_Econ_Business_Type',
      ParamName: 'BType',
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
    {
      Database: 'CommApp',
      DefaultValue: '2018',
      Label: 'Year:',
      Params: null,
      Hidden: true,
      StoredProcedure: 'sp_Toggle_Econ_Struct_Years_Start_BR',
      ParamName: 'sStartYear',
    },
    {
      Database: 'CommApp',
      DefaultValue: '2017',
      Label: 'Comparison year:',
      Params: null,
      StoredProcedure: 'sp_Toggle_Econ_Struct_Years_End_BR',
      ParamName: 'sEndYear',
    },
  ],
};

export { fetchData, activeCustomToggles, Page, pageContent };
