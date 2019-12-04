import { sqlConnection } from '../../utils/sql';

export const globalToggles = [
  {
    Database: 'CommApp',
    DefaultValue: '40',
    Label: 'Current benchmark:',
    Params: [
      {
        ClientID: '9',
      },
    ],
    StoredProcedure: 'sp_Toggle_Econ_Area_BM',
    ParamName: 'BMID',
    Hidden: true,
  },
];

const fetchToggleOptions = async (filters, filterToggles) => {
  const completeToggles = await Promise.all(
    filterToggles.map(async ({ Database, Params, StoredProcedure, ParamName, Label, DefaultValue, Hidden }) => {
      if (!StoredProcedure) return {};

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
        hidden: Hidden,
        list,
        title: Label,
        value,
      };
    }),
  );

  return completeToggles;
};

export default fetchToggleOptions;
