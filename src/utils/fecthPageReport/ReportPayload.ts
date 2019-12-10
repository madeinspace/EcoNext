export default ({ formatID, LongName, pageSubTitle, emailAddress }) => {
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
          PropertyValue: `.action{display:none} #main-nav{display:none} .e-shad{box-shadow:none; border:1px solid lightgray}`,
        },
      ],
    },
  ];
  const Format = formatID;
  const EmailAddress = emailAddress;

  const payload = {
    FileName,
    Product,
    Urls,
    Format,
    EmailAddress,
  };

  return payload;
};
