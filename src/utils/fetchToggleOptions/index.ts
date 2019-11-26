import { sqlConnection } from '../../utils/sql';

const fetchToggleOptions = async (filters, toggles) => {
  const completeToggles = await Promise.all(
    toggles.map(async ({ Database, Params, StoredProcedure, ParamName, Label, DefaultValue }) => {
      if (!StoredProcedure) return undefined;

      const paramList = (Params || []).reduce((acc, cur) => [...acc, filters[Object.keys(cur)[0]]], []);

      const connectionString = `exec ${Database}.[dbo].${StoredProcedure} ${paramList
        .join(', ')
        .replace(/(, $)/g, '')}`;

      const listData = await sqlConnection.raw(connectionString);

      const list = listData.map(({ Label, Value }) => ({ Label, Value }));

      const value = filters[ParamName] || DefaultValue;

      return {
        active: list.find(({ Value }) => Value === value),
        key: ParamName,
        list,
        title: Label,
        value,
      };
    }),
  );

  return completeToggles;
};

export default fetchToggleOptions;
