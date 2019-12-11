import { sqlConnection } from '../../utils/sql';

import Page from './page';
import { formatNumber, formatMillionsCurrency } from '../../utils';

const fetchData = async ({ filters }) => {
  const { ClientID, WebID, BMID, IsLite } = filters;
  const SQLQuery = IsLite ? SQLLite({ ClientID, WebID, BMID: 40 }) : SQL({ ClientID, WebID, BMID });
  const tableData = await sqlConnection.raw(SQLQuery);

  return tableData;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `Gross product`,
    },
    {
      Title: 'Description',
      renderString: (): string =>
        '<p>The Gross Regional Product of an area is the equivalent of Gross Domestic Product, but for a smaller area. It is the amount of the nation’s wealth which is generated by businesses, organisations and individuals working in the area. This dataset is derived from the National Economics microsimulation model, and is a broad indicator of the growth or decline of the local economy over time. Data are presented for each year back to 2002.</p>',
      StoredProcedure: 'sp_Condition_IsLiteClient',
      Params: [
        {
          ClientID: '0',
        },
      ],
      Value: '177',
    },
    {
      Title: 'Description',
      renderString: (): string =>
        '<p>The Gross Regional Product of an area is the equivalent of Gross Domestic Product, but for a smaller area. It is the amount of the nation’s wealth which is generated by businesses, organisations and individuals working in the area. This dataset is derived from the National Economics microsimulation model, and is a broad indicator of the growth or decline of the local economy over time. Data are presented here for Census years and the latest year. The full version of economy.id includes a time series of Gross Product for all years back to 2002.</p>',
      StoredProcedure: 'sp_Condition_IsLiteClient',
      Params: [
        {
          ClientID: '0',
        },
      ],
      Value: '178',
    },
    {
      Title: 'Headline',
      renderString: ({ data, tableData }): string =>
        `${data.currentAreaName}\'s Gross Regional Product was ${formatMillionsCurrency(
          tableData[0].HeadLineGRP * 1000,
        )} as of the 30th June ${tableData[0].Year_End}.`,
      StoredProcedure: 'sp_Condition_IsLiteClient',
      Params: [
        {
          ClientID: '0',
        },
      ],
      Value: '177',
    },
    {
      Title: 'Headline',
      renderString: ({ data, tableData }): string =>
        `${data.currentAreaName}\'s Gross Regional Product was ${formatMillionsCurrency(
          tableData[0].ValWebID * 1000,
        )} as of the 30th June ${tableData[0].Yr}.`,
      StoredProcedure: 'sp_Condition_IsLiteClient',
      Params: [
        {
          ClientID: '0',
        },
      ],
      Value: '178',
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

export { fetchData, Page, pageContent };

const SQL = ({ ClientID, WebID, BMID }) => `
  select * from CommData_Economy.[dbo].[fn_HeadlineGRP_Full](${+ClientID},${+WebID},${+BMID}) ORDER BY Year_End DESC
`;

const SQLLite = ({ ClientID, WebID, BMID }) => `
  select * from CommData_Economy.[dbo].[fn_IN_HeadLineGRP](${+ClientID},${+WebID},${+BMID}) ORDER BY Yr DESC
`;
