import ReportsTool from '../../../components/ReportsTool';
import { EconomicOverviewReports } from '../../../components/ReportsTool/ReportLists';
import { PageListMaker } from '../../../utils';

const ReportsPage = () => <ReportsTool pageGroups={PageListMaker(EconomicOverviewReports)} />;

export default ReportsPage;
