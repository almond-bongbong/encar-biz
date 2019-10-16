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
import moment, { Moment } from 'moment';
import 'moment/locale/ko';
import { MEETING_ROOM_18, MEETING_ROOM_19 } from 'constants/meetingRoom';
import FloorMap from 'components/FloorMap';
import Slider, { Settings } from 'react-slick';
import SliderArrow from 'components/SliderArrow';
import ModalPopup from 'components/ModalPopup';
import TimeSelect from 'components/TimeSelect';

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

enum CalcType {
  PLUS,
  MINUS,
}

const calcRoundMinutes = (
  time: Moment,
  step: number,
  calcType: CalcType,
): Moment => {
  const minutes = parseInt(time.format('mm'), 10);

  if (minutes % step === 0) {
    const diff = calcType === CalcType.PLUS ? 30 : -30;
    return time.clone().add(diff, 'minutes');
  } else {
    const diff =
      calcType === CalcType.PLUS
        ? Math.ceil(minutes / 30) * 30 - minutes
        : -(minutes - Math.floor(minutes / 30) * 30);
    return time.clone().add(diff, 'minutes');
  }
};

const add30Minutes = (time: Moment): Moment =>
  calcRoundMinutes(time, 30, CalcType.PLUS);

const minus30Minutes = (time: Moment): Moment =>
  calcRoundMinutes(time, 30, CalcType.MINUS);

const SmartBooking: React.FC<RouteComponentProps> = ({ history }) => {
  const [time, setTime] = useState<Moment>(moment());
  const [showTimeSelect, setShowTimeSelect] = useState<boolean>(false);
  const { floor } = useParams();
  const slierIndex = floor === '19' ? 1 : 0;
  const slider = useRef<Slider>(null);
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

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    e.preventDefault();

    if (e.code === 'ArrowUp') {
      setTime(add30Minutes);
    }
    if (e.code === 'ArrowDown') {
      setTime(minus30Minutes);
    }
  }, []);

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
    const newTime = moment(time)
      .set('hours', parseInt(hour, 10))
      .set('minutes', parseInt(minutes, 10));

    setTime(newTime);
    setShowTimeSelect(false);
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
          {time.format(`A h시 m분`)}
        </TimeButton>
        <DateButton>{time.format('YYYY.MM.DD')}</DateButton>
        <p>
          지금 <em>산토리니</em> 어때?
        </p>
      </Recommend>
      <Slider ref={slider} {...SLIDER_SETTINGS}>
        <FloorMap rooms={MEETING_ROOM_18} />
        <FloorMap rooms={MEETING_ROOM_19} />
      </Slider>
      <ModalPopup
        show={showTimeSelect}
        onClickDim={handleHideSelectTime}
        keyPressESC={handleHideSelectTime}
      >
        <TimeSelect onSelectTime={handleTime} />
      </ModalPopup>
    </Content>
  );
};

export default SmartBooking;
