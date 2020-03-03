import { LinkBuilder } from '../../../components/ui/links';
import { useContext } from 'react';
import { PageContext, ClientContext } from '../../../utils/context';
import { SubTitleAlt } from '../../../styles/MainContentStyles';

const AboutEconomyId = () => {
  const { LongName } = useContext(ClientContext);
  const {
    entityData: { prefixedAreaName },
  } = useContext(PageContext);
  return (
    <>
      <p>
        {LongName} Economic Profile provides economic analysis for {prefixedAreaName} by combining 11 different datasets
        to build a cohesive story of a local economy,how it is changing and how it compares to other areas.
      </p>
      <p>
        It is a public resource designed to be used by council staff, community groups, investors, business people,
        students and the general public. You can be confident about the quality of the information as it is derived from
        official sources and the most robust economic modelling, analysed and presented by experts and funded by{' '}
        {prefixedAreaName}. Each data source is maintained with the latest series so you can be sure you are using the
        most up to date information.
      </p>
      <p>
        Results for {prefixedAreaName} include Gross Regional Product, local jobs, local businesses, employment,
        unemployment, population, building approvals, industry structure, journey to work and much more.
      </p>
      <SubTitleAlt>About National Economics (NIEIR)</SubTitleAlt>
      <p>
        Reliable primary economic data sets exist only at the national, state and regional level at best. The only way
        to get a realistic measure of GRP, number of jobs and other economic indicators at the local area level is to
        undertake economic modelling. The most significant challenge with local area economic modelling is to ensure
        that the process reflects the unique economic characteristics of the local area. For example, one of the traps
        is to apply national and state-level productivity propensities at the local level, which we now know are simply
        not accurate because it assumes that the economic characteristics of all local areas are the same.
      </p>
      <p>
        NIEIR are recognised as industry leaders in the development and provision of robust economic modelling at the
        smallest credible geographic unit (Local Government Area). NIEIR modelling draws on many data sources to offer
        the most nuanced data possible at the local level. The NIEIR dataset is the result of a process of economic
        micro-simulation modelling – it is an amalgam of many different existing data sources (between 6 and 10
        depending on the region and time period) which are synthesised to produce a series of estimates of the size and
        value of the local economy.
      </p>
      <p>
        Importantly, the NIEIR model is updated on an annual basis (with quarterly breakdown for some characteristics).
        This means the impact of global, national and local economic changes can be clearly seen at the local level.
      </p>
      <p>
        For over 15 years NIEIR have been producing the annual benchmark State of the Regions Report commissioned by the
        Australian Local Government Association (ALGA). These reports benchmark regional economies and identifies
        strategies that strengthen local and regional economic and employment outcomes, laying the framework for future
        policy direction and emphasizing the role and importance of local government.
      </p>
      {LinkBuilder('http://www.nieir.com.au/', 'Learn more about NIEIR')}

      <SubTitleAlt>About .id, the population experts</SubTitleAlt>
      <p>
        .id is a company of population experts - demographers, spatial analysts, urban planners, forecasters, census
        data and IT experts who build demographic information products for Australia & New Zealand.
      </p>
      <p>
        We understand how cities, towns and regions are growing and changing. Name a place and we can tell you about its
        population’s past, present and future!
      </p>
      <p>We use spatial data to tell this story in powerful web applications.</p>
      <p>
        We share this knowledge with our clients so they can make confident decisions about when and where to provide
        services and invest in infrastructure.
      </p>
      <p>
        Our clients are organisations who contribute to building our cities and communities. They include local & state
        government, education providers, housing developers, retailers, health care providers, utilities companies,
        banks & insurers, sporting clubs and planning consultants.
      </p>
      <p>
        During our 15 years in business, we have built over 550 websites delivering analytical and spatial decision
        making information to more than 300 clients Australia-wide and in New Zealand. These sites are publicly
        available in{' '}
        {LinkBuilder('http://home.id.com.au/id-community/public-resources', '.id’s demographic resource centre')}
      </p>
      <p>
        Our information products meet the challenge of delivering meaningful information to users with diverse
        information needs and skill levels – from analysts to the general public – by organising and presenting complex
        data in an intuitive format. As consumers of spatial data ourselves, we fundamentally understand how users want
        to consume that data.
      </p>
      <p>
        We believe that by making demographic information accessible to the broadest possible audience, and promoting
        evidence-based decision making, we are contributing to a fairer and more sustainable society.
      </p>
      {LinkBuilder('http://home.id.com.au/', 'Learn more about .id')}
    </>
  );
};

export default AboutEconomyId;
