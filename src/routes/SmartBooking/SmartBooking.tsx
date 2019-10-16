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
import FloorMap from 'components/FloorMap';
import Slider, { Settings } from 'react-slick';
import SliderArrow from 'components/SliderArrow';
import { MEETING_ROOM_18, MEETING_ROOM_19 } from 'constants/meetingRoom';

type SelectedFloor = string | number;

const Content = styled.div``;

const Recommend = styled.div`
  font-size: 28px;

  p {
    margin-top: 10px;

    em {
      margin: 0 5px;
      font-size: 36px;
      text-decoration: underline;
    }
  }
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

  return (
    <Content>
      <TabWrapper
        value={floor || '18'}
        onClick={handleFloor}
        items={[{ value: '18', label: '18층' }, { value: '19', label: '19층' }]}
      />
      <Recommend>
        <div className="time">{time.format(`A h시 m분`)}</div>
        <p>
          지금 <em>산토리니</em> 어때?
        </p>
      </Recommend>
      <Slider ref={slider} {...SLIDER_SETTINGS}>
        <FloorMap rooms={MEETING_ROOM_18} />
        <FloorMap rooms={MEETING_ROOM_19} />
      </Slider>
    </Content>
  );
};

export default SmartBooking;
