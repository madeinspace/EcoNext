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

      const paramList = (Params || []).reduce((acc, cur) => {
        const defaultParams = filters[Object.keys(cur)[0]] || Object.values(cur)[0];
        return [...acc, defaultParams];
      }, []);

      const connectionString = `exec ${Database}.[dbo].${StoredProcedure} ${paramList
        .join(', ')
        .replace(/(, $)/g, '')}`;

      const listData = await sqlConnection.raw(connectionString);

      const list = listData.map(({ Label, Value, ParentValue, HasInfo }) => ({ Label, Value, ParentValue, HasInfo }));

      /**
       * Sometime it happens that the query string provided has the wrong param value either because
       * the user has changed the client name, or page alias in the URL without removing the query string
       * or because the query string is being ported from page to page.
       * For example monash/population?WebID=20 has no toggle that can provide data with
       * that WebID, therefore we need to check here if the provided param value in the filters matches one of the
       * 'authorised' params in the paramList returned by the stored proc and set the default if it doesn't match.
       */
      const isMatch = list.filter(vendor => vendor.Value === filters[ParamName]);
      const value = isMatch.length > 0 ? filters[ParamName] : DefaultValue;

      return {
        active: list.find(({ Value }) => Value === value),
        default: list.find(({ Value }) => Value === DefaultValue),
        key: ParamName,
        hidden: Hidden || false,
        list,
        title: Label,
        value,
      };
    }),
  );

  return completeToggles;
};

export default fetchToggleOptions;
