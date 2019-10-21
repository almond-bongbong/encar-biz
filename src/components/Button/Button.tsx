import React, { useMemo } from 'react';
import styled, { css, SimpleInterpolation } from 'styled-components';
import Loader from '../Loader';

interface ButtonProps {
  inline?: boolean;
  color?: 'white' | 'gray' | 'red' | 'blue';
  width?: number | string;
  height?: 30 | 40 | 50;
  loading?: boolean;
  onClick: () => void;
  className?: string;
}

interface ButtonWrapperProps {
  inline: boolean;
  color: 'white' | 'gray' | 'red' | 'blue';
  width: number | string;
  height: 30 | 40 | 50;
}

const ButtonWrapper = styled.div<ButtonWrapperProps>`
  display: block;

  ${(props): SimpleInterpolation =>
    props.inline &&
    css`
      display: inline-block;
      width: auto;
    `};

  button,
  a {
    display: block;
    width: ${(props): string =>
      `${props.width !== 'auto' ? `${props.width}px` : '100%'}`};
    min-width: 80px;
    height: ${(props): number => props.height}px;
    padding: 0 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: 0;
    font-size: 16px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    line-height: ${(props): number => props.height}px;
    transition: box-shadow 0.2s;

    &:hover {
      box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
    }

    &:active {
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    }

    & span {
      position: relative;
    }

    ${(props): SimpleInterpolation =>
      props.color === 'white' &&
      css`
        background-color: #fff;
        border: 1px solid #ddd;
        color: #666;
      `};

    ${(props): SimpleInterpolation =>
      props.color === 'gray' &&
      css`
        background-color: #666;
        border: 1px solid #666;
        color: #fff;
      `}

    ${(props): SimpleInterpolation =>
      props.color === 'red' &&
      css`
        background-color: ${props.theme.red};
        border: 1px solid ${props.theme.red};
        color: #fff;
      `};

    ${(props): SimpleInterpolation =>
      props.color === 'blue' &&
      css`
        background-color: ${props.theme.blue};
        border: 1px solid ${props.theme.blue};
        color: #fff;
      `}
  }
`;

const Button: React.FC<ButtonProps> = ({
  children,
  color = 'white',
  width = 'auto',
  height = 40,
  inline = true,
  loading = false,
  onClick,
  className,
}) => {
  const loaderTheme = useMemo(() => (color === 'white' ? 'red' : 'white'), [
    color,
  ]);
  const loaderSize = useMemo(() => height / 2, [height]);

  return (
    <ButtonWrapper
      data-testid="button-wrap"
      color={color}
      width={width}
      height={height}
      inline={inline}
      className={className}
    >
      {loading ? (
        <button type="button">
          <Loader color={loaderTheme} size={loaderSize} />
        </button>
      ) : (
        <button type="button" onClick={onClick}>
          <span>{children}</span>
        </button>
      )}
    </ButtonWrapper>
  );
};

export default Button;
