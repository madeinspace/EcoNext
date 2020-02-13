import { sqlConnection } from '../../utils/sql';

const without = (str, exclude) => {
  return str === exclude ? '' : str;
};

const largest = (arr, key) => {
  return arr
    .filter(a => a.LabelKey < 96000)
    .sort((a, b) => {
      return b[key] - a[key];
    })[0];
};

import Page from './page';
import getActiveToggle from '../../utils/getActiveToggle';

const fetchData = async ({ filters }) => {
  const contentData = await sqlConnection.raw(contentDataQuery(filters));

  return contentData;
};

const activeCustomToggles = ({ filterToggles }) => {
  const activeCustomToggles = {
    activeBenchmarkName: getActiveToggle(filterToggles, 'BMID'),
    currentIndustryName: getActiveToggle(filterToggles, 'Indkey'),
    currentGenderName: getActiveToggle(filterToggles, 'Sex'),
  };
  return activeCustomToggles;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: ({ data }): string => `Industry Key stats`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string => {
        const genderLookup = {
          Persons: 'resident',
          Males: 'male resident',
          Females: 'female resident',
        };
        const prefix = data.HasPrefix ? 'the ' : '';
        const areaName = `${prefix}${data.currentAreaName}`;
        const mostCommonQual = largest(contentData, 'NoYear1').LabelName;
        const headlineAlt = `  ${mostCommonQual} is the most common qualification for ${
          genderLookup[data.currentGenderName]
        } workers in ${areaName}.`;

        return headlineAlt;
      },
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

/* #region  contentDataQuery */
const contentDataQuery = ({ ClientID, IGBMID, Sex, Indkey, WebID }) =>
  `select * from CommData_Economy.[dbo].[fn_Industry_StudyField1and3Digit_Sex](
    ${ClientID},
    ${WebID},
    ${IGBMID},
    2016,
    2011,
    'UR',
    ${Sex},
    1,
    null,
    ${Indkey}
    ) order by LabelKey DESC
  `;
/* #endregion */
