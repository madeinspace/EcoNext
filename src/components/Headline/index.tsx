import { Headline as StyledHeadline } from '../../styles/MainContentStyles';
import useEntityText from '../../utils/useEntityText';

export default () => useEntityText('Headline') && <StyledHeadline>{useEntityText('Headline')}</StyledHeadline>;
