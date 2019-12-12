import * as React from 'react';

export default function ShowMoreButton(props) {
  const { showMore, nEntries, handleClick } = props;
  return (
    <div onClick={handleClick} className="showMore">
      {showMore ? `Show all (${nEntries} entries)` : `Show less`}
    </div>
  );
}
