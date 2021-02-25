import useEntityText from '../../../utils/useEntityText';
import InfoBox from '../infoBox';

export default () => useEntityText('Banner') && <InfoBox type="warning">{useEntityText('Banner')}</InfoBox>;
