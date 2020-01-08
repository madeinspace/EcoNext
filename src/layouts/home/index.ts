import { sqlConnection } from '../../utils/sql';
import Page from './page';

const DATABASE = 'WebProfile';

const tableDataQuery = filters =>
  `select * from [CommClient].[dbo].[ClientEconomyBoxes] where ClientID = ${filters.ClientID} and WebID = 10 order by WebID`;

const newDataQuery = () => `exec ${DATABASE}.[dbo].[spGetNewsByApplicationID] 4`;

const fetchData = async ({ filters }) => {
  const tableData = await sqlConnection.raw(tableDataQuery(filters));
  const newsData = await sqlConnection.raw(newDataQuery());

  return { tableData, newsData };
};

const pageContent = {
  entities: [
    {
      Title: 'Description',
      renderString: ({ data, contentData }): string => {
        console.log('contentData: ', contentData);
        const prefix = data.HasPrefix ? 'The ' : '';
        const areaName = `${prefix}${data.currentAreaName}`;
        return `<p>${areaName}'s economic profile presents economic information that enables you to describe the area's role within the broader economy, explore options for economic development and promote the area's strengths. The information presented here is derived from official sources of information (Australian Bureau of Statistics) as well as Australia's leading economic modellers <a href='http://www.nieir.com.au/' target='_blank' rel='noopener'>(NIEIR)</a>. The latest data from each series is always presented in this site. <br /><br />Economy.id industry structure and industry sector profiles use a National Accounts regional econometric model developed by National Economics <a href='http://www.nieir.com.au/' target='_blank' rel='noopener'>(NIEIR)</a>.</p>`;
      },
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string => {
        const prefix = data.HasPrefix ? 'The ' : '';
        const areaName = data.currentAreaName;

        return `${prefix}${areaName}'s Gross Regional Product is estimated at [GRP here], which represents [percentage here] of the state's GSP (Gross State Product).`;
      },
      StoredProcedure: 'sp_Condition_IsLiteClient',
      Params: [
        {
          ClientID: '0',
        },
      ],
      Value: '177',
    },
  ], // copy this from the relevant key in 'data/content.ts'
  filterToggles: [], // copy this from the relevant key in 'data/filterToggles.ts'
};

export { fetchData, Page, pageContent };
