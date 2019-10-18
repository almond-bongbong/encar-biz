import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { RouteComponentProps, useParams } from 'react-router-dom';
import FloorTab from 'components/FloorTab';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/ko';
import { MEETING_ROOMS } from 'constants/meetingRoom';
import FloorMap from 'components/FloorMap';
import Slider, { Settings } from 'react-slick';
import SliderArrow from 'components/SliderArrow';
import ModalPopup from 'components/ModalPopup';
import TimeSelect from 'components/TimeSelect';
import { useDispatch, useSelector } from 'react-redux';
import {
  add30Minutes,
  minus30Minutes,
  selectDateTime,
  selectRoom,
} from 'store/reservation';
import { DATETIME_FORMAT } from 'types';
import { RootState } from 'store';
import ReservationSubmitBar from 'components/ReservationSubmitBar';

type SelectedFloor = string | number;

const Content = styled.div``;

const Recommend = styled.div`
  font-size: 32px;

  p {
    margin-top: 10px;

    em {
      margin: 0 5px;
      font-size: 40px;
      text-decoration: underline;
    }
  }
`;

const DateButton = styled.button`
  display: inline-block;
  margin: 0 0 5px 20px;
  font-size: 22px;
`;

const TimeButton = styled.button`
  display: inline-block;
  font-size: 30px;
`;

const TabWrapper = styled(FloorTab)`
  position: absolute;
  top: 50px;
  right: 20px;

  @media screen and (max-width: 768px) {
    position: static;
    margin-bottom: 30px;
    text-align: right;
  }
`;

const Reservation: React.FC<RouteComponentProps> = ({ history }) => {
  const [showTimeSelect, setShowTimeSelect] = useState<boolean>(false);
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
  const { floor } = useParams();
  const slierIndex = floor === '18' ? 0 : 1;
  const slider = useRef<Slider>(null);
  const dispatch = useDispatch();
  const SLIDER_SETTINGS = useMemo<Settings>(
    () => ({
      infinite: false,
      initialSlide: slierIndex,
      prevArrow: <SliderArrow direction={'left'} />,
      nextArrow: <SliderArrow direction={'right'} />,
      afterChange: (currentSlide: number): void => {
        const newFloor = currentSlide === 0 ? '18' : '19';
        history.push(`/${newFloor}`);
      },
    }),
    [slierIndex, history],
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

  const handleFloor = (value: SelectedFloor): void => {
    history.push(`/${value}`);
  };

  const handleShowSelectTime = (): void => {
    setShowTimeSelect(true);
  };

  const handleHideSelectTime = (): void => {
    setShowTimeSelect(false);
  };

  const handleTime = (selectedTime: string): void => {
    const [hour, minutes] = selectedTime.split(':');
    const newTime = selectedDateTimeMoment
      .set('hours', parseInt(hour, 10))
      .set('minutes', parseInt(minutes, 10))
      .format(DATETIME_FORMAT);

    dispatch(selectDateTime(newTime));
    setShowTimeSelect(false);
  };

  const handleSubmit = (): void => {
    history.push('/reservation/1');
  };

  return (
    <Content>
      <TabWrapper
        value={floor || '18'}
        onClick={handleFloor}
        items={[{ value: '18', label: '18층' }, { value: '19', label: '19층' }]}
      />

      <Recommend>
        <TimeButton type={'button'} onClick={handleShowSelectTime}>
          {selectedDateTimeMoment.format(`A h시 m분`)}
        </TimeButton>
        <DateButton>{selectedDateTimeMoment.format('YYYY.MM.DD')}</DateButton>
        {selectedRoom && (
          <p>
            지금 <em>{selectedRoom.name}</em> 어때?
          </p>
        )}
      </Recommend>

      <Slider ref={slider} {...SLIDER_SETTINGS}>
        <FloorMap rooms={MEETING_ROOMS.filter(r => r.floor === 18)} />
        <FloorMap rooms={MEETING_ROOMS.filter(r => r.floor === 19)} />
      </Slider>

      <ModalPopup
        show={showTimeSelect}
        onClickDim={handleHideSelectTime}
        keyPressESC={handleHideSelectTime}
      >
        <TimeSelect onSelectTime={handleTime} />
      </ModalPopup>

      <ReservationSubmitBar onSubmit={handleSubmit} />
    </Content>
  );
};

export default Reservation;
