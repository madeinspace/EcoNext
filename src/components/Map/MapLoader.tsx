import styled, { keyframes } from 'styled-components';
export const MapLoader = ({ loaded }) => {
  const LoadingWrapper = styled.div`
    min-height: 400px;
    width: 100%;
    position: absolute;
    display: ${props => (props.loaded ? 'none' : 'flex')};
  `;
  const pulsate = keyframes`
  0% {
    transform: scale(0.1, 0.1);
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    transform: scale(1.2, 1.2);
    opacity: 0;
  }
`;
  const PinWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 24px;
    height: 42px;
  `;

  const Pin = styled.div`
    position: absolute;
    border-radius: 50%;
    border: 8px solid #70b859;
    width: 24px;
    height: 24px;

    &::after {
      position: absolute;
      content: '';
      width: 0px;
      height: 0px;
      top: 11px;
      border: 10px solid transparent;
      border-top: 17px solid #70b859;
      left: -6px;
    }
  `;
  const Pulse = styled.div`
    background: #538843;
    border-radius: 50%;
    height: 14px;
    width: 14px;
    position: absolute;
    top: 30px;
    transform: rotateX(60deg);
    z-index: -2;
    left: 5px;

    &::after {
      content: '';
      border-radius: 50%;
      height: 40px;
      width: 40px;
      position: absolute;
      margin: -13px 0 0 -13px;
      animation: ${pulsate} 1s ease-out;
      animation-iteration-count: infinite;
      opacity: 0;
      box-shadow: 0 0 1px 2px #538843;
      animation-delay: 0s;
    }
  `;

  return (
    <LoadingWrapper loaded={loaded}>
      <PinWrapper>
        <Pin />
        <Pulse />
      </PinWrapper>
    </LoadingWrapper>
  );
};
