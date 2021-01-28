// #region imports
import React, { useContext } from 'react';
import _ from 'lodash';
import { ClientContext } from '../../../utils/context';
import { _SubTitle, PageIntroFullWidth, SubTitleAlt2, ItemWrapper } from '../../../styles/MainContentStyles';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import Disclaimers from './Disclaimers';
import EconomicImpactChart from './charts/EconomicImpactChart';
import { LinkBuilder } from '../../../components/ui/links';
// #endregion

// #region template page
const FullContent = () => {
  const { clientAlias } = useContext(ClientContext);

  return (
    <>
      <PageIntroFullWidth>
        <p>
          COVID19 will obviously have a substantial negative impact on economic activity in 2020. In response, .id has
          developed a COVID-19 Outlook Tool to show the economic and industry impacts at the LGA level. This tool draws
          on the economic forecast model developed by NIEIR and focuses on the impacts to September 2020.
        </p>
        <p>
          This tool should be viewed in conjunction with{' '}
          {LinkBuilder(`https://economy.id.com.au/${clientAlias}/unemployment`, 'Unemployment')} and{' '}
          {LinkBuilder(`https://profile.id.com.au/${clientAlias}/job-seeker`, 'JobSeeker')} section to understand the
          impact of COVID-19 on the local labour force. To monitor the impact of COVID-19 on local businesses, see the
          Business Trends section.
        </p>
        <p>This page is subject to the disclaimer and copyright notices as set out below.</p>
      </PageIntroFullWidth>
      <ControlPanel />

      <SubTitleAlt2>Economic Impact</SubTitleAlt2>
      <p>
        The chart below presents the output and value added impacts of COVID-19 in the September Quarter 2020. Output
        refers to the total sales of each industry in the region. Value Added refers to the wages and salaries paid to
        workers in the region, the gross operating surplus and taxes. Value added impacts show how the different
        industries impact GRP in the region.
      </p>
      <ItemWrapper>
        <EconomicImpactChart />
      </ItemWrapper>

      <Disclaimers />
    </>
  );
};
export default FullContent;
// #endregion
