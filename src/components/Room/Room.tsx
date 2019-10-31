import React, { memo } from 'react';
import styled from 'styled-components';
import { Meeting } from 'types';
import useIsUseRoom from 'hooks/useIsUseRoom';

interface ContainerProps {
  x: number;
  y: number;
  inUse?: boolean;
}

interface TitleProps {
  inUse?: boolean;
}

interface RoomProps extends ContainerProps {
  id: number;
  name: string;
  meetings: Meeting[];
}

const Container = styled.div<ContainerProps>`
  position: absolute;
  top: ${({ y }): number => y}%;
  left: ${({ x }): number => x}%;
  z-index: -10;
  background: ${({ inUse }): string => (inUse ? 'rgba(255, 0, 0, 0.4)' : '')};
  text-align: center;
  transform: translate(-50%, -50%);
`;

const Title = styled.div<TitleProps>`
  padding: 0 5px;
  color: ${({ inUse }): string => (inUse ? '#666' : '#333')};
  font-family: 'Jua', sans-serif;
  font-weight: 600;
  font-size: 22px;
`;

const Room: React.FC<RoomProps> = ({ id, name, x, y }) => {
  const isUseRoom = useIsUseRoom(id);

  return (
    <>
      <Container inUse={!!isUseRoom} x={x} y={y}>
        <Title inUse={!!isUseRoom}>{name}</Title>
      </Container>
    </>
  );
};

export default memo(Room);
