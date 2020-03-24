import { PageIntroFullWidth } from '../../styles/MainContentStyles';
import useEntityText from '../../utils/useEntityText';

export default () =>
  useEntityText('Description') && (
    <PageIntroFullWidth dangerouslySetInnerHTML={{ __html: useEntityText('Description') }} />
  );
