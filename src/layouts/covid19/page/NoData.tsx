import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import { PageIntroFullWidth } from '../../../styles/MainContentStyles';

export default () => {
  return (
    <>
      <ControlPanel />
      <PageIntroFullWidth>
        <h1>Economic forecasts are based on LGAs and are not available for this geography.</h1>
      </PageIntroFullWidth>
    </>
  );
};
