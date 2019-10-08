import React, { useState } from 'react';
import styled from 'styled-components';
import ModalPopup from '../ModalPopup';

interface ContainerProps {
  x: number;
  y: number;
  width: number;
  height: number;
  inUse?: boolean;
  recommended?: boolean;
}

interface RoomProps extends ContainerProps {
  name: string;
}

const Container = styled.div<ContainerProps>`
  position: absolute;
  top: ${({ y }): number => y}px;
  left: ${({ x }): number => x}px;
  z-index: 10;
  width: ${({ width }): number => width}px;
  height: ${({ height }): number => height}px;
  padding: 10px;
  border: 1px solid #666;
  background: ${({ recommended, inUse }): string =>
    inUse
      ? 'rgba(255, 0, 0, 0.4)'
      : recommended
      ? 'rgba(0, 255, 0, 0.6)'
      : 'rgba(0, 255, 0, 0.6)'};
  text-align: center;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 16px;
  color: ${({ theme }): string => theme.white};
`;

const RoomDetail = styled.div`
  background-color: #fff;
`;

const Room: React.FC<RoomProps> = ({
  name,
  inUse,
  recommended,
  x,
  y,
  width,
  height,
}) => {
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const handleDetail = (): void => {
    setShowDetail(true);
  };

  const handleClosePopup = (): void => {
    console.log('hide');
    setShowDetail(false);
  };

  return (
    <Container
      inUse={inUse}
      recommended={recommended}
      x={x}
      y={y}
      width={width}
      height={height}
      onClick={handleDetail}
    >
      <Title>{name}</Title>
      <ModalPopup show={showDetail} keyPressESC={handleClosePopup}>
        <RoomDetail>
          <div>{name}</div>
          <ul>
            <li>10:00 ~ 11:00 위클리</li>
            <li>11:00 ~ 11:30 프로젝트 회의</li>
            <li>13:00 ~ 16:00 파트 회의</li>
            <li>16:00 ~ 18:00 미팅</li>
          </ul>
        </RoomDetail>
      </ModalPopup>
    </Container>
  );
};

export default Room;
