// #region imports
import _ from 'lodash';
import { useContext } from 'react';
import { PageContext } from '../../../utils/context';
import FullContent from './Full';
// #endregion

// #region template page
const OutlookOverviewPage = () => {
  const {
    contentData: { headlineData, topThreeData },
  } = useContext(PageContext);
  return <FullContent />;
};
export default OutlookOverviewPage;
// #endregion
