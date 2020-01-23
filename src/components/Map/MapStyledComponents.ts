import styled from 'styled-components';
export const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
`;

export const InfoPanel = styled.div`
  position: absolute;
  z-index: 401;
  background: white;
  padding: 10px;
  align-self: flex-end;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 10px 0px;
  right: 10px;
  top: 10px;
`;

export const Footer = styled.div`
  padding: 10px;
`;
export const Source = styled.p`
  margin: 0;
`;
