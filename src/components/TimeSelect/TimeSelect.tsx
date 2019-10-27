import React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import _ from 'lodash';
import CustomScroll from 'react-custom-scroll';
import 'react-custom-scroll/dist/customScroll.css';
import isMobileDetector from 'lib/isMobileDetector';

interface TimeSelectProps {
  onSelectTime: (time: string) => void;
}

interface TimeProps {
  isMobile: boolean;
}

const Container = styled.div`
  & .rcs-custom-scroll .rcs-inner-handle {
    background-color: rgba(30, 30, 30, 0.6);
  }
`;

const Content = styled.div`
  width: 200px;
  height: 300px;
`;

const Time = styled.button<TimeProps>`
  display: block;
  width: 100%;
  padding: 10px;
  border: 0;
  text-shadow: 0 1px 2px 3px rgba(255, 255, 255, 0.2);
  font-size: 20px;
  text-align: center;
  cursor: pointer;

  ${({ isMobile }): FlattenSimpleInterpolation | false =>
    !isMobile &&
    css`
      &:hover {
        background-color: rgba(40, 40, 40, 0.1);
      }
    `}

  &:active {
    background-color: rgba(200, 200, 200, 0.2);
  }
`;

const isMobile = isMobileDetector();

const TimeSelect: React.FC<TimeSelectProps> = ({ onSelectTime }) => {
  return (
    <Container>
      <CustomScroll>
        <Content>
          {_.range(9, 18.5, 0.5).map(index => {
            const hour = Math.floor(index);
            const minutes = (index % 1) * 60;
            const time = `${hour}:${minutes.toString().padStart(2, '0')}`;

            return (
              <Time
                key={index}
                onMouseDown={(): void => onSelectTime(time)}
                isMobile={isMobile}
              >
                {time}
              </Time>
            );
          })}
        </Content>
      </CustomScroll>
    </Container>
  );
};

export default TimeSelect;
