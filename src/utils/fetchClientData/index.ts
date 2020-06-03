import { sqlConnection } from '../../utils/sql';
import fetchSitemap from '../fetchSitemap';
import getConfig from 'next/config';

const DATABASE = 'CommApp';
const LITE_CLIENT = 178;

const checkIfLite = async (clientID): Promise<boolean> => {
  const connectionString = `exec ${DATABASE}.[dbo].[sp_Condition_IsLiteClient] ${clientID}`;

  const data = await sqlConnection.raw(connectionString);

  const { Result } = data[0];

  return +Result === LITE_CLIENT;
};

const checkIfLitePlus = id => {
  const {
    publicRuntimeConfig: { LitePlusClients },
  } = getConfig();
  return LitePlusClients.split(' ')
    .map(x => +x)
    .some(x => +id === x);
};

const queryClientDB = async ({ clientAlias, containers }): Promise<{}> => {
  const { ClientContainer, AllPages } = containers;

  const { resources: clientData } = await ClientContainer.items
    .query(`SELECT * FROM c WHERE c.Alias = "${clientAlias}"`)
    .fetchAll();

  if (clientData.length === 0) {
    return null;
  }

  const { Alias, Applications, Areas, id, ShortName, LongName, Name, Pages, HasPrefix } = clientData[0];

  if (Pages === undefined) {
    return null;
  }
  const allPagesArray = Object.keys(AllPages).map(key => AllPages[key]);
  const filteredAreas = Areas.filter(({ AppID }) => AppID === 4).map(area => ({ ...area, ID: area.WebID }));
  const filteredPages = Pages.filter(({ AppID }) => AppID === 4);

  const clientPages = filteredPages.map(page => {
    const IsParent = allPagesArray.some(item => item.ParentPageID === page.PageID);
    return {
      ...page,
      GroupName: AllPages[page.Alias]['GroupDetails']['Name'],
      MenuTitle: AllPages[page.Alias]['MenuTitle'],
      MetaTitle: AllPages[page.Alias]['MetaTitle'],
      MetaDescription: AllPages[page.Alias]['MetaDescription'],
      MetaKeywords: AllPages[page.Alias]['MetaKeywords'],
      ParentPageID: AllPages[page.Alias]['ParentPageID'],
      RelatedPages: AllPages[page.Alias]['RelatedPages'],
      IsParent,
    };
  });

  const CovidPageData = {
    Alias: 'covid19',
    AppID: 4,
    Disabled: false,
    Draft: false,
    New: true,
    GroupName: 'Economic tools',
    IsParent: false,
    MenuTitle: 'Covid19 economic outlook',
    MetaDescription: 'Covid19 economic outlook',
    MetaKeywords: 'covid19 impact',
    MetaTitle: 'Covid19 economic outlook | [A] | economy.id',
    PageID: 99999,
    ParentPageID: 0,
    Secure: false,
  };
  // #region covid19 page
  // this is not how it should be but given the circumpstance and pressure to release
  // we'll do it that way until we do it the proper way, this should be added as an official page in the cosmos container
  const ind = clientPages.findIndex(({ Alias }) => Alias === 'economic-impact-assesment');
  clientPages.splice(ind, 0, CovidPageData);

  const isLite = await checkIfLite(id);
  const isLitePlus = checkIfLitePlus(id);
  const cdnBaseUrl = process.env.CDN_ENDPOINT || 'https://econext-cdn.azureedge.net';
  const logoUrl = `${cdnBaseUrl}/eco-assets/client-logos/${clientAlias}.png`;

  return {
    clientAlias: Alias,
    ClientID: id,
    ShortName,
    LongName,
    Name,
    isLite,
    isLitePlus,
    HasPrefix,
    clientPages,
    clientProducts: Applications,
    clientAreas: filteredAreas,
    clientLogo: logoUrl,
  };
};

const fetchClientData = async ({ clientAlias, containers }): Promise<{}> => {
  const clientData: any = await queryClientDB({
    clientAlias,
    containers,
  });

  if (clientData === null) return null;

  const { ClientID } = clientData;

  const sitemapGroups = await fetchSitemap();

  return {
    ID: ClientID,
    sitemapGroups,
    ...clientData,
  };
};

export default fetchClientData;
