import { useContext } from 'react';
import ReportsTool from '../../../components/ReportsTool';
import { IndustrySectorReports } from '../../../components/ReportsTool/ReportLists';
import { PageContext } from '../../../utils/context';

const ReportsIndustryPage = () => {
  const {
    contentData: { IndustryList2Digits },
  } = useContext(PageContext);

  const indList = IndustryList2Digits.map(({ Label, ParentValue, Value }) => ({
    label: Label,
    value: Value,
    parent: ParentValue == Value,
    key: 'IndkeyNieir',
  }));

  return (
    <>
      <ReportsTool dropdownData={indList} pageGroups={IndustrySectorReports}></ReportsTool>
    </>
  );
};

export default ReportsIndustryPage;
