import { useContext } from 'react';
import { PageContext } from '../context';

const payload = currentAreaName => {
  const { pageData } = useContext(PageContext);
  const { SubTitle: pageSubTitle } = pageData;
  return {
    FileName: `Economy.id-${currentAreaName}-${pageSubTitle}`,
    Product: 'economy',
    Urls: [
      {
        Title: `${pageSubTitle}`,
        Url: window.location.href,
        Pdfoptions: [
          { PropertyName: 'VisibleElementIds', PropertyValue: 'main-content' },
          { PropertyName: 'InvisibleElementIds', PropertyValue: 'siblings-nav' },
          {
            PropertyName: 'UserStyleSheet',
            PropertyValue: `
              #content-wrapper{grid-template-columns:auto}; 
              #main-nav{grid-area:none; display:none};
              #main-content{grid-area:auto; margin 0 50px};
              .e-shad{box-shadow:none; border:1px solid lightgray}`,
          },
        ],
      },
    ],
    Format: 0,
    EmailAddress: 'fabrice@id.com.au',
  };
};

export default () => {};
