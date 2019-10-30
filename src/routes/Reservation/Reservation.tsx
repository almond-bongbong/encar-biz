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
import Slider from 'react-slick';
import TimeSelect from 'components/TimeSelect';
import { useDispatch, useSelector } from 'react-redux';
import {
  add30Minutes,
  FETCH_RESERVATIONS_REQUEST,
  fetchReservations,
  minus30Minutes,
  selectDateTime,
  setRecommendRoom,
} from 'store/reservation';
import { DATETIME_FORMAT, Meeting, Room } from 'types';
import { RootState } from 'store';
import { SingleDatePicker } from 'react-dates';
import ModalPopup from 'components/ModalPopup/ModalPopup';
import RoomDetail from 'components/RoomDetail';
import Loader from 'components/Loader';
import FloorSlider from 'components/FloorSlider';

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
    margin-right: 5px;
    font-size: 40px;
    text-decoration: underline;
  }
`;

const TimeButton = styled.button`
  display: inline-block;
  font-size: 40px;
`;

const Now = styled.span`
  margin-right: 10px;
  font-size: 30px;
`;

const Second = styled.span`
  margin-left: 10px;
  font-size: 22px;
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
  const { reservations, selectedDateTime, recommendRoom } = useSelector(
    (state: RootState) => state.reservation,
  );
  const loading = useSelector((state: RootState) => state.loading);
  const selectedDateTimeMoment = useMemo(() => moment(selectedDateTime), [
    selectedDateTime,
  ]);
  const { search } = useLocation();
  const { floor } = qs.parse(search);
  const sliderIndex = floor === '18' ? 0 : 1;
  const slider = useRef<Slider>(null);
  const dispatch = useDispatch();
  const [detailRoomId, setDetailRoomId] = useState<number | null>(null);
  const [selectedDateTimeInterval, setSelectedDateTimeInterval] = useState<
    number | null
  >(null);
  const [eventLivingTimer, setEventLivingTimer] = useState<number | null>(null);

  const changeFloor = useCallback(
    (floor: SelectedFloor): void => {
      history.push(`/?floor=${floor}`);
    },
    [history],
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
    if (reservations.length > 0) {
      const currentFloor = sliderIndex === 0 ? 18 : 19;
      const inUsedRooms = MEETING_ROOMS.filter((room: Room) =>
        reservations.some(
          (r: Meeting) =>
            room.id === r.roomId &&
            selectedDateTimeMoment.isBetween(r.start, r.end),
        ),
      );
      const unUsedRooms = MEETING_ROOMS.filter(
        (room: Room) =>
          !inUsedRooms.some((r: Room) => room.id === r.id) &&
          room.floor === currentFloor,
      );
      const randomIndex = Math.floor(Math.random() * unUsedRooms.length);

      dispatch(setRecommendRoom(unUsedRooms[randomIndex] || CANTEEN));
    }
  }, [reservations, selectedDateTimeMoment, sliderIndex, dispatch]);

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
    dispatch(fetchReservations.request());
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return (): void => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    if (slider.current) {
      slider.current.slickGoTo(sliderIndex);
    }
  }, [floor, sliderIndex]);

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
              {selectedDateTimeInterval && <Now>지금</Now>}
              {selectedDateTimeMoment.format(`A h시 m분`)}
              {selectedDateTimeInterval && (
                <Second>{`${moment().format('ss')}초`}</Second>
              )}
            </TimeButton>

            {recommendRoom && (
              <Recommend>
                <em>{recommendRoom.name}</em> 어때?
              </Recommend>
            )}

            {showTimeSelect && (
              <TimeSelectContainer>
                <TimeSelect onSelectTime={handleTime} />
              </TimeSelectContainer>
            )}
          </RecommendArea>

          <FloorSlider
            sliderRef={slider}
            sliderIndex={sliderIndex}
            onChangeFloor={changeFloor}
            onClickRoom={handleClickRoom}
          />

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
