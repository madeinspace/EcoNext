const fetchNavigation = async ({ ClientID, containers }) => {
  const { ClientContainer, PageContainer } = containers;

  const { resources: ClientResources } = await ClientContainer.items
    .query(`SELECT * FROM c WHERE c.id = "${ClientID}"`)
    .fetchAll();

  const { resources: pages } = await PageContainer.items.query(`SELECT * FROM c WHERE c.ApplicationID = 4`).fetchAll();

  const filteredPages = pages.reduce((acc, cur) => ({ ...acc, [cur.PageID]: cur }), {});

  const navigation = ClientResources[0].Pages.filter(({ AppID }) => AppID === 4);

  return navigation.map(nav => ({
    ...nav,
    ClientID,
    GroupName: filteredPages[nav.PageID]['GroupDetails']['Name'],
    MenuTitle: filteredPages[nav.PageID]['MenuTitle'],
    ParentPageID: filteredPages[nav.PageID]['ParentPageID'],
  }));
};

export default fetchNavigation;
