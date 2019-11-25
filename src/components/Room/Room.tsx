import React, { memo } from 'react';
import styled from 'styled-components';
import { Meeting } from 'types';
import useIsUseRoom from 'hooks/reservation/useIsUseRoom';

interface ContainerProps {
  x: number;
  y: number;
}

interface LineProps {
  x: number;
  y: number;
}

interface RoomProps extends ContainerProps {
  id: number;
  name: string;
  polyPosition?: { x: number; y: number };
  polySize?: { width: number; height: number };
  polyPoints?: string;
  meetings: Meeting[];
}

const Container = styled.div<ContainerProps>`
  position: absolute;
  top: ${({ y }): number => y}%;
  left: ${({ x }): number => x}%;
  z-index: -10;
  text-align: center;
  transform: translate(-50%, -50%);
`;

const Title = styled.div`
  padding: 0 5px;
  color: #fff;
  font-size: 22px;
`;

const Line = styled.div<LineProps>`
  position: absolute;
  margin-top: ${({ y }): number => y}%;
  margin-left: ${({ x }): number => x}%;
`;

const Room: React.FC<RoomProps> = ({
  id,
  name,
  x,
  y,
  polyPosition,
  polySize,
  polyPoints,
}) => {
  const isUseRoom = useIsUseRoom(id);

  return (
    <>
      <Container x={x} y={y}>
        <Title>{name}</Title>
        {polySize && (
          <Line
            x={polyPosition ? polyPosition.x : -9999}
            y={polyPosition ? polyPosition.y : -9999}
          >
            <svg
              className="test"
              width={polySize.width}
              height={polySize.height}
              viewBox={`0 0 ${polySize.width} ${polySize.height}`}
            >
              <polygon
                className="path"
                points={polyPoints}
                stroke={isUseRoom ? '#ff33ff' : '#ccff33'}
                strokeWidth="4"
                style={{ fill: 'transparent' }}
              />
            </svg>
          </Line>
        )}
      </Container>
    </>
  );
};

export default memo(Room);
