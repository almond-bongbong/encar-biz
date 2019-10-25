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
import FloorMap from 'components/FloorMap';
import Slider, { Settings } from 'react-slick';
import SliderArrow from 'components/SliderArrow';
import TimeSelect from 'components/TimeSelect';
import { useDispatch, useSelector } from 'react-redux';
import {
  add30Minutes,
  fetchReservations,
  minus30Minutes,
  selectDateTime,
  selectRoom,
} from 'store/reservation';
import { DATETIME_FORMAT } from 'types';
import { RootState } from 'store';
import { SingleDatePicker } from 'react-dates';
import ModalPopup from 'components/ModalPopup/ModalPopup';
import RoomDetail from 'components/RoomDetail';

type SelectedFloor = string | number;

const Content = styled.div``;

const TimeSelectContainer = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  z-index: 100;
  background-color: #fff;
  box-shadow: 0 2px 4px 5px rgba(100, 100, 100, 0.1);
`;

const DatePickerWrapper = styled.div`
  display: block;
  margin-bottom: 15px;
  vertical-align: middle;

  & .DateInput {
    width: 140px;
  }

  & .DateInput_input {
    padding: 0;
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
  const selectedRoomId = useSelector(
    (state: RootState) => state.reservation.selectedRoomId,
  );
  const selectedRoom = MEETING_ROOMS.find(r => r.id === selectedRoomId);
  const selectedDateTime = useSelector(
    (state: RootState) => state.reservation.selectedDateTime,
  );
  const selectedDateTimeMoment = useMemo(() => moment(selectedDateTime), [
    selectedDateTime,
  ]);
  const { search } = useLocation();
  const { floor } = qs.parse(search);
  const slierIndex = floor === '18' ? 0 : 1;
  const slider = useRef<Slider>(null);
  const dispatch = useDispatch();
  const [detailRoomId, setDetailRoomId] = useState<number | null>(null);

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
      afterChange: (currentSlide: number): void => {
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

  useEffect(() => {
    dispatch(fetchReservations.request());
    dispatch(selectRoom(1));
  }, [dispatch]);

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
      <TabWrapper
        value={(Array.isArray(floor) ? floor[0] : floor) || '19'}
        onClick={changeFloor}
        items={[{ value: '18', label: '18F.' }, { value: '19', label: '19F.' }]}
      />

      <RecommendArea>
        <DatePickerWrapper>
          <SingleDatePicker
            id={'datepicker'}
            date={selectedDateTimeMoment}
            onDateChange={handleDate}
            focused={showCalendar}
            onFocusChange={({ focused }): void => setShowCalendar(!!focused)}
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
        </TimeButton>

        {selectedRoom && (
          <Recommend>
            지금 <em>{selectedRoom.name}</em> 어때?
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
          onClickRoom={handleClickRoom}
        />
        <FloorMap
          rooms={MEETING_ROOMS.filter(r => r.floor === 19)}
          onClickRoom={handleClickRoom}
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
    </Content>
  );
};

export default Reservation;
