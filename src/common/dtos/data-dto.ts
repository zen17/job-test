import {DataRecord} from '../domain/data-record';

export interface DataResponseDto{
  data: DataRecord[];
  token: string;
}
