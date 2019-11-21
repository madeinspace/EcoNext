import { sqlConnection } from '../../utils/sql';

/* #region  BenchMarkGeoQuery */
const BenchMarkGeoQuery = ClientID =>
  `
    SELECT
      WebID AS ID,
      GeoName AS Name
    FROM [CommClient].[dbo].[ClientToAreas_Economy]
    WHERE ClientID = ${ClientID}
    AND Benchmark = 1
    AND NOT WebID = 10
    ORDER BY WebID ASC
  `;
/* #endregion */

const fetchBenchmarkAreas = async ClientID => {
  const data = await sqlConnection.raw(BenchMarkGeoQuery(ClientID));

  return data;
};

export default fetchBenchmarkAreas;
