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
import { CANTEEN, MEETING_ROOMS } from 'constants/meetingRoom';
import FloorMap from 'components/FloorMap';
import Slider, { Settings } from 'react-slick';
import SliderArrow from 'components/SliderArrow';
import TimeSelect from 'components/TimeSelect';
import { useDispatch, useSelector } from 'react-redux';
import {
  add30Minutes,
  FETCH_RESERVATIONS_REQUEST,
  fetchReservations,
  minus30Minutes,
  selectDateTime,
} from 'store/reservation';
import { DATETIME_FORMAT, Meeting, Room } from 'types';
import { RootState } from 'store';
import { SingleDatePicker } from 'react-dates';
import ModalPopup from 'components/ModalPopup/ModalPopup';
import RoomDetail from 'components/RoomDetail';
import Loader from 'components/Loader';

type SelectedFloor = string | number;

const Content = styled.div``;

const LoaderWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TimeSelectContainer = styled.div`
  position: absolute;
  top: 90px;
  left: 0;
  z-index: 100;
  background-color: #fff;
  box-shadow: 0 2px 4px 5px rgba(100, 100, 100, 0.1);
`;

const DatePickerWrapper = styled.div`
  display: block;
  vertical-align: middle;

  & .DateInput {
    width: 140px;
  }

  & .DateInput_input {
    padding-left: 0;
    color: #444;
    font-weight: 400;
    font-size: 22px;
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
    margin: 0 5px;
    font-size: 40px;
    text-decoration: underline;
  }
`;

const TimeButton = styled.button`
  display: inline-block;
  font-size: 34px;
`;

const Second = styled.span`
  margin-left: 10px;
  color: #666;
  font-size: 24px;
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

const Reservation: React.FC<RouteComponentProps> = ({ history }) => {
  const [showTimeSelect, setShowTimeSelect] = useState<boolean>(false);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const { reservations, selectedDateTime } = useSelector(
    (state: RootState) => state.reservation,
  );
  const loading = useSelector((state: RootState) => state.loading);
  const selectedDateTimeMoment = useMemo(() => moment(selectedDateTime), [
    selectedDateTime,
  ]);
  const { search } = useLocation();
  const { floor } = qs.parse(search);
  const slierIndex = floor === '18' ? 0 : 1;
  const slider = useRef<Slider>(null);
  const [isSwiping, setIsSwiping] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [detailRoomId, setDetailRoomId] = useState<number | null>(null);
  const [selectedDateTimeInterval, setSelectedDateTimeInterval] = useState<
    number | null
  >(null);
  const [eventLivingTimer, setEventLivingTimer] = useState<number | null>(null);
  const recommendRoom = useMemo(() => {
    if (reservations.length > 0) {
      const inUsedRooms = MEETING_ROOMS.filter((room: Room) =>
        reservations.some(
          (r: Meeting) =>
            room.id === r.roomId &&
            selectedDateTimeMoment.isBetween(r.start, r.end),
        ),
      );
      const unUsedRooms = MEETING_ROOMS.filter(
        (room: Room) => !inUsedRooms.some((r: Room) => room.id === r.id),
      );
      const randomIndex = Math.floor(Math.random() * unUsedRooms.length);
      return unUsedRooms[randomIndex] || CANTEEN;
    }
  }, [reservations, selectedDateTimeMoment]);

  const changeFloor = useCallback(
    (floor: SelectedFloor): void => {
      history.push(`/?floor=${floor}`);
    },
    [history],
  );

  const SLIDER_SETTINGS = useMemo<Settings>(
    () => ({
      speed: 400,
      infinite: false,
      initialSlide: slierIndex,
      prevArrow: <SliderArrow direction={'left'} />,
      nextArrow: <SliderArrow direction={'right'} />,
      beforeChange: (): void => {
        setIsSwiping(true);
      },
      afterChange: (currentSlide: number): void => {
        setIsSwiping(false);
        const newFloor = currentSlide === 0 ? '18' : '19';
        changeFloor(newFloor);
      },
    }),
    [slierIndex, changeFloor],
  );

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === 'ArrowUp') {
        dispatch(add30Minutes());
        e.preventDefault();
      }
      if (e.code === 'ArrowDown') {
        dispatch(minus30Minutes());
        e.preventDefault();
      }
    },
    [dispatch],
  );

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
        startInterval();
      }, 60 * 1000),
    );
  }, [startInterval, eventLivingTimer, selectedDateTimeInterval]);

  useEffect(() => {
    window.addEventListener('mousedown', liveEventListener);
    window.addEventListener('touchstart', liveEventListener);

    return (): void => {
      window.removeEventListener('mousedown', liveEventListener);
      window.removeEventListener('touchstart', liveEventListener);
    };
  }, [liveEventListener]);

  useEffect(() => {
    startInterval();
  }, [startInterval]);

  useEffect(() => {
    dispatch(fetchReservations.request());
  }, [dispatch]);

  // useEffect(() => {
  //   if (reservations) {
  //     const unUsedRooms = MEETING_ROOMS.filter(
  //       room => !isUseRooms.some(isUseRoom => isUseRoom.id === room.id),
  //     );
  //     const randomIndex = Math.floor(Math.random() * unUsedRooms.length);
  //     const randomRoom = unUsedRooms[randomIndex];
  //
  //     console.log(randomRoom);
  //
  //     if (randomRoom) {
  //       dispatch(selectRoom(unUsedRooms[randomIndex].id));
  //     } else {
  //       dispatch(selectRoom(null));
  //     }
  //   }
  // }, [dispatch]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return (): void => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    if (slider.current) {
      slider.current.slickGoTo(slierIndex);
    }
  }, [floor, slierIndex]);

  const handleTime = (selectedTime: string): void => {
    const [hour, minutes] = selectedTime.split(':');
    const newDateTime = selectedDateTimeMoment
      .set('hours', parseInt(hour, 10))
      .set('minutes', parseInt(minutes, 10))
      .format(DATETIME_FORMAT);

    dispatch(selectDateTime(newDateTime));
    setShowTimeSelect(false);
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
    setDetailRoomId(roomId);
  };

  return (
    <Content>
      {loading[FETCH_RESERVATIONS_REQUEST] ? (
        <LoaderWrapper>
          <Loader color={'blue'} size={80} />
        </LoaderWrapper>
      ) : (
        <>
          <TabWrapper
            value={(Array.isArray(floor) ? floor[0] : floor) || '19'}
            onClick={changeFloor}
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

            <TimeButton
              type={'button'}
              onFocus={(): void => setShowTimeSelect(true)}
              onBlur={(): void => setShowTimeSelect(false)}
            >
              {selectedDateTimeMoment.format(`A h시 m분`)}
              {selectedDateTimeInterval && (
                <Second>{`${moment().format('ss')}초`}</Second>
              )}
            </TimeButton>

            {recommendRoom && (
              <Recommend>
                지금 <em>{recommendRoom.name}</em> 어때?
              </Recommend>
            )}

            {showTimeSelect && (
              <TimeSelectContainer>
                <TimeSelect onSelectTime={handleTime} />
              </TimeSelectContainer>
            )}
          </RecommendArea>

          <Slider ref={slider} {...SLIDER_SETTINGS}>
            <FloorMap
              rooms={MEETING_ROOMS.filter(r => r.floor === 18)}
              recommendRoom={recommendRoom}
              onClickRoom={handleClickRoom}
              isSwiping={isSwiping}
            />
            <FloorMap
              rooms={MEETING_ROOMS.filter(r => r.floor === 19)}
              recommendRoom={recommendRoom}
              onClickRoom={handleClickRoom}
              isSwiping={isSwiping}
            />
          </Slider>

          <ModalPopup
            show={detailRoomId != null}
            onClickDim={(): void => setDetailRoomId(null)}
          >
            {detailRoomId != null && (
              <RoomDetail
                selectedDateTime={selectedDateTime}
                roomId={detailRoomId}
                submitLoading={false}
                onClickReservation={(): void => {}}
                onClose={(): void => setDetailRoomId(null)}
              />
            )}
          </ModalPopup>

          {/*<ModalPopup show={showResult} onClickDim={handleCloseResultPopup}>
            <ReservationResult />
          </ModalPopup>*/}
        </>
      )}
    </Content>
  );
};

export default Reservation;
