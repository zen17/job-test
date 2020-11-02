import {DataRecord} from '../domain/data-record';

export interface DataResponseDto{
  data: DataRecord[];
  token: string;
}

export interface DataRecordDTO {
  index: number;
  slot: number | null;
  city: string | null;
  velocity: number | null;
}
