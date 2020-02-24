import { sqlConnection } from '../../utils/sql';

const DATABASE = 'CommApp';

const filterEntities = async (filters, content, args) => {
  if (!content || content.length === 0) return undefined;

  return Promise.all(
    content.map(async ({ StoredProcedure, Params, Value, Title, renderString }) => {
      if (!StoredProcedure) return { Text: renderString({ ...args, filters }), Title };

      const paramList = (Params || []).reduce((acc, cur) => [...acc, filters[Object.keys(cur)[0]]], []);

      const connectionString = `exec ${DATABASE}.[dbo].${StoredProcedure} ${paramList
        .join(', ')
        .replace(/(, $)/g, '')}`;

      const data = await sqlConnection.raw(connectionString);

      const { Result } = data[0];

      return Result === Value ? { Text: renderString({ ...args, filters }), Title } : {};
    }),
  );
};

export default filterEntities;
