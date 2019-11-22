const fetchNavigation = async ({ containers, Pages }) => {
  const { PageContainer } = containers;
  const { resources: pages } = await PageContainer.items.query(`SELECT * FROM c WHERE c.ApplicationID = 4`).fetchAll();
  const normalisedPages = pages.reduce((acc, currentPage) => ({ ...acc, [currentPage.PageID]: currentPage }), {});
  const navigation = Pages.filter(({ AppID }) => AppID === 4);

  return navigation.map(nav => ({
    ...nav,
    GroupName: normalisedPages[nav.PageID]['GroupDetails']['Name'],
    MenuTitle: normalisedPages[nav.PageID]['MenuTitle'],
    ParentPageID: normalisedPages[nav.PageID]['ParentPageID'],
  }));
};

export default fetchNavigation;
