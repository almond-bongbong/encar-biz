import React from 'react';
import styled, { css, SimpleInterpolation } from 'styled-components';
import { blue, red, yellow } from 'style/mixin';
import hexToRGB from 'lib/hexToRGB';
import { rotation } from 'style/animations';

interface LoaderProps {
  className?: string;
  color: 'red' | 'blue' | 'white' | 'gray' | 'yellow';
  size: number;
}

export const Container = styled.div<LoaderProps>`
  position: relative;
  .circle-loader {
    width: ${(props): SimpleInterpolation => props.size}px;
    height: ${(props): SimpleInterpolation => props.size}px;
    margin: 0 auto;
    border: ${(props): SimpleInterpolation =>
      props.size > 20 ? 2 : 1}px solid transparent;
    border-radius: 50%;
    color: ${red};
    animation: ${rotation} .8s ease infinite;
    ${(props): SimpleInterpolation =>
      props.color === 'red' &&
      css`
        border-top-color: rgba(${hexToRGB(red, 0.9)});
        border-bottom-color: rgba(${hexToRGB(red, 0.9)});
      `}
    ${(props): SimpleInterpolation =>
      props.color === 'blue' &&
      css`
        border-top-color: rgba(${hexToRGB(blue, 0.9)});
        border-bottom-color: rgba(${hexToRGB(blue, 0.9)});
      `}
    ${(props): SimpleInterpolation =>
      props.color === 'white' &&
      css`
        border-top-color: rgba(255, 255, 255, 0.9);
        border-bottom-color: rgba(255, 255, 255, 0.9);
      `}
    ${(props): SimpleInterpolation =>
      props.color === 'gray' &&
      css`
        border-top-color: rgba(100, 100, 100, 0.9);
        border-bottom-color: rgba(100, 100, 100, 0.9);
      `}
    ${(props): SimpleInterpolation =>
      props.color === 'yellow' &&
      css`
        border-top-color: rgba(${hexToRGB(yellow, 0.9)});
        border-bottom-color: rgba(${hexToRGB(yellow, 0.9)});
      `}
  }
`;

const Loader: React.FC<LoaderProps> = ({
  className,
  color = 'red',
  size = 60,
}) => (
  <Container className={className} color={color} size={size}>
    <div className="circle-loader" title="로딩중" />
  </Container>
);

export default Loader;
