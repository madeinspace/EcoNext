import styled, { css } from 'styled-components';

const LoadingWrapper = styled.div`
  min-height: ${props => (props.height ? `${props.height}px` : `200px`)};
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

export const Loader = ({ height = null, loaded }) => {
  return (
    <LoadingWrapper height={height} loaded={loaded}>
      <_Loader
        src="https://econext-cdn.azureedge.net/eco-assets/images/Bar_Chart_13s_200px.gif"
        alt="loading animation"
      />
    </LoadingWrapper>
  );
};
