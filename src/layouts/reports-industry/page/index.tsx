import { useContext } from 'react';
import ReportsTool from '../../../components/ReportsTool';
import { IndustrySectorOptions } from '../../../components/ReportsTool/ReportLists';
import { PageContext } from '../../../utils/context';
import { PageListMaker } from '../../../utils';

const ReportsIndustryPage = () => {
  const {
    contentData: { IndustryList1Digits, IndustryList2Digits },
  } = useContext(PageContext);

  const getChildIndKey = ParentValue => {
    const ParentLabel = IndustryList2Digits.filter(({ Value }) => Value === ParentValue)[0].Label;
    const childIndKey = IndustryList1Digits.filter(({ Label }) => Label === ParentLabel)[0];
    return childIndKey.Value;
  };

  const indList = IndustryList2Digits.map(({ Label, ParentValue, Value }) => {
    const isParent = ParentValue == Value;
    const value = isParent ? Value : getChildIndKey(ParentValue);

    const option = {
      label: Label,
      value,
      parent: isParent,
      twoDigitKey: 'IndkeyNieir',
      oneDigitKey: 'Indkey',
      twoDigitValue: Value,
      oneDigitValue: getChildIndKey(ParentValue),
    };
    return option;
  });

  return <ReportsTool dropdownData={indList} pageGroups={PageListMaker(IndustrySectorOptions)}></ReportsTool>;
};

export default ReportsIndustryPage;
