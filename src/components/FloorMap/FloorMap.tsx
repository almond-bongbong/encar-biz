import React from 'react';
import styled from 'styled-components';
import RoomBox from 'components/Room';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Room } from '../../types';

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
  isSwiping?: boolean;
  recommendRoom?: Room;
  onClickRoom: (roomId: number) => void;
}

const FloorMap: React.FC<FloorProps> = ({ rooms, onClickRoom, isSwiping }) => {
  const { reservations, recommendRoom } = useSelector(
    (state: RootState) => state.reservation,
  );

  return (
    <Container>
      <MapArea>
        {rooms.map(room => {
          return (
            <RoomBox
              key={room.id}
              id={room.id}
              name={room.name}
              x={room.x}
              y={room.y}
              width={room.width}
              height={room.height}
              selected={recommendRoom ? room.id === recommendRoom.id : false}
              onClickRoom={onClickRoom}
              meetings={reservations.filter(r => r.roomId === room.id)}
              isSwiping={isSwiping}
            />
          );
        })}
      </MapArea>
    </Container>
  );
};

export default FloorMap;
