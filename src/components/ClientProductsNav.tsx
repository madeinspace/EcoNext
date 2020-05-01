import React, { useContext } from 'react';
import styled from 'styled-components';
import { ClientContext } from '../utils/context';

const ProductsNav = styled.nav`
  height: 42px;
`;
const ActiveIndicator = styled.span`
  display: none;
  position: absolute;
  left: 50%;
  margin-left: -7.5px;
  bottom: -8px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 8px 8px 0;
`;
const ProductItem = styled.a`
  position: relative;
  height: 42px;
  line-height: 42px;
  float: left;
  vertical-align: middle;
  text-decoration: none;
  padding: 0 14px;
  color: #fff;
  transition: 0.3s background-color;
  text-transform: lowercase;
  font-size: 16px;
  &.app-1 {
    background-color: #cb2c30;
    ${ActiveIndicator} {
      border-color: #cb2c30 transparent transparent;
    }
  }
  &.app-2 {
    background-color: #caae01;
    ${ActiveIndicator} {
      border-color: #caae01 transparent transparent;
    }
  }
  &.app-3 {
    background-color: #3b6e8f;
    ${ActiveIndicator} {
      border-color: #3b6e8f transparent transparent;
    }
  }
  &.app-4 {
    background-color: #70b859;
    ${ActiveIndicator} {
      border-color: #70b859 transparent transparent;
    }
  }
  &.app-1016 {
    background-color: #7513b8;
    ${ActiveIndicator} {
      border-color: #7513b8 transparent transparent;
    }
  }
  &.active {
    ${ActiveIndicator} {
      display: block;
    }
  }

  &:hover {
    ${ActiveIndicator} {
      display: block;
    }
  }
`;

const ClientProductsNav = ({ alias }) => {
  const { clientProducts } = useContext(ClientContext);

  return (
    <ProductsNav>
      {clientProducts.map((product, i) => {
        return (
          <ProductItem
            key={i}
            target="_blank"
            rel="noopener"
            className={`app-${product.AppID} ${product.AppID === 4 ? 'active' : null}`}
            href={`https://${product.SubDomainName}.id.com.au/${alias}`}
          >
            {product.FullName}
            <ActiveIndicator />
          </ProductItem>
        );
      })}
    </ProductsNav>
  );
};

export default ClientProductsNav;
