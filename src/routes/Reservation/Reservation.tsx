import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import qs from 'query-string';
import { RouteComponentProps, useLocation } from 'react-router-dom';
import FloorTab from 'components/FloorTab';
import styled from 'styled-components';
import moment, { Moment } from 'moment';
import 'moment/locale/ko';
import { MEETING_ROOMS } from 'constants/meetingRoom';
import Slider from 'react-slick';
import TimeSelect from 'components/TimeSelect';
import { useDispatch, useSelector } from 'react-redux';
import {
  add30Minutes,
  FETCH_RESERVATIONS_REQUEST,
  fetchReservations,
  minus30Minutes,
  selectDateTime,
  setRecommendRoomId,
  setSelectedRoomId,
} from 'store/reservation';
import { DATE_FORMAT, DATETIME_FORMAT, Meeting, Room } from 'types';
import { RootState } from 'store';
import { SingleDatePicker } from 'react-dates';
import { SidePanel, Loader } from 'components/common';
import RoomDetail from 'components/RoomDetail';
import FloorSlider from 'components/FloorSlider';
import { useChangeFloor } from 'hooks/reservation';
import bg18 from 'resources/images/main/bg-18.jpg';
import bg19 from 'resources/images/main/bg-19.jpg';
import useIsUseRoom from 'hooks/reservation/useIsUseRoom';
import HeartButton from '../../components/HeartButton';

type SelectedFloor = string | number;

interface BackgroundProps {
  currentFloor: number;
}

const Container = styled.div``;

const Content = styled.div`
  position: relative;
  width: 1000px;
  max-width: 100%;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Background = styled.div<BackgroundProps>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url(${({ currentFloor }): string =>
    currentFloor === 18 ? bg18 : bg19});
  background-repeat: no-repeat;
  background-size: cover;
  transition: all 0.4s;

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

const LoaderWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const DatePickerWrapper = styled.div`
  display: block;
  vertical-align: middle;

  & .SingleDatePickerInput {
    background: transparent;
  }

  & .DateInput {
    width: 140px;
    background: transparent;
  }

  & .DateInput_input {
    padding-left: 0;
    background: transparent;
    color: #eee;
    font-weight: 400;
    font-size: 22px;
    font-family: inherit;
  }

  & .DateInput_fang {
    margin-top: 1px;
  }
`;

const RecommendArea = styled.div`
  position: relative;
`;

const Recommend = styled.p`
  margin-top: 10px;
  font-size: 28px;

  em {
    margin-right: 10px;
    font-size: 40px;
    text-decoration: underline;
  }
`;

const TabWrapper = styled(FloorTab)`
  position: absolute;
  top: 50px;
  right: 20px;
  z-index: 10;

  @media screen and (max-width: 768px) {
    position: static;
    margin-bottom: 30px;
    text-align: right;
  }
`;

const FloorSliderWrapper = styled.div`
  position: relative;
  margin-top: 30px;
`;

const Reservation: React.FC<RouteComponentProps> = () => {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const {
    reservations,
    selectedDateTime,
    recommendRoomId,
    selectedRoomId,
  } = useSelector((state: RootState) => state.reservation);
  const recommendRoom = MEETING_ROOMS.find(r => r.id === recommendRoomId) || {
    name: '캔틴',
  };
  const selectedRoom = MEETING_ROOMS.find(r => r.id === selectedRoomId);
  const isUseSelectedRoom = useIsUseRoom(selectedRoomId || -1);
  const loading = useSelector((state: RootState) => state.loading);
  const selectedDateTimeMoment = useMemo(() => moment(selectedDateTime), [
    selectedDateTime,
  ]);
  const { search } = useLocation();
  const { floor } = qs.parse(search);
  const currentFloor = parseInt(floor ? floor.toString() : '18');
  const sliderIndex = currentFloor === 18 ? 1 : 0;
  const slider = useRef<Slider>(null);
  const dispatch = useDispatch();
  const [selectedDateTimeInterval, setSelectedDateTimeInterval] = useState<
    number | null
  >(null);
  const [eventLivingTimer, setEventLivingTimer] = useState<number | null>(null);
  const changeFloor = useChangeFloor();

  const handleFloor = useCallback(
    (floor: SelectedFloor): void => {
      changeFloor(floor);
    },
    [changeFloor],
  );

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (slider.current) {
        if (e.code === 'ArrowUp') {
          slider.current.slickPrev();
        }
        if (e.code === 'ArrowDown') {
          slider.current.slickNext();
        }
      }
      if (e.code === 'ArrowRight') {
        dispatch(add30Minutes());
        e.preventDefault();
      }
      if (e.code === 'ArrowLeft') {
        dispatch(minus30Minutes());
        e.preventDefault();
      }
    },
    [dispatch],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return (): void => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const startInterval = useCallback((): void => {
    setSelectedDateTimeInterval(
      setInterval(() => {
        dispatch(selectDateTime(moment().format(DATETIME_FORMAT)));
      }, 1000),
    );
  }, [dispatch]);

  const liveEventListener = useCallback((): void => {
    if (selectedDateTimeInterval) {
      clearInterval(selectedDateTimeInterval);
      setSelectedDateTimeInterval(null);
    }
    if (eventLivingTimer) {
      clearTimeout(eventLivingTimer);
      setEventLivingTimer(null);
    }
    setEventLivingTimer(
      setTimeout(() => {
        dispatch(setSelectedRoomId(null));
        startInterval();
      }, 60 * 1000),
    );
  }, [dispatch, startInterval, eventLivingTimer, selectedDateTimeInterval]);

  useEffect(() => {
    if (reservations.length > 0) {
      const inUsedRooms = MEETING_ROOMS.filter((room: Room) =>
        reservations.some(
          (r: Meeting) =>
            room.id === r.room.id &&
            selectedDateTimeMoment.isBetween(
              r.startedAt,
              r.endedAt,
              undefined,
              '[]',
            ),
        ),
      );
      const unUsedRoomsOnFloor = MEETING_ROOMS.filter(
        (room: Room) =>
          !inUsedRooms.some((r: Room) => room.id === r.id) &&
          room.floor === currentFloor,
      );

      if (
        !recommendRoomId ||
        !unUsedRoomsOnFloor.find(room => room.id === recommendRoomId)
      ) {
        const randomIndex = Math.floor(
          Math.random() * unUsedRoomsOnFloor.length,
        );
        dispatch(
          setRecommendRoomId(
            unUsedRoomsOnFloor[randomIndex]
              ? unUsedRoomsOnFloor[randomIndex].id
              : -1,
          ),
        );
      }
    }
  }, [
    currentFloor,
    recommendRoomId,
    reservations,
    selectedDateTimeMoment,
    dispatch,
  ]);

  useEffect(() => {
    window.addEventListener('mousedown', liveEventListener);
    window.addEventListener('touchstart', liveEventListener);
    window.addEventListener('keydown', liveEventListener);

    return (): void => {
      window.removeEventListener('mousedown', liveEventListener);
      window.removeEventListener('touchstart', liveEventListener);
      window.removeEventListener('keydown', liveEventListener);
    };
  }, [liveEventListener]);

  useEffect(() => {
    startInterval();
  }, [startInterval]);

  useEffect(() => {
    dispatch(
      fetchReservations.request(selectedDateTimeMoment.format(DATE_FORMAT)),
    );
  }, [dispatch, selectedDateTimeMoment]);

  useEffect(() => {
    if (slider.current) {
      slider.current.slickGoTo(sliderIndex);
    }
  }, [floor, sliderIndex]);

  const handleTime = (selectedTime: string): void => {
    const [hour, minutes] = selectedTime.split(':');
    const newDateTime = selectedDateTimeMoment
      .clone()
      .set('hours', parseInt(hour, 10))
      .set('minutes', parseInt(minutes, 10))
      .format(DATETIME_FORMAT);

    dispatch(selectDateTime(newDateTime));
  };

  const handleDate = (selectedDate: Moment | null): void => {
    if (selectedDate) {
      const newDateTime = selectedDate
        .set('hours', selectedDateTimeMoment.get('hours'))
        .set('minutes', selectedDateTimeMoment.get('minutes'))
        .format(DATETIME_FORMAT);
      dispatch(selectDateTime(newDateTime));
    }

    setShowCalendar(false);
  };

  const handleClickRoom = (roomId: number): void => {
    dispatch(setSelectedRoomId(roomId));
  };

  return (
    <Container>
      <>
        <Background currentFloor={currentFloor} />

        <Content>
          <TabWrapper
            value={(Array.isArray(floor) ? floor[0] : floor) || '19'}
            onClick={handleFloor}
            items={[
              { value: '18', label: '18F.' },
              { value: '19', label: '19F.' },
            ]}
          />

          <RecommendArea>
            <DatePickerWrapper>
              <SingleDatePicker
                id={'datepicker'}
                date={selectedDateTimeMoment}
                onDateChange={handleDate}
                focused={showCalendar}
                onFocusChange={({ focused }): void =>
                  setShowCalendar(!!focused)
                }
                hideKeyboardShortcutsPanel={true}
                monthFormat={'YYYY MMMM'}
                displayFormat={'YYYY.MM.DD'}
                numberOfMonths={1}
                noBorder={true}
                readOnly
              />
            </DatePickerWrapper>

            <TimeSelect
              value={selectedDateTimeMoment}
              timerActivated={!!selectedDateTimeInterval}
              onSelectTime={handleTime}
            />

            {selectedRoom && (
              <Recommend>
                <em>{selectedRoom.name}</em>
                {isUseSelectedRoom ? '사용중 🙅‍♂️️' : '예약가능 🙆‍♀️️'}
              </Recommend>
            )}
            {!selectedRoom && recommendRoom && (
              <Recommend>
                <em>{recommendRoom.name}</em>어때?
              </Recommend>
            )}
          </RecommendArea>

          <FloorSliderWrapper tabIndex={0}>
            <FloorSlider
              sliderRef={slider}
              sliderIndex={sliderIndex}
              onChangeFloor={handleFloor}
              onClickRoom={handleClickRoom}
            />
          </FloorSliderWrapper>

          <SidePanel
            show={selectedRoomId != null}
            closeHandler={(): void => {
              dispatch(setSelectedRoomId(null));
            }}
          >
            {selectedRoomId && (
              <RoomDetail
                selectedDateTime={selectedDateTime}
                roomId={selectedRoomId}
              />
            )}
          </SidePanel>
        </Content>
      </>
      <HeartButton />
      {loading[FETCH_RESERVATIONS_REQUEST] && (
        <LoaderWrapper>
          <Loader color={'blue'} size={80} />
        </LoaderWrapper>
      )}
    </Container>
  );
};

export default Reservation;
