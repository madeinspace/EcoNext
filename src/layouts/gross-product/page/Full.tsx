import { PageContext } from '../../../utils/context';
import { useContext } from 'react';

const FullContent = () => {
  const { tableData, filterToggles } = useContext(PageContext);
  console.log('FullContent: ', tableData);
  return <div>Full content</div>;
};

export default FullContent;
