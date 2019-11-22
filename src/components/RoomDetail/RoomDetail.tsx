import React from 'react';
import styled from 'styled-components';
import { clearfix } from 'style/mixin';
import _ from 'lodash';
import { MEETING_ROOMS } from 'constants/meetingRoom';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

interface RoomDetailProps {
  roomId: number;
  selectedDateTime: string;
}

const Container = styled.div`
  padding: 10px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 28px;
  text-align: left;
`;

const RoomInfo = styled.div``;

const Photo = styled.img`
  display: block;
  width: 100%;
  box-shadow: 2px 2px 4px 3px rgba(0, 0, 0, 0.2);
`;

const Content = styled.div`
  ${clearfix}
`;

const Schedule = styled.div`
  position: relative;
  margin-top: 10px;
  text-align: left;
`;

const SelectedDate = styled.div`
  position: absolute;
  top: -40px;
  left: 0;
  font-weight: 700;
  font-size: 18px;
`;

const TimeTable = styled.div`
  border: 1px solid #eee;
`;

const Time = styled.div`
  display: block;
  overflow: hidden;
  padding: 10px 15px;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  color: #fff;

  & + & {
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }

  & .time {
    margin-right: 10px;
    color: #fff;
    font-family: ${({ theme }): string => theme.basicFont};
  }
`;

const Tags = styled.ul`
  margin-top: 15px;
  font-size: 0;
  text-align: left;
`;

const Tag = styled.li`
  display: inline-block;
  font-size: 15px;
  vertical-align: middle;

  & + & {
    margin-left: 10px;
  }
`;

const RoomDetail: React.FC<RoomDetailProps> = ({
  roomId,
  selectedDateTime,
}) => {
  const reservations = useSelector(
    (state: RootState) => state.reservation.reservations,
  );
  const roomData = MEETING_ROOMS.find(r => r.id === roomId);

  // useEffect(() => {
  //   const initTimes: Time[] = _.range(9, 20, 1).map((hour, index) => {
  //     const start = moment(selectedDateTime)
  //       .set('hours', Math.floor(hour))
  //       .set('minutes', (hour % 1) * 60);
  //     const end = start.clone().add(30, 'minutes');
  //     const startTime = start.format('HH:mm');
  //     const endTime = end.format('HH:mm');
  //     const reservedMeeting = reservations
  //       .filter(r => r.room.id === roomId)
  //       .find(r => start.isBetween(r.startedAt, r.endedAt, undefined, '[)'));
  //     const isReserved = !!reservedMeeting;
  //     const active =
  //       roundMinutes(moment(selectedDateTime), 30).format('HH:mm') ===
  //       startTime;
  //
  //     return {
  //       id: index,
  //       startTime,
  //       endTime,
  //       reservedMeeting,
  //       isReserved,
  //       active,
  //     };
  //   });
  //
  //   setTimes(initTimes);
  // }, [roomId, selectedDateTime, reservations]);

  return (
    <Container>
      {roomData && (
        <>
          <Title>{roomData.name}</Title>
          <Content>
            <RoomInfo>
              <Photo
                src={
                  'https://campusu.co.kr/wp-content/uploads/2016/12/%ED%81%AC%EA%B8%B0%EB%B3%80%ED%99%98_KENN4462-1.jpg'
                }
                alt={'회의실 전경'}
              />
              {roomData.tags && (
                <Tags>
                  {roomData.tags.map(tag => (
                    <Tag key={tag}>{`#${tag}`}</Tag>
                  ))}
                </Tags>
              )}
            </RoomInfo>
            <Schedule>
              <SelectedDate>
                {moment(selectedDateTime).format('YYYY.MM.DD')}
              </SelectedDate>
              <TimeTable>
                {_.range(9, 20, 1).map(hour => (
                  <Time key={hour}>
                    <span className={'time'}>
                      {moment(selectedDateTime)
                        .set('hours', Math.floor(hour))
                        .set('minutes', 0)
                        .format('HH:mm')}
                    </span>
                  </Time>
                ))}
              </TimeTable>
            </Schedule>
          </Content>
        </>
      )}
    </Container>
  );
};

export default RoomDetail;
