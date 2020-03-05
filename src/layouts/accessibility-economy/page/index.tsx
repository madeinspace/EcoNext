import { LinkBuilder } from '../../../components/ui/links';

const AccessibilityPage = () => {
  return (
    <>
      <p>
        .id is committed to making its websites accessible to the widest possible audience, and actively working to
        increase the accessibility and usability of our websites.
      </p>
      <p>
        .id aims to achieve the WCAG 2.0 Level A, Level AA and Level AAA standard of the World Wide Web Consortium (W3C){' '}
        {LinkBuilder('http://www.w3.org/TR/WCAG20/', ' Web Content Accessibility Guidelines 2.0.')}
      </p>
      <p>
        These guidelines explain how to make web content more accessible for people with disabilities. Comformance with
        these guidelines will help make the web more user friendly for all people.
      </p>
      <p>
        Most information available on our websites is also available in PDF (Portable Document Format), Microsoft Office
        Word and Excel formats. Visit the {LinkBuilder('http://get.adobe.com/reader/', 'Adobe website')}
        to download the free Adobe Reader and if you don't have a copy of Microsoft Office Word or Excel, free viewers
        of these document types can be downloaded from the{' '}
        {LinkBuilder('http://www.microsoft.com/en-us/download/details.aspx?id=4', 'Microsoft website')}. You may need to
        ask your IT department or internet service provider for assistance with this.
      </p>
      <p>
        Whilst .id strive to meet accepted guidelines and standards for accessibility and usability, we continually seek
        out solutions that will bring all areas of our websites up to the same level of overall web accessibility. In
        the meantime, if you require any information from this website in an alternative format, or having any issues
        accessing the content, please email us at <a href="mailto:info@id.com.au">info@id.com.au.</a>
      </p>
    </>
  );
};

export default AccessibilityPage;
