import { sqlConnection } from '../../utils/sql';

/* #region  BenchMarkIndustriesQuery */
const BenchMarkIndustriesQuery = IGBMID => `
  SELECT
    CAST(23000 AS INT) AS ID,
    'All industries' AS Name
  WHERE 23000 != ${IGBMID}
  UNION
  SELECT
    CAST(I.IndustryWebKey as INT) AS ID,
    I.IndustryWebName AS Name
  FROM CommData_Economy.dbo.vS_IndustryCodes AS I
  INNER JOIN CommData_Economy.dbo.vS_IndustryCodesParents AS IP
      ON I.Industrycode = IP.IndustryCode
  WHERE I.IndustryWebKey != ${IGBMID} AND (I.IndustryWebKey NOT IN(23020,23045))
    AND I.IndustryWebKey = IP.IndustryWebKey
`;
/* #endregion */

const fetchIndustries = async IGBMID => {
  const data = await sqlConnection.raw(BenchMarkIndustriesQuery(IGBMID));

  return data;
};

export default fetchIndustries;
