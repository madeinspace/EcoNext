// #region imports
import _ from 'lodash';
import { useContext } from 'react';
import { ClientContext, PageContext } from '../../../utils/context';
// #endregion

// #region template page
const CovidExtendedForecastsPage = () => {
  const { isLite } = useContext(ClientContext);
  const {
    contentData: { extendedData },
  } = useContext(PageContext);
  console.log('extendedData: ', extendedData);
  return <>extended forecast here</>;
};
export default CovidExtendedForecastsPage;
// #endregion
