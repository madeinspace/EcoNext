// #region imports
import _ from 'lodash';
import { useContext } from 'react';
import { ClientContext } from '../../../utils/context';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import FullContent from './Full';
import LiteContent from './Lite';
// #endregion

// #region template page
const TemplatePage = () => {
  const { isLite } = useContext(ClientContext);
  return (
    <>
      {!isLite && <ControlPanel />}
      {!isLite ? <FullContent /> : <LiteContent />}
    </>
  );
};
export default TemplatePage;
// #endregion
