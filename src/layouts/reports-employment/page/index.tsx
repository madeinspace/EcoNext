import { useContext } from 'react';
import ReportsTool from '../../../components/ReportsTool';
import { EmploymentReports } from '../../../components/ReportsTool/ReportLists';
import { PageContext } from '../../../utils/context';

const ReportsEmploymentPage = () => {
  const {
    contentData: { IndustryList1Digits },
  } = useContext(PageContext);

  const indList = IndustryList1Digits.map(({ Label, ParentValue, Value }) => ({
    label: Label,
    value: Value,
    parent: ParentValue == Value,
    key: 'IndkeyNieir',
  }));

  return (
    <>
      <ReportsTool dropdownData={indList} pageGroups={EmploymentReports}></ReportsTool>
    </>
  );
};

export default ReportsEmploymentPage;
