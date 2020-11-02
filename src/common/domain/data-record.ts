import {DataRecordDTO} from '../dtos/data-dto';

export interface DataRecord {
    index: number;
    slot: number;
    city: string;
    velocity: number;
}

export const parseDataRecordDTO = (dataRecord: DataRecordDTO): DataRecord => {
    return {
        index: dataRecord.index ? dataRecord.index : 0,
        slot: dataRecord.slot ? dataRecord.slot : 0,
        city: dataRecord.city ? dataRecord.city : 'None',
        velocity: dataRecord.velocity ? dataRecord.velocity : 0
    };
};
