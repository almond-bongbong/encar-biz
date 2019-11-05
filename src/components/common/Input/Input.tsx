import React, { ChangeEvent } from 'react';
import styled, { css, SimpleInterpolation } from 'styled-components';
import { green, red } from 'style/mixin';
import hexToRGB from 'lib/hexToRGB';
import Loader from 'components/common/Loader';

interface InputProps {
  type?: 'text' | 'password';
  id?: string;
  color?: 'dark';
  lineTheme?: boolean;
  placeholder?: string;
  value: string;
  size?: 30 | 40 | 50;
  status?: 'warning' | 'correct';
  warningMessage?: string;
  loading?: boolean;
  onChange: (e: ChangeEvent) => void;
}

interface InputWrapperProps {
  size: 30 | 40 | 50;
  lineTheme?: boolean;
  status?: 'warning' | 'correct';
}

const InputWrapper = styled.div<InputWrapperProps>`
  display: block;
  position: relative;
  border-radius: 3px;
  > input {
    box-sizing: border-box;
    display: block;    
    width: 100%;
    height: ${({ size }): 30 | 40 | 50 => size}px;
    padding: 0 15px;
    border: 1px solid #ddd;
    outline: 0;
    font-size: 13px;
    line-height: ${({ size }): 30 | 40 | 50 => size}px;
  }
  ${({ color }): SimpleInterpolation =>
    color === 'dark' &&
    css`
      > input {
        border: 1px solid #666;
        color: #eee;
        &::placeholder {
          color: #888;
        }
      }
    `}
  ${({ lineTheme }): SimpleInterpolation =>
    lineTheme &&
    css`
      > input {
        border: 0;
        border-bottom: 1px solid #ddd;
      }
    `}
  ${({ status }): SimpleInterpolation =>
    status === 'warning' &&
    css`
      > input {
        border: 1px solid rgba(${hexToRGB(red)}, 0.5);
        box-shadow: 0 0 1px 1px rgba(${hexToRGB(red)}, 0.3);
      }
    `}
  ${({ status }): SimpleInterpolation =>
    status === 'correct' &&
    css`
      > input {
        border: 1px solid rgba(${hexToRGB(green)}, 0.5);
        box-shadow: 0 0 1px 1px rgba(${hexToRGB(green)}, 0.3);
      }
    `}
  .warning {
    margin-top: 5px;
    color: ${red};
    font-size: 13px;
  }
`;

const InputLoader = styled(Loader)`
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
`;

const Input: React.FC<InputProps> = ({
  type = 'text',
  id,
  color,
  lineTheme,
  placeholder,
  value,
  size = 40,
  status,
  warningMessage,
  loading,
  onChange,
}) => {
  return (
    <InputWrapper
      size={size}
      color={color}
      lineTheme={lineTheme}
      status={status}
    >
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {loading && <InputLoader color="blue" size={18} />}
      {status === 'warning' && warningMessage && (
        <div className="warning">{warningMessage}</div>
      )}
    </InputWrapper>
  );
};

export default Input;
