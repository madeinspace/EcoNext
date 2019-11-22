const fetchClientData = async ({ clientAlias, containers }) => {
  const { ClientContainer, PageContainer } = containers;

  const { resources: clientData } = await ClientContainer.items
    .query(`SELECT * FROM c WHERE c.Alias = "${clientAlias}"`)
    .fetchAll();

  const { Alias, id, ShortName, LongName, Name, Pages, Applications, Areas } = clientData[0];

  const filteredAreas = Areas.filter(({ AppID }) => AppID === 4).map(area => ({ ...area, ID: area.WebID }));
  const filteredPages = Pages.filter(({ AppID }) => AppID === 4);

  const { resources: pages } = await PageContainer.items.query(`SELECT * FROM c WHERE c.ApplicationID = 4`).fetchAll();
  const allPages = pages.reduce((acc, cur) => ({ ...acc, [cur.Alias]: cur }), {});

  const clientPages = filteredPages.map(nav => ({
    ...nav,
    GroupName: allPages[nav.Alias]['GroupDetails']['Name'],
    MenuTitle: allPages[nav.Alias]['MenuTitle'],
    ParentPageID: allPages[nav.Alias]['ParentPageID'],
  }));

  return {
    Alias,
    ClientID: id,
    ShortName,
    LongName,
    Name,
    clientPages,
    clientProducts: Applications,
    clientAreas: filteredAreas,
  };
};

export default fetchClientData;
