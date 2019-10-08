import React from 'react';
import styled from 'styled-components';

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
  onClick?: () => void;
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
      : 'rgba(0, 0, 0, 0.2)'};
  text-align: center;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 16px;
  color: ${({ theme }): string => theme.white};
`;

const Room: React.FC<RoomProps> = ({
  name,
  inUse,
  recommended,
  x,
  y,
  width,
  height,
  onClick,
}) => {
  return (
    <Container
      inUse={inUse}
      recommended={recommended}
      x={x}
      y={y}
      width={width}
      height={height}
      onClick={onClick}
    >
      <Title>{name}</Title>
    </Container>
  );
};

export default Room;
