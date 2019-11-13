import * as React from 'react';
import ProductTab from './ProductTab';

interface SearchResultsFiltersProps {
  tabs: any[];
  handleFilter: any;
  currentTab: any;
  countTotal: number;
}

export function SearchResultsFilters(props: SearchResultsFiltersProps) {
  const { tabs, handleFilter, currentTab, countTotal } = props;
  const productTabs: any[] = tabs.map((item, i) => {
    return (
      <ProductTab
        key={item.productID}
        productID={item.productID}
        productName={item.productName}
        count={item.count}
        isActive={currentTab === item.productID}
        handleFilter={handleFilter}
      />
    );
  });

  const allSectionTabCLass = `${'searchResults__filter'} ${
    currentTab == 0 ? 'searchResults__filter__active' : ''
  }`;

  return (
    <ul className={'searchResults__filters'}>
      <li className={allSectionTabCLass} onClick={() => handleFilter(0)}>
        All sections <span className={'badge'}>{countTotal}</span>
      </li>
      {productTabs}
    </ul>
  );
}
