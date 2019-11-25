export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm';

export enum CalcType {
  PLUS,
  MINUS,
}

export interface Meeting {
  id: number;
  name: string;
  startedAt: string;
  endedAt: string;
  room: RoomResponse;
}

export interface RoomResponse {
  id: number;
  name: string;
  floor: number;
}

export interface Room {
  id: number;
  floor: number;
  name: string;
  x: number;
  y: number;
  coords: string;
  polyPosition?: { x: number; y: number };
  polySize?: { width: number; height: number };
  polyPoints?: string;
}
