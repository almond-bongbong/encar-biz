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
import iconRetire from 'resources/images/reservation/icon-retiring.png';
import useInUsedReservations from 'hooks/reservation/useInUsedReservations';
import { MEETING_ROOMS } from '../../constants/meetingRoom';

interface FloorProps {
  floor: number;
  floorPlan: string;
  rooms: Room[];
  isSwiping?: boolean;
  recommendRoom?: Room;
  onClickRoom: (roomId: number) => void;
}

interface ReservationTitleProps {
  x: number;
  y: number;
}

const Container = styled.div`
  position: relative;
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
  top: 29%;
  left: 59%;
  width: 70px;
`;

const Canteen18 = styled.img`
  position: absolute;
  bottom: 18%;
  left: 31%;
  width: 70px;
`;

const Retire18 = styled.img`
  position: absolute;
  bottom: 42%;
  left: 21%;
  width: 70px;
`;

const Here19 = styled.img`
  position: absolute;
  top: 29%;
  left: 59%;
  width: 70px;
`;

const Canteen19 = styled.img`
  position: absolute;
  bottom: 44%;
  left: 47%;
  width: 70px;
`;

const Retire19 = styled.img`
  position: absolute;
  bottom: 16%;
  left: 35%;
  width: 60px;
`;

const ReservationTitle = styled.div<ReservationTitleProps>`
  position: absolute;
  left: ${({ x }): number => x}%;
  top: ${({ y }): number => y}%;
  z-index: 100;
  padding: 6px 12px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.85);
  color: #000;
  font-size: 15px;
  white-space: nowrap;
  transform: translate(-50%, -60px);

  &:after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid rgba(255, 255, 255, 0.85);
    transform: translateX(-50%);
  }
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
  const inUsedReservations = useInUsedReservations(floor);

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
            <Retire18 src={iconRetire} />
          </>
        )}

        {floor === 19 && (
          <>
            <Here19 src={iconHere} />
            <Canteen19 src={iconCanteen} />
            <Retire19 src={iconRetire} />
          </>
        )}
      </MapArea>

      {inUsedReservations.map(r => {
        const room = MEETING_ROOMS.find(room => room.id === r.room.id);
        return (
          room &&
          selectedRoomId !== r.room.id && (
            <ReservationTitle
              key={r.id}
              x={room ? room.x : -9999}
              y={room ? room.y : -9999}
            >
              {r.name}
            </ReservationTitle>
          )
        );
      })}
    </Container>
  );
};

export default FloorMap;
