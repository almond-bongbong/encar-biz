import React, { SyntheticEvent, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import _ from 'lodash';
import CustomScroll from 'react-custom-scroll';
import 'react-custom-scroll/dist/customScroll.css';
import moment, { Moment } from 'moment';
import isMobileDetector from 'lib/isMobileDetector';
import { addRootElement } from 'lib/generateElement';

interface TimeSelectProps {
  value: Moment;
  timerActivated: boolean;
  onSelectTime: (time: string) => void;
}

interface OptionsProps {
  top: number;
  left: number;
}

interface TimeProps {
  isMobile: boolean;
}

const Container = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const TimeButton = styled.button`
  display: inline-block;
  position: relative;
  font-size: 39px;
  border-bottom: 2px solid #d8d8d8;
`;

const SelectedTime = styled.span`
  vertical-align: middle;
`;

const Second = styled.span`
  margin-left: 10px;
  vertical-align: middle;
  white-space: nowrap;
`;

const Options = styled.div<OptionsProps>`
  position: fixed;
  top: ${({ top }): number => top}px;
  left: ${({ left }): number => left}px;
  z-index: 100;
  background-color: rgba(170, 170, 170, 0.7);
  box-shadow: 0 2px 4px 5px rgba(100, 100, 100, 0.1);

  & .rcs-custom-scroll .rcs-inner-handle {
    background-color: rgba(30, 30, 30, 0.6);
  }
`;

const OptionsContent = styled.div`
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

addRootElement('time-select-container');

const TimeSelect: React.FC<TimeSelectProps> = ({
  value,
  timerActivated,
  onSelectTime,
}) => {
  const containerElement = document.getElementById('time-select-container');
  const [optionsPosition, setOptionsPosition] = useState<number[] | null>(null);

  const showTimeOptions = (e: SyntheticEvent<HTMLButtonElement>): void => {
    const rect = e.currentTarget.getBoundingClientRect();
    const top = rect.top - 300;
    setOptionsPosition([top, rect.left]);
  };

  const hideTimeOptions = (): void => {
    setOptionsPosition(null);
  };

  const toggleShowOptions = (e: SyntheticEvent<HTMLButtonElement>): void => {
    console.log(optionsPosition);
    if (optionsPosition) {
      hideTimeOptions();
    } else {
      showTimeOptions(e);
    }
  };

  return (
    <Container>
      <TimeButton
        type={'button'}
        onClick={toggleShowOptions}
        onBlur={hideTimeOptions}
      >
        <SelectedTime>{value.format(`A h시 m분`)}</SelectedTime>
        {timerActivated && <Second>{`${moment().format('ss')}초`}</Second>}
      </TimeButton>

      {containerElement &&
        optionsPosition &&
        createPortal(
          <Options top={optionsPosition[0]} left={optionsPosition[1]}>
            <CustomScroll>
              <OptionsContent>
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
              </OptionsContent>
            </CustomScroll>
          </Options>,
          containerElement,
        )}
    </Container>
  );
};

export default TimeSelect;
