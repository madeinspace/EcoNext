const fetchClientData = async ({ clientAlias, containers }) => {
  const { ClientContainer, AllPages } = containers;

  const { resources: clientData } = await ClientContainer.items
    .query(`SELECT * FROM c WHERE c.Alias = "${clientAlias}"`)
    .fetchAll();

  const { Alias, id, ShortName, LongName, Name, Pages, Applications, Areas } = clientData[0];

  const filteredAreas = Areas.filter(({ AppID }) => AppID === 4).map(area => ({ ...area, ID: area.WebID }));
  const filteredPages = Pages.filter(({ AppID }) => AppID === 4);

  const clientPages = filteredPages.map(nav => ({
    ...nav,
    GroupName: AllPages[nav.Alias]['GroupDetails']['Name'],
    MenuTitle: AllPages[nav.Alias]['MenuTitle'],
    ParentPageID: AllPages[nav.Alias]['ParentPageID'],
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
