import { sqlConnection } from '../../utils/sql';

import Page from './page';
import { formatMillionsCurrency, formatPercent, formatNumber } from '../../utils';
import getActiveToggle from '../../utils/getActiveToggle';
import _ from 'lodash';

const BuildingApprovalsSQL = ({ ClientID, WebID, IGBMID, Indkey }) =>
  `SELECT * from CommData_Economy.[dbo].[fn_Industry_KeyStats](${ClientID},${WebID},${IGBMID},2016,2011,${Indkey},'UR')`;

const fetchData = async ({ filters }) => await sqlConnection.raw(BuildingApprovalsSQL(filters));

const activeCustomToggles = ({ filterToggles }) => ({
  currentBenchmarkName: getActiveToggle(filterToggles, 'IGBMID'),
  currentIndustryName: getActiveToggle(filterToggles, 'Indkey'),
});

const headline = ({ data, contentData, filters }) => {
  const { IndKey } = filters;
  const industryText = IndKey === 23000 ? '' : `(${data.currentIndustryName})`;
  const bachelors = contentData.filter(({ LabelKey }) => LabelKey === 70001)[0];
  const advancedDiplomas = contentData.filter(({ LabelKey }) => LabelKey === 70002)[0];
  const sumNo = formatNumber(bachelors.NoYear1 + advancedDiplomas.NoYear1);
  const sumPer = formatPercent(bachelors.PerYear1 + advancedDiplomas.PerYear1);
  return `${sumNo} people or ${sumPer}% of ${data.prefixedAreaName}'s resident workers ${industryText} have a tertiary qualification.`;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: ({ data }): string => `Resident workers - Key statistics - ${data.currentIndustryName}`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData, filters }): string => headline({ data, contentData, filters }),
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
      DefaultValue: '23000',
      Label: 'Current industry:',
      Params: [
        {
          IGBMID: '0',
        },
        {
          a: '0',
        },
      ],
      StoredProcedure: 'sp_Toggle_Econ_Industry',
      ParamName: 'Indkey',
    },
    {
      Database: 'CommApp',
      DefaultValue: '40',
      Label: 'Current benchmark:',
      Params: [
        {
          ClientID: '0',
        },
        {
          Indkey: '0',
        },
        {
          a: '0',
        },
      ],
      StoredProcedure: 'sp_Toggle_Econ_BM_Area_Ind',
      ParamName: 'IGBMID',
    },
  ],
};

export { fetchData, activeCustomToggles, Page, pageContent };
