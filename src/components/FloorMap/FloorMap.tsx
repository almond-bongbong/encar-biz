import React, { useEffect } from 'react';
import styled from 'styled-components';
import RoomBox from 'components/Room';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Room } from 'types';
import 'jquery';
import ResponsiveImageMap from 'image-map';
import Stair from 'components/Stair';
import redArrowDown from 'resources/images/reservation/red-arrow-down.png';
import { useChangeFloor } from 'hooks/reservation';

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

const StairOn18 = styled(Stair)`
  position: absolute;
  top: 0;
  left: 75%;
  transform: translateX(-50%);
`;

const StairOn19 = styled(Stair)`
  position: absolute;
  bottom: 0;
  left: 40%;
  transform: translateX(-50%);
`;

const FloorMap: React.FC<FloorProps> = ({
  floor,
  floorPlan,
  rooms,
  onClickRoom,
  isSwiping,
}) => {
  const mapName = `image-map${floor}`;
  const changeFloor = useChangeFloor();
  const { reservations, recommendRoom } = useSelector(
    (state: RootState) => state.reservation,
  );

  useEffect(() => {
    ResponsiveImageMap('img[usemap]');
  });

  const handleClickRoom = (id: number): void => {
    console.log('click room');
    if (!isSwiping) {
      onClickRoom(id);
    }
  };

  const handleFloor = (floor: number): void => {
    changeFloor(floor);
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

        {floor === 18 && (
          <StairOn18 direction={'up'} onClick={(): void => handleFloor(19)} />
        )}
        {floor === 19 && (
          <StairOn19 direction={'down'} onClick={(): void => handleFloor(18)} />
        )}
      </MapArea>
    </Container>
  );
};

export default FloorMap;
