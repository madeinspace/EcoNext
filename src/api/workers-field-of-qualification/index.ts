/* #region imports*/
import _ from 'lodash';
import { sqlConnection } from '../../utils/sql';
import fetchClientData from '../../utils/fetchClientData';
import fetchIndustries from '../../utils/fetchIndustries';
import fetchNavigation from '../../utils/fetchNavigation';
import fetchBenchmarkAreas from '../../utils/fetchBenchmarkAreas';
import fetchSitemap from '../../utils/fetchSitemap';
/* #endregion */

const fetchData = async ({ containers, ...filters }) => {
  const { clientAlias, Indkey, IGBMID, Sex, WebID } = filters;

  const client = await fetchClientData({ clientAlias, containers });
  const { ClientID, Pages, Applications, Areas } = client;

  const navigation = await fetchNavigation({ containers, Pages });
  const Industries = await fetchIndustries(IGBMID);
  const IGBM = await fetchBenchmarkAreas(ClientID);
  const sitemapGroups = await fetchSitemap();

  const Sexes = [
    { ID: 1, Name: 'Males' },
    { ID: 2, Name: 'Females' },
    { ID: 3, Name: 'Persons' },
  ];

  const tableData = await sqlConnection.raw(
    tableDataQuery({
      ClientID,
      IGBMID,
      Indkey,
      Sex,
      WebID,
    }),
  );

  return {
    title: 'Workers fields of qualification',
    client,
    tableData,
    Industries,
    IGBM,
    Sexes,
    navigation,
    clientProducts: Applications,
    sitemapGroups,
    filters,
    Areas,
  };
};

export default fetchData;

/* #region  tableDataQuery */
const tableDataQuery = ({ ClientID, IGBMID, Sex, Indkey, WebID }) =>
  `select * from CommData_Economy.[dbo].[fn_Industry_StudyField1and3Digit_Sex](
    ${ClientID},
    ${WebID},
    ${IGBMID},
    2016,
    2011,
    'WP',
    ${Sex},
    1,
    null,
    ${Indkey}
    ) order by LabelKey
  `;
/* #endregion */
