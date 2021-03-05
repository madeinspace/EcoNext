import React from 'react';
import { SubTitleAlt2, TopList } from '../../../styles/MainContentStyles';

const KeyInsights = () => {
  return (
    <>
      {' '}
      <SubTitleAlt2>Key Insights</SubTitleAlt2>
      <TopList>
        <li>
          Sunshine Coast Council's GRP in the 2020 Calendar Year is estimated to be $XXX Million. This represents a
          $###M (XXX%) fall/growth from 2019.
        </li>
        <li>The 2021 Calendar Year GRP is forecast to grow/decline by $XXXM (XX%) to reach $### Million.</li>
        <li>
          The average number of Local jobs in the 2020 Calendar Year is estimated at XXX, down/up XXX (XX%) on 2019
          numbers. In 2021, the local jobs are forecast to grow/fall by XXX jobs (XX%) compared to 2020.
        </li>
        <li>
          The average number of Employed Residents in the 2020 Calendar Year is estimated at XXX, down/up XXX (XX%) on
          2019 numbers. In 2021, employed residents are forecast to grow/fall by XXX jobs (XX%) compared to 2020.
        </li>
      </TopList>
    </>
  );
};

export default KeyInsights;
