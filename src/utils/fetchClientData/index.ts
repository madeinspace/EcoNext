import fetchSitemap from '../fetchSitemap';

const queryClientDB = async ({ clientAlias, containers }) => {
  const { ClientContainer, AllPages } = containers;

  const { resources: clientData } = await ClientContainer.items
    .query(`SELECT * FROM c WHERE c.Alias = "${clientAlias}"`)
    .fetchAll();

  const { Alias, Applications, Areas, id, ShortName, LongName, Name, Pages } = clientData[0];

  const filteredAreas = Areas.filter(({ AppID }) => AppID === 4).map(area => ({ ...area, ID: area.WebID }));
  const filteredPages = Pages.filter(({ AppID }) => AppID === 4);

  const clientPages = filteredPages.map(nav => ({
    ...nav,
    GroupName: AllPages[nav.Alias]['GroupDetails']['Name'],
    MenuTitle: AllPages[nav.Alias]['MenuTitle'],
    ParentPageID: AllPages[nav.Alias]['ParentPageID'],
  }));

  return {
    clientAlias: Alias,
    ClientID: id,
    ShortName,
    LongName,
    Name,
    clientPages,
    clientProducts: Applications,
    clientAreas: filteredAreas,
  };
};

const fetchClientData = async ({ clientAlias, containers }) => {
  const clientData: any = await queryClientDB({
    clientAlias,
    containers,
  });

  const { ClientID } = clientData;

  const sitemapGroups = await fetchSitemap();

  return {
    ID: ClientID,
    sitemapGroups,
    ...clientData,
  };
};

export default fetchClientData;
