const fetchNavigation = async ({ containers, Pages }) => {
  const { PageContainer } = containers;

  const { resources: pages } = await PageContainer.items.query(`SELECT * FROM c WHERE c.ApplicationID = 4`).fetchAll();

  const filteredPages = pages.reduce((acc, cur) => ({ ...acc, [cur.PageID]: cur }), {});

  const navigation = Pages.filter(({ AppID }) => AppID === 4);

  return navigation.map(nav => ({
    ...nav,
    GroupName: filteredPages[nav.PageID]['GroupDetails']['Name'],
    MenuTitle: filteredPages[nav.PageID]['MenuTitle'],
    ParentPageID: filteredPages[nav.PageID]['ParentPageID'],
  }));
};

export default fetchNavigation;
