import styled, { keyframes } from "styled-components";

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
const rotationBack = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
`;

const SpinnerContainer = styled.span`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  border: 3px solid;
  border-color: gray gray transparent;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;

  &:after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border: 3px solid;
    border-color: transparent #0b76ef #0b76ef;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    animation: ${rotationBack} 0.5s linear infinite;
    transform-origin: center center;
  }
`;

export const Spinner = () => {
  return <SpinnerContainer />;
};