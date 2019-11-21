import { sqlConnection } from '../../utils/sql';

/* #region  SitemapGroupsSQL */
const SitemapGroupsSQL = () => `
  SELECT TOP (1000) [ApplicationID]
    ,[GroupName]
    ,[SitemapName]
    ,[ColNumber]
    ,[SortOrder]
    ,[Pages]
  FROM [CommApp].[dbo].[SitemapInfo]
  where SitemapName like 'footer'
  and ApplicationID = 4
`;
/* #endregion */

const fetchSitemap = async () => {
  const data = await sqlConnection.raw(SitemapGroupsSQL());

  return data;
};

export default fetchSitemap;
