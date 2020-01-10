export default ({ formatID, LongName, pageSubTitle, emailAddress }) => {
  const fileName = `Economy.id-${LongName}-${pageSubTitle}`;
  const Product = `Economy`;
  const urls = [
    {
      title: `${pageSubTitle}`,
      url: window.location.href,
      pdfOptions: [
        { propertyName: 'VisibleElementIds', propertyValue: 'main-content' },
        { propertyName: 'InvisibleElementIds', propertyValue: 'siblings-nav;control-panel' },
        {
          propertyName: 'UserStyleSheet',
          propertyValue: `table tr td{font-size:14px!important;} p{font-size:16px!important; line-height:26px!important} .action{display:none} #main-nav{display:none} .e-shad{box-shadow:none; border:1px solid lightgray}`,
        },
        { propertyName: 'OutputArea', propertyValue: 'new RectangleF(0.5f, 0.5f, 7.5f, 10f)' },
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
