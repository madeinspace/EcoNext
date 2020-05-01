import styled, { css } from 'styled-components';

const LoadingWrapper = styled.div`
  min-height: 200px;
  display: ${props => (props.loaded ? css`none` : css`flex`)};
  align-items: center;
  justify-content: center;
  img {
    text-align: center;
  }
`;

const _Loader = styled.img`
  width: 50px;
  position: absolute;
`;

export const Loader = ({ loaded }) => {
  return (
    <LoadingWrapper loaded={loaded}>
      <_Loader
        src="https://econext-cdn.azureedge.net/eco-assets/images/Bar_Chart_13s_200px.gif"
        alt="loading animation"
      />
    </LoadingWrapper>
  );
};
