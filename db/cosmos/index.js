const { CosmosClient } = require('@azure/cosmos');

require('dotenv').config();

const cosmosClient = new CosmosClient({ endpoint: process.env.COSMOS_ENDPOINT, key: process.env.COSMOS_KEY });

const connect = async () => {
  const { database } = await cosmosClient.database('CommClient').read();

  const { container: ClientContainer } = await database.container('Clients').read();
  const { container: PageContainer } = await database.container('Pages').read();

  const { resources: pages } = await PageContainer.items.query(`SELECT * FROM c WHERE c.ApplicationID = 4`).fetchAll();

  const AllPages = pages.reduce(
    (acc, cur) => ({
      ...acc,
      [cur.Alias]: cur,
    }),
    {},
  );

  return { ClientContainer, AllPages };
};

module.exports = { connect };
