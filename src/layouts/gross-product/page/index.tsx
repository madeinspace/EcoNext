// #region imports
import _ from 'lodash';
import { ClientContext } from '../../../utils/context';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import { useContext } from 'react';
import LiteContent from './Lite';
import FullContent from './Full';

// #endregion

const GrossProductPage = () => {
  const { isLite } = useContext(ClientContext);
  return (
    <>
      {!isLite && <ControlPanel />}
      {!isLite ? <FullContent /> : <LiteContent />}
    </>
  );
};

export default GrossProductPage;
