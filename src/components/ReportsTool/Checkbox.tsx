import styled from 'styled-components';
const Checkbox = ({ className, id, label, handleClick, isChecked = false }) => {
  return (
    <CBX className={className}>
      <input type="checkbox" id={id} name={label} onChange={handleClick} checked={isChecked} />
      <label htmlFor={id}>{label}</label>
    </CBX>
  );
};

export default Checkbox;

const CBX = styled.span`
  label {
    display: block;
    color: #8a8a8a;
    padding: 4px 6px;
    cursor: pointer;
    &::before {
      display: inline-block;
      text-rendering: auto;
      -webkit-font-smoothing: antialiased;
      font-family: 'Font Awesome 5 Free';
      font-weight: 900;
      font-size: 12px;
      padding: 2px 6px 2px 2px;
      content: '\f067';
    }
  }
  input[type='checkbox'] {
    position: absolute;
    margin: 6px 3px 3px 6px;
    opacity: 0;
    &:checked + label {
      color: #70b859;
      &::before {
        content: '\f00c';
        margin-right: -1px;
        color: #70b859;
      }
    }
  }
`;
