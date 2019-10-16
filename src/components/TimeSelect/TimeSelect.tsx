import React, { Fragment } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import CustomScroll from 'react-custom-scroll';
import 'react-custom-scroll/dist/customScroll.css';

interface TimeSelectProps {
  onSelectTime: (time: string) => void;
}

const Container = styled.div`
  & .rcs-custom-scroll .rcs-inner-handle {
    background-color: rgba(30, 30, 30, 0.8);
  }
`;

const Content = styled.div`
  width: 200px;
  height: 300px;
`;

const Time = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  border: 0;
  background-color: transparent;
  color: #fff;
  text-shadow: 0 1px 2px 3px rgba(255, 255, 255, 0.2);
  font-size: 20px;
  text-align: center;
  cursor: pointer;

  @media screen and (min-width: 768px) {
    &:hover {
      background-color: rgba(40, 40, 40, 0.9);
    }
  }

  &:active {
    background-color: rgba(200, 200, 200, 0.2);
  }
`;

const TimeSelect: React.FC<TimeSelectProps> = ({ onSelectTime }) => {
  return (
    <Container>
      <CustomScroll>
        <Content>
          {_.range(9, 19).map(hour => (
            <Fragment key={hour}>
              <Time
                onClick={(): void => onSelectTime(`${hour}:30`)}
              >{`${hour}:30`}</Time>
              <Time
                onClick={(): void => onSelectTime(`${hour}:00`)}
              >{`${hour}:00`}</Time>
            </Fragment>
          ))}
        </Content>
      </CustomScroll>
    </Container>
  );
};

export default TimeSelect;
