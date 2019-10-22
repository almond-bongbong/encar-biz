import React from 'react';
import styled from 'styled-components';
import Room from 'components/Room';
import { RESERVATIONS } from 'constants/dummyData';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const Container = styled.div`
  padding: 20px;
`;

const MapArea = styled.div`
  position: relative;
  margin-top: 50px;
  padding-top: 75%;
  background-color: #ddd;
`;

interface FloorProps {
  rooms: {
    id: number;
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
  }[];
  onClickRoom: (roomId: number) => void;
}

const FloorMap: React.FC<FloorProps> = ({ rooms, onClickRoom }) => {
  const selectedRoomId = useSelector(
    (state: RootState) => state.reservation.selectedRoomId,
  );

  return (
    <Container>
      <MapArea>
        {rooms.map(room => {
          return (
            <Room
              key={room.id}
              id={room.id}
              name={room.name}
              x={room.x}
              y={room.y}
              width={room.width}
              height={room.height}
              selected={room.id === selectedRoomId}
              onClickRoom={onClickRoom}
              meetings={RESERVATIONS.filter(r => r.roomId === room.id)}
            />
          );
        })}
      </MapArea>
    </Container>
  );
};

export default FloorMap;
