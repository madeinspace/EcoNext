import styled from 'styled-components';

export const Unsecured = styled.span`
  &::before {
    content: '\\e612';
  }
  font-family: 'id-icons';
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
`;

export const Secured = styled.span`
  &::before {
    content: '\\e60e';
  }
  font-family: 'id-icons';
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
`;
