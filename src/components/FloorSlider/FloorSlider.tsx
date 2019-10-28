import React, { RefObject, useMemo, useState, memo } from 'react';
import Slider, { Settings } from 'react-slick';
import FloorMap from 'components/FloorMap';
import { MEETING_ROOMS } from 'constants/meetingRoom';
import SliderArrow from 'components/SliderArrow';
import { Room } from 'types';
import _ from 'lodash';

interface FloorSliderProps {
  sliderRef: RefObject<Slider>;
  sliderIndex: number;
  onChangeFloor: (floor: string) => void;
  onClickRoom: (roomId: number) => void;
  recommendRoom?: Room;
}

const FloorSlider: React.FC<FloorSliderProps> = ({
  sliderRef,
  sliderIndex,
  onChangeFloor,
  recommendRoom,
  onClickRoom,
}) => {
  const [isSwiping, setIsSwiping] = useState<boolean>(false);
  const sliderSettings = useMemo<Settings>(
    () => ({
      speed: 400,
      infinite: false,
      initialSlide: sliderIndex,
      prevArrow: <SliderArrow direction={'left'} />,
      nextArrow: <SliderArrow direction={'right'} />,
      beforeChange(): void {
        setIsSwiping(true);
      },
      afterChange(currentSlide: number): void {
        setIsSwiping(false);
        const newFloor = currentSlide === 0 ? '18' : '19';
        onChangeFloor(newFloor);
      },
    }),
    [sliderIndex, onChangeFloor],
  );

  return (
    <Slider ref={sliderRef} {...sliderSettings}>
      <FloorMap
        rooms={MEETING_ROOMS.filter(r => r.floor === 18)}
        recommendRoom={recommendRoom}
        onClickRoom={onClickRoom}
        isSwiping={isSwiping}
      />
      <FloorMap
        rooms={MEETING_ROOMS.filter(r => r.floor === 19)}
        recommendRoom={recommendRoom}
        onClickRoom={onClickRoom}
        isSwiping={isSwiping}
      />
    </Slider>
  );
};

export default memo(FloorSlider, (prevProps, nextProps) => {
  console.log(prevProps, nextProps);
  return prevProps.recommendRoom === nextProps.recommendRoom;
});
