import { sqlConnection } from '../../utils/sql';
import Page from './page';
import getActiveToggle from '../../utils/getActiveToggle';
import { formatPercent } from '../../utils';
import _ from 'lodash';

const contentDataQuery = ({ ClientID, IGBMID, Sex, Indkey, WebID }) =>
  `select * from CommData_Economy.[dbo].[fn_Industry_Income_Sex]( ${ClientID}, ${WebID}, ${IGBMID}, 2016, 2011, 'WP', ${Sex}, 1, null, ${Indkey}) order by LabelKey DESC`;

const fetchData = async ({ filters }) => await sqlConnection.raw(contentDataQuery(filters));

const activeCustomToggles = ({ filterToggles }) => {
  return {
    currentBenchmarkName: getActiveToggle(filterToggles, 'IGBMID'),
    currentIndustryName: getActiveToggle(filterToggles, 'Indkey'),
    currentGenderName: getActiveToggle(filterToggles, 'Sex'),
  };
};

const headline = ({ data, contentData, filters }) => {
  const { prefixedAreaName, currentGenderName } = data;
  const { Sex } = filters;
  const allIncomers = contentData.filter(({ LabelKey }) => LabelKey < 999999 && LabelKey != 3115);
  const highIncomers = key =>
    _.sumBy(
      allIncomers.filter(({ LabelKey }) => LabelKey > 3111),
      key,
    );
  const genderText = +Sex === 3 ? '' : currentGenderName.toLowerCase().replace(/s\b/gi, '');
  const highIncomerClient = formatPercent(highIncomers('PerYear1'));
  const headlineText = `In ${prefixedAreaName}, ${highIncomerClient}% of the ${genderText} local workers earned $1,750 or more per week.`;
  return headlineText;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: ({ data }): string => `Local workers - Individual income - ${data.currentIndustryName}`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData, filters }): string => headline({ data, contentData, filters }),
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
      Label: 'Select industry:',
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
    {
      Database: 'CommApp',
      DefaultValue: '3',
      Label: 'Gender:',
      Params: null,
      StoredProcedure: 'sp_Toggle_Econ_Gender',
      ParamName: 'Sex',
    },
  ],
};

export { fetchData, activeCustomToggles, Page, pageContent };
