const fetchClientData = async ({ clientAlias, containers }) => {
  const { ClientContainer } = containers;

  const { resources: ClientResources } = await ClientContainer.items
    .query(`SELECT * FROM c WHERE c.Alias = "${clientAlias}"`)
    .fetchAll();

  const { Alias, id, ShortName, LongName, Name, Pages } = ClientResources[0];

  return {
    Alias,
    ClientID: id,
    ShortName,
    LongName,
    Name,
    Pages,
  };
};

export default fetchClientData;
