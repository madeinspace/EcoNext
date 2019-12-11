export default ({ formatID, LongName, pageSubTitle, emailAddress }) => {
  const fileName = `Economy.id-${LongName}-${pageSubTitle}`;
  const Product = `Economy`;
  const urls = [
    {
      title: `${pageSubTitle}`,
      url: window.location.href,
      pdfOptions: [
        { propertyName: 'VisibleElementIds', propertyValue: 'main-content' },
        { propertyName: 'InvisibleElementIds', propertyValue: 'siblings-nav' },
        {
          propertyName: 'UserStyleSheet',
          propertyValue: `.action{display:none} #main-nav{display:none} .e-shad{box-shadow:none; border:1px solid lightgray}`,
        },
      ],
    },
  ];
  const format = formatID;
  const geoName = LongName;

  const payload = {
    fileName,
    Product,
    urls,
    format,
    emailAddress,
    geoName,
  };

  return payload;
};
