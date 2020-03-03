import { sqlConnection } from '../../utils/sql';

import Page from './page';
import { formatMillionsCurrency, formatPercent, formatNumber } from '../../utils';
import getActiveToggle from '../../utils/getActiveToggle';

const BuildingApprovalsSQL = ({ ClientID, WebID, BMID, Indkey }) =>
  `SELECT * from CommData_Economy.[dbo].[fn_Industry_KeyStats](${ClientID},${WebID},${BMID},2016,2011,23000,'UR')`;

const fetchData = async ({ filters }) => await sqlConnection.raw(BuildingApprovalsSQL(filters));

const activeCustomToggles = ({ filterToggles }) => ({
  currentBenchmarkName: getActiveToggle(filterToggles, 'BMID'),
});

const headline = ({ data, contentData }) => {
  const bachelors = contentData.filter(({ LabelKey }) => LabelKey === 70001)[0];
  const advancedDiplomas = contentData.filter(({ LabelKey }) => LabelKey === 70002)[0];
  const sumNo = formatNumber(bachelors.NoYear1 + advancedDiplomas.NoYear1);
  const sumPer = formatPercent(bachelors.PerYear1 + advancedDiplomas.PerYear1);
  return `${sumNo} people or ${sumPer}% of ${data.prefixedAreaName}'s resident workers have a tertiary qualification.`;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: ({ data }): string => `Resident workers - Key statistics`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string => headline({ data, contentData }),
    },
    {
      Title: 'DataSource',
      renderString: (): string => `Australian Bureau of Statistics (ABS) – Census 2011 and 2016 – by usual residence`,
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
  ],
};

export { fetchData, activeCustomToggles, Page, pageContent };
