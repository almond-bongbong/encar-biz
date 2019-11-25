import React from 'react';
import styled, { css, SimpleInterpolation } from 'styled-components';

type valueType = string | number;

interface TabButtonProps {
  active: boolean;
}

interface BackgroundProps {
  left: number;
}

interface Props {
  value: valueType;
  items: {
    value: valueType;
    label: string;
  }[];
  onClick: (value: valueType) => void;
  className?: string;
}

const TabWrapper = styled.div`
  overflow: hidden;
  padding: 0 5px;
  border: 4px solid #fff;
  border-radius: 55px;
  background: rgba(0, 0, 0, 0.8);
  font-size: 0;
`;

const TabButton = styled.button<TabButtonProps>`
  display: inline-block;
  position: relative;
  z-index: 20;
  padding: 14px 25px 7px;
  color: #fff;
  font-size: 34px;
  cursor: pointer;
  transition: color 0.3s;
  ${(props): SimpleInterpolation =>
    props.active
      ? css`
          color: #000;
        `
      : ''}

  & + & {
    border-left: 0;
  }
`;

const Background = styled.div<BackgroundProps>`
  position: absolute;
  top: -1px;
  bottom: -1px;
  left: ${({ left }): number => left}px;
  z-index: 10;
  width: 110px;
  border-radius: 35px;
  background-color: #fff;
  transition: left 0.3s;
`;

const FloorTab: React.FC<Props> = ({ value, items, onClick, className }) => {
  return (
    <TabWrapper className={className}>
      <Background left={value === '18' ? -1 : 104} />
      {items.map(item => (
        <TabButton
          type="button"
          key={item.value}
          active={value === item.value}
          onClick={(): void => onClick(item.value)}
        >
          {item.label}
        </TabButton>
      ))}
    </TabWrapper>
  );
};

export default FloorTab;
