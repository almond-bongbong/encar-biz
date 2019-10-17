export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm';

export enum CalcType {
  PLUS,
  MINUS,
}

export interface Meeting {
  roomId: number;
  title: string;
  start: string;
  end: string;
}
