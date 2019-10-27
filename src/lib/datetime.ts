import moment, { Moment } from 'moment';
import { CalcType, DATETIME_FORMAT } from 'types';

export const roundMinutes = (time: Moment, step: number): Moment => {
  const minutes = parseInt(time.format('mm'), 10);

  if (minutes % step === 0) {
    return time;
  }

  const floorOrCeil = minutes % step < step / 2 ? 'FLOOR' : 'CEIL';
  const diff =
    floorOrCeil === 'FLOOR'
      ? -(minutes - Math.floor(minutes / 30) * 30)
      : Math.ceil(minutes / 30) * 30 - minutes;

  return time.clone().add(diff, 'minutes');
};

export const calcRoundMinutes = (
  time: Moment,
  step: number,
  calcType: CalcType,
): Moment => {
  const minutes = parseInt(time.format('mm'), 10);

  if (minutes % step === 0) {
    const diff = calcType === CalcType.PLUS ? step : -step;
    return time.clone().add(diff, 'minutes');
  } else {
    const diff =
      calcType === CalcType.PLUS
        ? Math.ceil(minutes / step) * step - minutes
        : -(minutes - Math.floor(minutes / step) * step);
    return time.clone().add(diff, 'minutes');
  }
};

export const add30Minutes = (time: string): string =>
  calcRoundMinutes(moment(time), 30, CalcType.PLUS).format(DATETIME_FORMAT);

export const minus30Minutes = (time: string): string =>
  calcRoundMinutes(moment(time), 30, CalcType.MINUS).format(DATETIME_FORMAT);
