import axios from 'axios';

const ReportServiceFetcher = async ({ clientAlias, LongName, Title, data, pages }) => {
  const apiUrl = `https://micro.id.com.au/api/report/putreportrequest`;

  const pagesObject = pages.reduce((acc, curr) => {
    return [
      ...acc,
      ...curr.registeredOptions.map(({ label, value }) => {
        return { Title: label, url: `https://economy.id.com.au/${clientAlias}/${value}` };
      }),
    ];
  }, []);

  const testReportObject = {
    FileName: `${LongName} - ${Title}`,
    Urls: pagesObject,
    EmailAddress: data.emailAddress,
    PdfOptions: [
      { PropertyName: 'MinLoadWaitTime', PropertyValue: 5000 },
      {
        PropertyName: 'UserStyleSheet',
        PropertyValue:
          'table tr td{font-size:14px!important;} p{font-size:16px!important; line-height:26px!important} .action{display:none} #main-nav{display:none} .e-shad{box-shadow:none; border:1px solid lightgray}',
      },
      { PropertyName: 'VisibleElementIds', PropertyValue: 'main-content' },
      { PropertyName: 'InvisibleElementIds', PropertyValue: 'siblings-nav;control-panel' },
    ],
    format: +data.format,
    product: 'economy',
    CoverPageInfo: {
      Product: 4,
      Title,
      ClientAlias: clientAlias,
      ClientDisplayName: LongName,
      ClientId: 102,
    },
  };
  return await axios.put(apiUrl, testReportObject);
};

export default ReportServiceFetcher;
