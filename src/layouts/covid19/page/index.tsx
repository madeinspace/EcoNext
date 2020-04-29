// #region imports
import _ from 'lodash';
import { useContext } from 'react';
import { ClientContext } from '../../../utils/context';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import FullContent from './Full';
import LiteContent from './Lite';
// #endregion

// #region template page
const CovidPage = () => {
  const { isLite } = useContext(ClientContext);
  return <>{isLite ? <LiteContent /> : <FullContent />}</>;
};
export default CovidPage;
// #endregion
