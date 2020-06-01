import { LinkBuilder } from "../../../components/ui/links"
import getConfig from 'next/config';
import { TopList, Lead } from "../../../styles/MainContentStyles";
import { SectionTitle } from "./Styles";
import { useContext } from "react";
import { PageContext } from "../../../utils/context";
const { publicRuntimeConfig } = getConfig();
const paperUrl = `${publicRuntimeConfig.EcoCDNEndPoint}/eco-assets/documents/covid19/Methodological paper - COVID19 first release assumptions.docx`;
const Disclaimers = () => {
    const {
        entityData: {  prefixedAreaName },
      } = useContext(PageContext);
    return <><SectionTitle>Data updates</SectionTitle>
    <p>
      This page is the latest version of up-to-date economic data showing the local impact of COVID-19. However, as
      new information becomes available, e.g. changes to government stimulus, shifts in quarantine conditions, or the
      release of relevant date etc. revisions and updates will be applied, and new data will be added where possible.{' '}
    </p>
    <p>New features to be published soon, include;</p>
    <TopList>
      <li>jobs detail by industry</li>
      <li>employed resident data</li>
      <li>interactive charts and export functionality</li>
      <li>detailed analysis of Stimulus & Recovery Phase</li>
      <li>Benchmarks so you can compare your impacts to other regions</li>
    </TopList>
    <SectionTitle>Assumptions and methodology</SectionTitle>
    <p>
      NIEIR has estimated the potential impacts of coronavirus on economic activity, employment and sectors at the LGA
      level. Model outputs above are based on information available before May 7.
    </p>
    <p>
      The forecast model estimates the impact on final demand on each industry and then calculates the multiplier
      effects using NIEIR’s regional database. Assumptions are made about the household, business and government
      supression rates directly flowing from the measures introduced to contain the virus. The impact of economic
      measures is also incorporated into the modelling. A contingency factor is also assumed to account for downside
      risks (e.g. productivity impacts from working at home).{' '}
    </p>
    <p>
      The modelling assumes that rigid social distancing measures are maintained well into June. A gradual unwinding
      of social distancing measures are assumed but a more complete recovery only becomes possible when a vaccine
      becomes generally available by the March or June quarter 2021.
    </p>
    <p>
      These forecasts are subject to a high degree of uncertainty and will continue to be improved and updated as more
      information is released.{' '}
    </p>
    <p>
      For more details, see{' '}
      {LinkBuilder(
        `${paperUrl}`,
        `Methodological Paper: Modelling the impact of COVID-19 at the Australian Local Government Area (LGA) level`,
      )}
    </p>
    <SectionTitle id="revs">Revisions</SectionTitle>
    <Lead>Version 1.1 Revisions - model updated on 6 May 2020</Lead>
    <p>
      For the June Quarter 2020, NIEIR’s Australia GDP estimate has been revised from -16.6% to -12.4%. Compared to
      NIEIR’s previous forecast (based on information available mid-April 2020), the better than expected containment
      of the virus has impacted assumptions related to household spending and social distancing impacts. This has
      resulted in lower impacts across a numbe of sectors. For example, impacts on Education have not been as high
      (e.g. restrictions on schools not as severe as first thought).
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
}

export default Disclaimers