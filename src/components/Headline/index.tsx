import { Headline as StyledHeadline } from '../../styles/MainContentStyles';
import useEntityText from '../../utils/useEntityText';

export default () => {
  const Text = useEntityText('Headline');

  return <StyledHeadline>{Text}</StyledHeadline>;
};
