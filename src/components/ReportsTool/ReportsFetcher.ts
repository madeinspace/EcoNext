import axios from 'axios';

const ReportServiceFetcher = async pages => {
  const apiUrl = `http://micro.id.com.au/api/report/putreportrequest`;
  const testReportObject = {
    FileName: 'Test Next js page',
    Urls: [
      {
        Title: 'age',
        url: 'https://economy.id.com.au/alpine/population',
      },
      {
        Title: 'age',
        url: 'https://economy.id.com.au/monash/workers-hours-worked?Indkey=23002',
      },
    ],
    EmailAddress: 'fabrice@id.com.au',
    PdfOptions: [
      {
        PropertyName: 'UserStyleSheet',
        PropertyValue:
          'table tr td{font-size:14px!important;} p{font-size:16px!important; line-height:26px!important} .action{display:none} #main-nav{display:none} .e-shad{box-shadow:none; border:1px solid lightgray}',
      },
      { PropertyName: 'VisibleElementIds', PropertyValue: 'main-content' },
      { PropertyName: 'InvisibleElementIds', PropertyValue: 'siblings-nav;control-panel' },
    ],
    format: 0,
    product: 'economy',
    CoverPageInfo: {
      Product: 4,
      Title: '2016 Census Results',
      ClientAlias: 'monash',
      ClientDisplayName: 'City of Monash',
      ClientId: 102,
      ComparisonYear: 2011,
      Benchmark: 'Greater Melbourne',
    },
  };
  return Promise.resolve('success'); //await axios.put(apiUrl, testReportObject);
};

export default ReportServiceFetcher;
