import React from 'react';
import styled from 'styled-components';

type valueType = string | number;

interface TabButtonProps {
  active: boolean;
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
  font-size: 0;
`;

const TabButton = styled.button<TabButtonProps>`
  display: inline-block;
  padding: 10px 15px;
  border: 1px solid #ccc;
  color: ${(props): string => (props.active ? '#fff' : '#333')};
  background-color: ${(props): string => (props.active ? '#333' : '#fff')};
  font-size: 20px;
  cursor: pointer;

  & + & {
    border-left: 0;
  }
`;

const FloorTab: React.FC<Props> = ({ value, items, onClick, className }) => {
  return (
    <TabWrapper className={className}>
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
