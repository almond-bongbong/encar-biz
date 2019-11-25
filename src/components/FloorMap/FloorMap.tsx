import React, { useEffect } from 'react';
import styled from 'styled-components';
import RoomBox from 'components/Room';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Room } from 'types';
import 'jquery';
import arrow from 'resources/images/reservation/icon-arrow.png';
import iconHere from 'resources/images/reservation/icon-here.png';
import iconCanteen from 'resources/images/reservation/icon-canteen.png';

interface FloorProps {
  floor: number;
  floorPlan: string;
  rooms: Room[];
  isSwiping?: boolean;
  recommendRoom?: Room;
  onClickRoom: (roomId: number) => void;
}

const Container = styled.div``;

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
  transform: translate(-50%, -70px);
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

const Here18 = styled.img`
  position: absolute;
  top: 25%;
  left: 60%;
`;

const Canteen18 = styled.img`
  position: absolute;
  bottom: 17%;
  left: 30%;
`;

const FloorMap: React.FC<FloorProps> = ({
  floor,
  floorPlan,
  rooms,
  onClickRoom,
  isSwiping,
}) => {
  const mapName = `image-map${floor}`;
  const { reservations, selectedRoomId } = useSelector(
    (state: RootState) => state.reservation,
  );
  const selectedRoom = rooms.find(r => r.id === selectedRoomId);

  useEffect(() => {
    (window as any).imageMapResize();
  }, []);

  const handleClickRoom = (id: number): void => {
    if (!isSwiping) {
      onClickRoom(id);
    }
  };

  return (
    <Container>
      <MapArea>
        <FloorImage src={floorPlan} alt="도면" useMap={`#${mapName}`} />

        <ImageMap name={mapName}>
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
            polyPosition={room.polyPosition}
            polySize={room.polySize}
            polyPoints={room.polyPoints}
            meetings={reservations.filter(r => r.room.id === room.id)}
          />
        ))}

        <Marker
          x={selectedRoom ? selectedRoom.x : -9999}
          y={selectedRoom ? selectedRoom.y : -9999}
          src={arrow}
          alt={`선택된 회의실`}
        />

        {floor === 18 && (
          <>
            <Here18 src={iconHere} />
            <Canteen18 src={iconCanteen} />
          </>
        )}
      </MapArea>
    </Container>
  );
};

export default FloorMap;
