import React, { memo, RefObject, useMemo, useState } from 'react';
import Slider, { Settings } from 'react-slick';
import FloorMap from 'components/FloorMap';
import { MEETING_ROOMS } from 'constants/meetingRoom';
import SliderArrow from 'components/SliderArrow';
import { Room } from 'types';
import floorPlan18 from 'resources/images/reservation/floor-plan-18.png';
import floorPlan19 from 'resources/images/reservation/floor-plan-19.png';

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
  onClickRoom,
}) => {
  const [isSwiping, setIsSwiping] = useState<boolean>(false);
  const sliderSettings = useMemo<Settings>(
    () => ({
      speed: 400,
      vertical: true,
      verticalSwiping: true,
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
        floor={18}
        floorPlan={floorPlan18}
        rooms={MEETING_ROOMS.filter(r => r.floor === 18)}
        onClickRoom={onClickRoom}
        isSwiping={isSwiping}
      />
      <FloorMap
        floor={19}
        floorPlan={floorPlan19}
        rooms={MEETING_ROOMS.filter(r => r.floor === 19)}
        onClickRoom={onClickRoom}
        isSwiping={isSwiping}
      />
    </Slider>
  );
};

export default memo(FloorSlider);
