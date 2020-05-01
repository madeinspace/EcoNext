import styled from 'styled-components';

export const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
`;

export const DropdownListItem = styled.li`
  padding: 0 10px;

  &:hover {
    cursor: pointer;
    background-color: #f2f2f2;
  }
`;

export const DropdownList = styled.ul`
  visibility: ${props => (props.dropdownVisible ? 'visible' : 'hidden')};
  z-index: 100;
  position: absolute;
  right: 0;
  top: 25px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100px;
  list-style-type: none;
  margin: 5px auto auto 0;
`;
export const ShareDropdownList = styled(DropdownList)`
  width: 110px;
`;

export const ShareDropdownListItem = styled(DropdownListItem)`
  a {
    text-decoration: none;
    color: #333;
    display: block;
  }
`;

export const ButtonLink = styled.a`
  width: fit-content;
  display: inline-flex;
  bottom: 5px;
  right: 10px;
  padding: 0 0 0 5px;
  border: none;
  line-height: 25px;
  height: 25px;
  cursor: pointer;
  background-color: #dddddd;
`;

export const IconBase = styled.span`
  line-height: 25px;
  height: 25px;
  width: 24px;
  margin-left: 5px;
  color: #fff;
  background-color: #70b859;
  font-family: 'id-icons';
  padding-left: 4px;
`;

export const ResetIcon = styled(IconBase)`
  &::before {
    content: '\\E907';
  }
`;

export const ExportIcon = styled(IconBase)`
  &::before {
    content: '\\E61A';
  }
`;

export const PageButtonLink = styled(ButtonLink)`
  background-color: unset;
`;

export const PageShareButtonLink = styled.div`
  cursor: pointer;
  &::before {
    vertical-align: middle;
    font-size: 20px;
    font-family: 'id-icons';
    content: '\\e901';
  }
`;
export const PageExportButtonLink = styled.div`
  cursor: pointer;
  &::before {
    vertical-align: middle;
    font-size: 20px;
    font-family: 'id-icons';
    content: '\\E61A';
  }
`;

const ExportButtonLink = styled(ButtonLink)``;
