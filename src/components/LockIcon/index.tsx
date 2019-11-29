import { Secured, Unsecured } from '../../styles/ui';
import { useContext } from 'react';
import { PageContext } from '../../utils/context';

const LockIcon = () => {
  const { pageData } = useContext(PageContext);

  const isSecure = (pageData || {}).IsSecure;

  return isSecure ? <Secured /> : <Unsecured />;
};

export default LockIcon;
