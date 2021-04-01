// #region imports
import _ from 'lodash';
import React, { useContext } from 'react';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import { LinkBuilder } from '../../../components/ui/links';
import { PageIntroFullWidth } from '../../../styles/MainContentStyles';
import { ClientContext } from '../../../utils/context';
import ActualChart from './charts/ActualChart';
import ChangeChart from './charts/ChangeChart';
import ChangePerChart from './charts/ChangePerChart';
import IndexChart from './charts/IndexChart';
// #endregion

// #region template page
const QuartleryEconomicIndicatorsPage = () => {
  const { clientAlias } = useContext(ClientContext);
  return (
    <>
      <PageIntroFullWidth>
        <p>
          The outbreak of the COVID-19 pandemic had a significant impact on the economy in FY2019/20, where the impacts
          are evident in the last quarter of the financial year. However, the annual economic information doesn’t show
          us a full picture as the impact of COVID-19 on June Quarter 2020 is averaged out by the previous three
          quarters in the financial year.
        </p>
        <p>
          In response, .id has developed this page to show quarterly estimates for GRP, Jobs and Employed Residents so
          that you can see the immediate impact of COVID-19 in the June Quarter 2020 and the economic dynamics before
          the COVID-19. This tool should be viewed in conjunction with{' '}
          {LinkBuilder(`https://economy.id.com.au/${clientAlias}/value-of-building-approvals`, 'building approvals')},{' '}
          {LinkBuilder(`https://economy.id.com.au/${clientAlias}/unemployment`, 'unemployment')} and{' '}
          {LinkBuilder(`https://profile.id.com.au/${clientAlias}/job-seeker`, 'JobSeeker')} section to understand the
          dynamic nature of the impact of COVID-19.
        </p>
      </PageIntroFullWidth>
      <ControlPanel />
      <ActualChart />
      <ChangeChart />
      <ChangePerChart />
      <IndexChart />
    </>
  );
};
export default QuartleryEconomicIndicatorsPage;
// #endregion
