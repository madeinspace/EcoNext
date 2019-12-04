import * as React from 'react';

interface ProductTabProps {
  handleFilter: (productID: string) => any;
  productName: string;
  productID: string;
  count: number;
  isActive: boolean;
}
const ProductTab: React.FunctionComponent<ProductTabProps> = props => {
  const { handleFilter, productName, productID, count, isActive } = props;
  const tabClass = `${'searchResults__filter'} ${'prod' +
    productID.toString()} ${isActive ? 'searchResults__filter__active' : ''}`;

  return (
    <li
      className={tabClass}
      onClick={() => {
        handleFilter(productID);
      }}
    >
      {productName} <span className={'badge'}>{count}</span>
    </li>
  );
};

export default ProductTab;
