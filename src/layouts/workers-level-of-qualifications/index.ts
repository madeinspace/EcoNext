import { sqlConnection } from '../../utils/sql';
import Page from './page';
import getActiveToggle from '../../utils/getActiveToggle';
import { formatPercent } from '../../utils';
import _ from 'lodash';

const contentDataQuery = ({ ClientID, IGBMID, Sex, Indkey, WebID }) =>
  `select * from CommData_Economy.[dbo].[fn_Industry_Qualification_Sex]( ${ClientID}, ${WebID}, ${IGBMID}, 2016, 2011, 'WP', ${Sex}, 1, null, ${Indkey} ) order by LabelKey DESC`;

const fetchData = async ({ filters }) => await sqlConnection.raw(contentDataQuery(filters));

const activeCustomToggles = ({ filterToggles }) => ({
  currentBenchmarkName: getActiveToggle(filterToggles, 'IGBMID'),
  currentIndustryName: getActiveToggle(filterToggles, 'Indkey'),
  currentGenderName: getActiveToggle(filterToggles, 'Sex'),
});

const headline = ({ data, contentData, filters }) => {
  const { prefixedAreaName, currentBenchmarkName, currentIndustryName, currentGenderName } = data;
  const { Indkey, Sex } = filters;
  const genderText = +Sex === 3 ? '' : currentGenderName.toLowerCase().replace(/s\b/gi, '');
  const industryText = +Indkey === 23000 ? '' : `${currentIndustryName}`;
  const PersonWithUniQualification = contentData.filter(({ LabelKey }) => LabelKey != 999999 && LabelKey === 25001)[0];
  const uniQualificationClient = formatPercent(PersonWithUniQualification['PerYear1']);
  const uniQualificationBM = formatPercent(PersonWithUniQualification['BMYear1']);
  const comparison =
    Math.abs(uniQualificationClient - uniQualificationBM) < 1
      ? 'similar'
      : uniQualificationClient > uniQualificationBM
      ? 'higher'
      : 'lower';
  const headlineText = `In ${prefixedAreaName}, the ${industryText} ${genderText} workforce has a ${comparison} proportion with University qualifications compared to ${currentBenchmarkName}.`;
  return headlineText;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: ({ data }): string => `Local workers - Qualifications - ${data.currentIndustryName}`,
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
