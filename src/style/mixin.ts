import { css } from 'styled-components';

export const red = '#ff4d4f';
export const blue = '#1890ff';
export const yellow = '#fadb14';
export const green = '#438844';

export const hidden = css`
  position: fixed;
  left: -99999px;
  margin-left: -99999px;
  width: 0;
  height: 0;
  font-size: 0;
`;

export const clearfix = css`
  &:before,
  &:after {
    content: '';
    display: table;
  }

  &:after {
    clear: both;
  }
`;
