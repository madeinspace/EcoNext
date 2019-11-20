const { CosmosClient } = require('@azure/cosmos');

require('dotenv').config();

const cosmosClient = new CosmosClient({ endpoint: process.env.COSMOS_ENDPOINT, key: process.env.COSMOS_KEY });

const connect = async () => {
  const { database } = await cosmosClient.database('CommClient').read();

  const { container: ClientContainer } = await database.container('Clients').read();
  const { container: EntityContainer } = await database.container('Entities').read();
  const { container: PageContainer } = await database.container('Pages').read();
  const { container: TableContainer } = await database.container('Tables').read();

  return { ClientContainer, EntityContainer, PageContainer, TableContainer };
};

module.exports = { connect };
