import React from 'react';
import styled from 'styled-components';
import Room from '../Room/Room';

const Container = styled.div`
  padding: 20px;
`;

const MapArea = styled.div`
  position: relative;
  margin-top: 50px;
  padding-top: 75%;
  background-color: #ddd;

  img {
    display: block;
    width: 100%;
    margin: 0 auto;
  }
`;

interface Room {
  id: number;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface FloorProps {
  rooms: Room[];
}

const FloorMap: React.FC<FloorProps> = ({ rooms }) => {
  return (
    <Container>
      <MapArea>
        {rooms.map(room => (
          <Room
            key={room.name}
            name={room.name}
            x={room.x}
            y={room.y}
            width={room.width}
            height={room.height}
          />
        ))}
      </MapArea>
    </Container>
  );
};

export default FloorMap;
