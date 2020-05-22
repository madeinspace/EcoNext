// #region imports
import _ from 'lodash';
import { useContext } from 'react';
import { ClientContext, PageContext } from '../../../utils/context';
import FullContent from './Full';
import LiteContent from './Lite';
import NoData from './NoData';
// #endregion

// #region template page
const CovidPage = () => {
  const { isLite } = useContext(ClientContext);
  const {
    contentData: { headlineData, topThreeData },
  } = useContext(PageContext);
  const fullDataSet = !_.isEmpty(headlineData) && !_.isEmpty(topThreeData);
  if (!fullDataSet) return <NoData />;
  return <>{isLite ? <LiteContent /> : <FullContent />}</>;
};
export default CovidPage;
// #endregion
