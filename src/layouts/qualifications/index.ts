import { sqlConnection } from '../../utils/sql';
import Page from './page';
import getActiveToggle from '../../utils/getActiveToggle';
import { formatPercent } from '../../utils';
import _ from 'lodash';

const contentDataQuery = ({ ClientID, IGBMID, Sex, Indkey, WebID }) =>
  `select * from CommData_Economy.[dbo].[fn_Industry_Qualification_Sex]( ${ClientID}, ${WebID}, ${IGBMID}, 2016, 2011, 'UR', ${Sex}, 1, null, ${Indkey} ) order by LabelKey DESC`;

const fetchData = async ({ filters }) => await sqlConnection.raw(contentDataQuery(filters));

const activeCustomToggles = ({ filterToggles }) => ({
  currentBenchmarkName: getActiveToggle(filterToggles, 'IGBMID'),
  currentIndustryName: getActiveToggle(filterToggles, 'Indkey'),
  currentGenderName: getActiveToggle(filterToggles, 'Sex'),
});

const headline = ({ data, contentData }) => {
  const { prefixedAreaName, currentBenchmarkName, currentIndustryName } = data;
  const PersonWithQualification = contentData.filter(
    ({ LabelKey }) => LabelKey != 999999 && LabelKey != 25009 && LabelKey != 25008,
  );
  const percentagePersonWithQualificationClient = formatPercent(_.sumBy(PersonWithQualification, 'PerYear1'));
  const percentagePersonWithQualificationBM = formatPercent(_.sumBy(PersonWithQualification, 'BMYear1'));

  return `${percentagePersonWithQualificationClient}% of the resident workers (${currentIndustryName}) in ${prefixedAreaName} have qualifications, compared to ${percentagePersonWithQualificationBM}% for ${currentBenchmarkName}.`;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `Resident workers - Qualifications`,
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
