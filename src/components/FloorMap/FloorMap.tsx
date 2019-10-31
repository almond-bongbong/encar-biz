import React, { useEffect } from 'react';
import styled from 'styled-components';
import RoomBox from 'components/Room';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Room } from 'types';
import 'jquery';
import ResponsiveImageMap from 'image-map';
import redArrowDown from 'resources/images/reservation/red-arrow-down.png';

interface FloorProps {
  floor: number;
  floorPlan: string;
  rooms: Room[];
  isSwiping?: boolean;
  recommendRoom?: Room;
  onClickRoom: (roomId: number) => void;
}

const Container = styled.div`
  margin-top: 50px;
`;

const MapArea = styled.div`
  position: relative;
`;

const FloorImage = styled.img`
  width: 100%;
`;

const ImageMap = styled.map`
  position: relative;
  z-index: 100;

  & area {
    cursor: pointer;
  }
`;

interface MarkerProps {
  x: number;
  y: number;
}

const Marker = styled.img<MarkerProps>`
  position: absolute;
  left: ${({ x }): number => x}%;
  top: ${({ y }): number => y}%;
  width: 40px;
  font-size: 20px;
  transform: translate(-50%, -60px);
  animation: point 0.5s infinite alternate;

  @keyframes point {
    from {
      margin-top: -10px;
    }
    to {
      margin-top: 0;
    }
  }
`;

const FloorMap: React.FC<FloorProps> = ({
  floor,
  floorPlan,
  rooms,
  onClickRoom,
  isSwiping,
}) => {
  const { reservations, recommendRoom } = useSelector(
    (state: RootState) => state.reservation,
  );

  useEffect(() => {
    ResponsiveImageMap('img[usemap]');
  });

  const handleClickRoom = (id: number): void => {
    if (!isSwiping) {
      onClickRoom(id);
    }
  };

  return (
    <Container>
      <MapArea>
        <FloorImage src={floorPlan} alt="도면" useMap="#image-map" />

        <ImageMap name="image-map">
          {rooms.map(room => (
            <area
              key={room.id}
              alt={room.name}
              title={room.name}
              onClick={(): void => handleClickRoom(room.id)}
              coords={room.coords}
              shape="poly"
            />
          ))}
        </ImageMap>

        {rooms.map(room => (
          <RoomBox
            key={room.id}
            id={room.id}
            name={room.name}
            x={room.x}
            y={room.y}
            meetings={reservations.filter(r => r.roomId === room.id)}
          />
        ))}

        {recommendRoom && recommendRoom.floor === floor && (
          <Marker
            x={recommendRoom.x}
            y={recommendRoom.y}
            src={redArrowDown}
            alt={`${recommendRoom.name} 회의실 추천`}
          />
        )}
      </MapArea>
    </Container>
  );
};

export default FloorMap;
