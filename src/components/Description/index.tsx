import { PageIntroFullWidth } from '../../styles/MainContentStyles';
import useEntityText from '../../utils/useEntityText';

export default () => {
  const Text = useEntityText('Description');

  return <PageIntroFullWidth dangerouslySetInnerHTML={{ __html: Text }} />;
};
