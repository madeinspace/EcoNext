import { sqlConnection } from '../../utils/sql';
import { formatNumber } from '../../utils';
import getActiveToggle from '../../utils/getActiveToggle';

const PopulationDataSQL = ({ ClientID, WebID }) => `
  select * from CommData_Economy.[dbo].[fn_IN_ERPPivot](${+ClientID},${+WebID}, 40) ORDER BY Year DESC
`;

const fetchData = async ({ filters }) => {
  const { ClientID, WebID } = filters;
  const contentData = await sqlConnection.raw(PopulationDataSQL({ ClientID, WebID }));
  return contentData;
};

const activeCustomToggles = ({ filterToggles }) => {
  const activeCustomToggles = {
    defaultBenchmarkName: getActiveToggle(filterToggles, 'BMID'),
  };
  return activeCustomToggles;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `Population`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string => {
        const { prefixedAreaName } = data;
        const ERP = formatNumber(contentData[0].Number);
        const currentYear = contentData[0].Year;

        return `The Estimated Resident Population of ${prefixedAreaName} was ${ERP} as of the 30th June ${currentYear}.`;
      },
    },
    {
      Title: 'Description',
      renderString: ({ data }): string =>
        `<p>The Estimated Resident Population (ERP) is the official population of the area. It is updated annually by the Australian Bureau of Statistics, and reassessed every Census. The chart and table show last 10 years ERP for ${data.currentAreaName}, the state and Australia, with percentage comparisons. A growing population can indicate a growing economy, but this is not necessarily the case and depends on the residential role and function of the area.</p>`,
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
  ],
};

export { fetchData, activeCustomToggles, pageContent };
