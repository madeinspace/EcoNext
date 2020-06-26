import { useContext } from 'react';
import ReportsTool from '../../../components/ReportsTool';
import { IndustrySectorOptions } from '../../../components/ReportsTool/ReportLists';
import { PageContext } from '../../../utils/context';
import { PageListMaker } from '../../../utils';

const ReportsIndustryPage = () => {
  const {
    contentData: { IndustryList2Digits },
  } = useContext(PageContext);

  const indList = IndustryList2Digits.map(({ Label, ParentValue, Value }) => ({
    label: Label,
    value: Value,
    parent: ParentValue == Value,
    parentValue: ParentValue,
    key: 'IndkeyNieir',
  }));

  return <ReportsTool dropdownData={indList} pageGroups={PageListMaker(IndustrySectorOptions)}></ReportsTool>;
};

export default ReportsIndustryPage;
