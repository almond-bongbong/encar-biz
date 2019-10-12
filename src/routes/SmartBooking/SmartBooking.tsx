import React, { useEffect, useMemo, useRef } from 'react';
import { RouteComponentProps, useParams } from 'react-router-dom';
import FloorTab from 'components/FloorTab';
import styled from 'styled-components';
import 'moment/locale/ko';
import moment from 'moment';
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
  const { floor } = useParams();
  const slierIndex = floor === '18' ? 0 : 1;
  const slider = useRef<Slider>(null);
  const nowTime = moment().format(`A h시 m분`);
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
        <div className="time">{nowTime}</div>
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
