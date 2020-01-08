// #region imports
import _ from 'lodash';
import { useContext } from 'react';
import { ClientContext } from '../../../utils/context';
// #endregion

// #region template page
const TemplatePage = () => {
  const { isLite } = useContext(ClientContext);
  return <>home {isLite ? 'lite' : 'full'}</>;
};
export default TemplatePage;
// #endregion
