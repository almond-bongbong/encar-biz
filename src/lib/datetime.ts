import moment, { Moment } from 'moment';
import { CalcType, DATETIME_FORMAT } from 'types';

export const calcRoundMinutes = (
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

export const add30Minutes = (time: string): string =>
  calcRoundMinutes(moment(time), 30, CalcType.PLUS).format(DATETIME_FORMAT);

export const minus30Minutes = (time: string): string =>
  calcRoundMinutes(moment(time), 30, CalcType.MINUS).format(DATETIME_FORMAT);

export const isBetween = (
  datetime: string,
  start: string,
  end: string,
): boolean => moment(datetime).isBetween(moment(start), moment(end));
