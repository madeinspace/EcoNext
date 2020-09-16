import { LinkBuilder } from '../../../components/ui/links';
import getConfig from 'next/config';
import { TopList, Lead, TopOrderedList } from '../../../styles/MainContentStyles';
import { SectionTitle } from './Styles';
import React, { useContext } from 'react';
import { PageContext } from '../../../utils/context';
const { publicRuntimeConfig } = getConfig();
const paperUrl = `${publicRuntimeConfig.EcoCDNEndPoint}/eco-assets/documents/covid19/Methodological paper - COVID19 first release assumptions.docx`;
const paper2Url = `${publicRuntimeConfig.EcoCDNEndPoint}/eco-assets/documents/covid19/PJB1256-ID-Notes on LGA projections-September 2020.docx`;
const Disclaimers = () => {
  const {
    entityData: { prefixedAreaName },
  } = useContext(PageContext);
  return (
    <>
      <SectionTitle>Assumptions and methodology</SectionTitle>
      <p>
        NIEIR has estimated the potential impacts of coronavirus on economic activity, employment and sectors at the LGA
        level. Model outputs above are based on information available before September 9.
      </p>
      <p>
        The forecast model estimates the impact on final demand on each industry and then calculates the multiplier
        effects using NIEIR’s regional database. Assumptions are made about the household, business and government
        supression rates directly flowing from the measures introduced to contain the virus. The impact of economic
        measures is also incorporated into the modelling. A contingency factor is also assumed to account for downside
        risks (e.g. productivity impacts from working at home).{' '}
      </p>
      <p>
        For more details, see{' '}
        {LinkBuilder(
          `${paperUrl}`,
          `Methodological Paper: Modelling the impact of COVID-19 at the Australian Local Government Area (LGA) level`,
        )}
      </p>
      <SectionTitle id="revs">Revisions</SectionTitle>
      <Lead>Notes on LGA projections – September 2020</Lead>
      <p>
        This note applies to the updated LGA projections issued in September 2020. The initial June quarter 2020
        projection prepared in early April 2020 included a 12 per cent decline in national GDP. This has now been
        revised upward to 7.5%. The main reason for the difference was:
      </p>
      <TopOrderedList>
        <li>earlier easing of restrictions over June than what was assumed; and</li>
        <li>
          a higher increase in household savings because of an assumed 50 per cent fall in other discretionary household
          expenditures.
        </li>
      </TopOrderedList>
      <p>
        That is, it was assumed that settings close to Stage Four restrictions would apply to the general retail sector
        even if not made mandatory because high infection levels will produce the same result. It would appear that
        Australia’s success in controlling initial infection rates saved between 3 and 5 per cent of GDP. This is
        consistent with international evidence. More information on the update can be found{' '}
        {LinkBuilder(`${paper2Url}`, `here`)}.
      </p>
      <SectionTitle>Disclaimer</SectionTitle>
      <p>
        This report has been prepared for {prefixedAreaName}. .id has taken all due care in the preparation of this
        report. Content in this Report is based on Data from the National Institute of Economic and Industry Research
        (NIEIR) and the Data remains the property of the NIEIR. While NIEIR endeavours to provide reliable forecasts and
        believes the material is accurate it will not be liable for any claim by any party acting on such information.
        .id accepts no liability with respect to the correctness, accuracy, currency, completeness, relevance or
        otherwise of this Data. Please view our Privacy Policy, Terms of use and Legal notices.
      </p>
      <SectionTitle>Copyright Notice</SectionTitle>
      <p>
        This Report and all material contained within it is subject to Australian copyright law. Copyright in all such
        material [excluding ABS Data & other data or information where ownership by a third party is evident] is owned
        by .ID Consulting Pty Ltd ACN 084 054 473. Other than in accordance with the Copyright Act 1968 or as
        specifically agreed between .id and the Client, no material from this Report may, in any form or by any means,
        be reproduced, stored in a retrieval system or transmitted, without prior written permission from .id. Any
        enquiries regarding the use of this Report should be directed to{' '}
        <a href="mailto:info@id.com.au">info@id.com.au</a> or 03 9417 2205.
      </p>
    </>
  );
};

export default Disclaimers;
