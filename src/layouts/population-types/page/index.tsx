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
    </>
  );
};

export default PopulationTypesPage;
