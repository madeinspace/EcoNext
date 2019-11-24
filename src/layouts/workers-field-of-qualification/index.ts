import { sqlConnection } from '../../utils/sql';

import Page from './page';

const fetchData = async filters => {
  const data = await sqlConnection.raw(tableDataQuery(filters));

  return data;
};

export { fetchData, Page };

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
