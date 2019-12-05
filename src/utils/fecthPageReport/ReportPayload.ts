export default async ({ formatID, LongName, pageSubTitle }) => {
  const FileName = `Economy.id-${LongName}-${pageSubTitle}`;
  const Product = `Economy`;
  const Urls = [
    {
      Title: `${pageSubTitle}`,
      Url: window.location.href,
      Pdfoptions: [
        { PropertyName: 'VisibleElementIds', PropertyValue: 'main-content' },
        { PropertyName: 'InvisibleElementIds', PropertyValue: 'siblings-nav' },
        {
          PropertyName: 'UserStyleSheet',
          PropertyValue: `#content-wrapper{grid-template-columns:auto};#main-nav{grid-area:none; display:none};#main-content{grid-area:auto; margin 0 50px};.e-shad{box-shadow:none; border:1px solid lightgray}`,
        },
      ],
    },
  ];
  const Format = formatID;
  const EmailAddress = '';

  const payload = {
    FileName,
    Product,
    Urls,
    Format,
    EmailAddress,
  };

  return payload;
};
