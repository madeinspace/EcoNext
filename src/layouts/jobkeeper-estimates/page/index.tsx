// #region imports
import React, { useContext } from 'react';
import _ from 'lodash';
import { ClientContext, PageContext } from '../../../utils/context';
import { _SubTitle, PageIntroFullWidth, SubTitleAlt2, ItemWrapper } from '../../../styles/MainContentStyles';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import Disclaimers from './Disclaimers';
import { LinkBuilder } from '../../../components/ui/links';
import OutputChart from './charts/JobKeeperEstimatesChart';
// #endregion

// #region template page
const JobKeeperPage = () => {
  const { clientAlias } = useContext(ClientContext);
  const {
    entityData: { currentVulnerability, currentQuarter },
  } = useContext(PageContext);

  return (
    <>
      <PageIntroFullWidth>
        <p>
          The COVID 19 pandemic and policy responses enacted to limit its spread have generated uncertainty about the
          future of local economies. This uncertainty has created difficulties in planning economic development
          responses at a local government level. In response, .id has developed a COVID-19 Economic Forecast Tool that
          estimates likely quarterly economic and industry impacts out to June 2022.
        </p>
        <p>
          The COVID-19 JobKeeper estimates shows the quarterly estimates of local jobs and employed resident workers
          supported by the JobKeeper scheme. Charts in this page show the quarterly number of workers on JobKeeper,
          proportion of worker on JobKeeper (compared to total workers in the region) for the Local Jobs and Employed
          Residents of industry, based on the 87 industry subsectors and 19 main industry divisions in the ANZSIC
          classification.
        </p>
        <p>
          This page should be viewed in conjunction with the{' '}
          {LinkBuilder(
            `https://economy.id.com.au/${clientAlias}/covid19-industry-focus`,
            ' COVID-19 Extended industry forecasts section',
          )}{' '}
          to see the estimated quarterly impact of COVID-19 at an industry level and{' '}
          {LinkBuilder(
            `https://economy.id.com.au/${clientAlias}/covid19-industry-focus`,
            ' COVID-19 Extended forecast section',
          )}{' '}
          to see the impact on the overall economy. To see the impact of COVID-19 on the resident labour force (those in
          work or looking for work and aged over 15) who are looking for work, refer to{' '}
          {LinkBuilder(`https://profile.id.com.au/${clientAlias}/unemployment`, 'Unemployment')} and{' '}
          {LinkBuilder(`https://profile.id.com.au/${clientAlias}/job-seeker`, 'JobSeeker')} section.
        </p>

        <p>This page is subject to the disclaimer and copyright notices as set out below.</p>
      </PageIntroFullWidth>

      <ControlPanel />

      <SubTitleAlt2>Local Jobs compensated by JobKeeper</SubTitleAlt2>
      <p>
        This indicator shows the estimated number of jobs compensated by JobKeeper in the Northern Beaches Council area
        by vulnerability and industry. Workers in industries with higher share of working zero hours are more
        vulnerability once the JobKeeper finishes.
      </p>
      <ItemWrapper>{<OutputChart measure={'LJ_JK'} />}</ItemWrapper>
      <SubTitleAlt2>Employed Resident Impacts</SubTitleAlt2>
      <p>
        Another way of looking at the impacts is to analyse the industry impact on local residents, that is employed
        residents who live in the region but may work elsewhere. This is important in understanding the impacts on
        council rates and local unemployment.
      </p>
      <ItemWrapper>{<OutputChart measure={'UR_JK'} />}</ItemWrapper>

      <Disclaimers />
    </>
  );
};
export default JobKeeperPage;
// #endregion
