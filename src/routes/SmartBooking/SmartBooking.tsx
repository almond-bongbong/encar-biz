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

type selectedFloor = string | number;

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

const SmartBooking: React.FC<RouteComponentProps> = ({ history }) => {
  const [time, setTime] = useState<Moment>(moment());
  const accDirectionValue = useRef<number>(0);
  const direction = useRef<'UP' | 'DOWN' | null>(null);
  const { floor } = useParams();
  const slierIndex = floor === '19' ? 1 : 0;
  const slider = useRef<Slider>(null);
  // const nowTime = moment().format(`A h시 m분`);
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

  const handleWheel = useCallback((e: WheelEvent) => {
    if (e.deltaY > 0) {
      if (direction.current === 'DOWN') {
        accDirectionValue.current = 0;
      }
      direction.current = 'UP';
    } else if (e.deltaY < 0) {
      if (direction.current === 'UP') {
        accDirectionValue.current = 0;
      }
      direction.current = 'DOWN';
    }

    accDirectionValue.current += e.deltaY;

    if (accDirectionValue.current < -100) {
      accDirectionValue.current = 0;
      console.log('DOWN');

      setTime(prev => {
        const minutes = prev.format('mm');
        if (minutes === '30' || minutes === '00') {
          return prev.clone().add(-30, 'minutes');
        } else {
          const ceil = parseInt(minutes, 10);
          return prev.clone().add(-ceil, 'minutes');
        }
      });
    }

    if (accDirectionValue.current > 100) {
      accDirectionValue.current = 0;
      console.log('UP');

      setTime(prev => {
        const minutes = prev.format('mm');
        if (minutes === '30' || minutes === '00') {
          return prev.clone().add(30, 'minutes');
        } else {
          const ceil = parseInt(minutes, 10);
          return prev.clone().add(ceil, 'minutes');
        }
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel);

    return (): void => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);

  useEffect(() => {
    if (slider.current) {
      slider.current.slickGoTo(slierIndex);
    }
  }, [floor, slierIndex]);

  const handleFloor = (value: selectedFloor): void => {
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
