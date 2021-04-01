import { useState } from 'react';
import { ItemWrapper, _SubTitle, Tab, Tabs } from '../../../../styles/MainContentStyles';
import OutputChart from './OutputChart';

const EconomicImpactChart = () => {
  const [Pane, setPane] = useState(1);
  const handleTabChange = (key, value) => setPane(value);

  return (
    <>
      <Tabs>
        <Tab Pane={Pane} id={1} onClick={() => handleTabChange('t', 1)}>
          Output
        </Tab>
        <Tab Pane={Pane} id={2} onClick={() => handleTabChange('t', 2)}>
          Value Added
        </Tab>
      </Tabs>
      {Pane === 1 && (
        <ItemWrapper>
          <OutputChart measure={'Output'} />
        </ItemWrapper>
      )}
      {Pane === 2 && (
        <ItemWrapper>
          <OutputChart measure={'VA'} />
        </ItemWrapper>
      )}
    </>
  );
};

export default EconomicImpactChart;
