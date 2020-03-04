import { LinkBuilder } from '../../../components/ui/links';
import { SubTitleAlt, Note } from '../../../styles/MainContentStyles';

const PopulationTypesPage = () => {
  return (
    <>
      <Note>
        <strong>Please note: </strong> All data in this Profile is sourced from the{' '}
        {LinkBuilder('http://www.abs.gov.au', 'Australian Bureau of Statistics')}, copyright in ABS data vests in the
        Commonwealth of Australia.
      </Note>
      <SubTitleAlt>Working population</SubTitleAlt>
      <p>
        The working population is the number of people who were counted in the Census, were employed in the week prior
        to Census, answered the question on their employer’s main workplace address, and this address could be coded by
        the ABS to a valid workplace address, resolved to the Statistical Local Area/Local Government Area level.
      </p>
      <p>
        The working population excludes a large segment of the population. In theory it excludes all people who are not
        currently employed, such as retirees, students, home duties and discouraged jobseekers. In practice, due to ABS
        coding methodologies, it also excludes those who didn’t answer the question on workplace location, those who had
        a mobile workplace location (no usual workplace address) and those whose workplace address was provided but
        couldn’t be accurately coded by the ABS (Place of Work undefined categories – usually available at the state
        level). These last 3 categories add up to around 15% of employed people nationwide, and so the working
        population from Census does undercount the true working population in an area.
      </p>
      <p>
        For this reason, .id recommends the use of the National Economics employment estimates for a more accurate
        picture of the number of workers by industry. Census working population figures are used on this site to enable
        analysis of the demographic characteristics of workers, their origins and destinations, and distribution within
        the LGA.
      </p>
      <p>
        For detailed information please refer to the{' '}
        {LinkBuilder(
          'http://www.abs.gov.au/websitedbs/censushome.nsf/home/factsheetspm?opendocument&navpos=450',
          ' ABS Fact Sheet on Population Measures',
        )}
        .
      </p>
      <SubTitleAlt>Local resident workers</SubTitleAlt>
      <p>
        The local resident workers includes all people in the labour force who are resident in the local area regardless
        of where they work (if working). The local resident worker population is an important resource for the local
        economy as it represents the locally available human resources upon which the economy can draw upon. However, it
        does not represent the total potential skill resource available to the local economy. This is because there are
        typically a significant number of people who are employed in the local economy who reside outside of the local
        area (the regional resident workers).
      </p>
      <SubTitleAlt>Regional resident workers</SubTitleAlt>
      <p>
        The regional resident worker population represents the pool of potential labour force skills available to the
        local area from the region (the resident worker region). The resident worker region is defined as surrounding
        areas for which the local area is a significant destination for its workers. More specifically, it includes any
        Statistical Local Area (sub-LGA areas) in which 4% or more of employed resident persons travel to the local area
        for work.
      </p>
      <p>
        The regional resident worker data represents all people in the resident worker region, regardless of where they
        work (if working). It shows what potential there is to draw on skills, knowledge and experience available within
        the region.
      </p>
      <SubTitleAlt>Usual residence population</SubTitleAlt>
      <p>
        Usual Residence population refers to the population that usually lives in LGA rather than the population that
        was counted there on Census night or those who work there. Each person completing the Census is required to
        state their address of usual residence and this information is used to derive the Usual Residence population. To
        be counted as the usual residence, a person has to have lived or intend to live in the dwelling for six months
        or more of the year.
      </p>
      <p>
        Usual residence counts are presented in economy.id in the labour force and skills available sections of the
        site. Like the working population, the usual residence population presented here is labour-force based, which
        excludes those not in the labour force (retirees, students, home duties, discouraged job seekers), but unlike
        the working population, the usual resident labour force also includes those who are unemployed and looking for
        work.
      </p>
      <p>
        For detailed information please refer to the{' '}
        {LinkBuilder(
          'http://www.abs.gov.au/websitedbs/censushome.nsf/home/factsheetspm?opendocument&navpos=450',
          ' ABS Fact Sheet on Population Measures',
        )}
        .
      </p>

      <SubTitleAlt>Estimated Resident Population</SubTitleAlt>
      <p>
        The Estimated Resident Population (ERP) is the official ABS estimate of the Australian population. The ERP is
        based on results of the Census and is compiled as at 30 June of each Census year. It is updated between Censuses
        - quarterly for state and national figures, and annually for local government areas and provides a population
        figure between Censuses.
      </p>
      <p>
        The ERP is based on the usual residence population and includes adjustments for Census undercount, Australian
        residents who were temporarily overseas on Census night, and backdates the population to 30 June. Each year's
        updates take into account births, deaths and both internal and overseas migration.
      </p>
      <p>
        The ERP is rebased after the results of the Census are released, with adjustments to the population counts made
        for the previous 5 years, back to the year after the previous Census. These adjustments take into account the
        population numbers of the most recent Census and improve the accuracy of the intercensal counts in hindsight.
        Any intercensal ERP is subject to this review after the Census results are released.
      </p>
      <p>ERPs can be found in the indicators section of the menu in the Economic Profile.</p>
      <p>
        For detailed information about ERPs please refer to the ABS publication{' '}
        {LinkBuilder(
          'http://www.abs.gov.au/ausstats/abs@.nsf/Products/D64FB3FAF0713644CA2575D2001AA207?opendocument',
          'Population Estimates: Concepts, Sources and Methods, 2009',
        )}
        .
      </p>
    </>
  );
};

export default PopulationTypesPage;
