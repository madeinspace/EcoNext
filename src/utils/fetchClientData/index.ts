const fetchClientData = async ({ clientAlias, containers }) => {
  const { ClientContainer } = containers;

  const { resources: ClientResources } = await ClientContainer.items
    .query(`SELECT * FROM c WHERE c.Alias = "${clientAlias}"`)
    .fetchAll();

  const { Alias, id, ShortName, LongName, Name, Pages, Applications, Areas } = ClientResources[0];

  const filteredAreas = Areas.filter(({ AppID }) => AppID === 4).map(area => ({ ...area, ID: area.WebID }));

  return {
    Alias,
    ClientID: id,
    ShortName,
    LongName,
    Name,
    Pages,
    Applications,
    Areas: filteredAreas,
  };
};

export default fetchClientData;
