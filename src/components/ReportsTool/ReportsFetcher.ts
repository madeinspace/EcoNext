import axios from 'axios';

const ReportServiceFetcher = async ({ clientAlias, LongName, reportTitle, userData, pages }) => {
  const apiUrl = `https://micro.id.com.au/api/report/putreportrequest`;

  const PdfOptions = [
    { PropertyName: 'MinLoadWaitTime', PropertyValue: 7000 },
    {
      PropertyName: 'UserStyleSheet',
      PropertyValue:
        'table tr td{font-size:14px!important;} p{font-size:16px!important; line-height:26px!important} .action{display:none} #main-nav{display:none} .e-shad{box-shadow:none; border:1px solid lightgray}',
    },
    { PropertyName: 'VisibleElementIds', PropertyValue: 'main-content' },
    { PropertyName: 'InvisibleElementIds', PropertyValue: 'siblings-nav;control-panel' },
  ];

  const reportObject = {
    FileName: `${LongName} - ${reportTitle}`,
    Urls: pages,
    EmailAddress: userData.emailAddress,
    PdfOptions,
    format: +userData.format,
    product: 'economy',
    CoverPageInfo: {
      Product: 4,
      reportTitle,
      ClientAlias: clientAlias,
      ClientDisplayName: LongName,
      ClientId: 102,
    },
  };

  return await axios.put(apiUrl, reportObject);
};

export default ReportServiceFetcher;
