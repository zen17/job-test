import React, { useState } from 'react';
import SelectIndexRangeForm from '../../components/SelectIndexRangeForm/SelectIndexRangeForm';
import { getData } from '../../api/dataService';

import {
    DataRecord,
    parseDataRecordDTO
} from '../../common/domain/data-record';
import {DataRecordDTO} from '../../common/dtos/data-dto';
import { DataResponseDto } from '../../common/dtos/data-dto';
import { NetworkError } from '../../error-handling/networkError';
import { handleNetworkError } from '../../error-handling/handle-network-error';
import { ErrorMessage } from '../../common/components/ErrorMessage/ErrorMessage';
import { DataTabularForm } from '../../components/DataTabularForm/DataTabularForm';

export const Home: React.FunctionComponent = () => {
    const [loadingFlg, setLoadingFlg] = useState(false);
    const [errorFlg, setErrorFLg] = useState(false);
    const [data, setData] = useState<DataRecord[]>([]);
    const columnHeaders = ['#', 'Index', 'City', 'Slot', 'Velocity'];

    const submitForm = (fromRange: number, toRange: number): void => {
        if (!loadingFlg) {
            setLoadingFlg(true);
            getData(fromRange, toRange, getTokenFromLocalStorage())
                .then((response) => {
                    if (!response.ok)
                        throw new NetworkError(
                            response.status,
                            'Network Error'
                        );
                    return response.json();
                })
                .then((dataResponseDto: DataResponseDto) => {
                    setData(
                        normalizeData(
                            fromRange,
                            toRange,
                            dataResponseDto.data.map(
                                (dataRecordDTO: DataRecordDTO) =>
                                    parseDataRecordDTO(dataRecordDTO)
                            )
                        )
                    );
                    if (dataResponseDto.token)
                        localStorage.setItem('token', dataResponseDto.token);
                  setLoadingFlg(false);
                  setErrorFLg(false);
                })
                .catch((err) => {
                    setLoadingFlg(false);
                    setErrorFLg(true);
                    if (err instanceof NetworkError) {
                        handleNetworkError(err);
                    }
                });
        }
    };

    const normalizeData = (
        fromRange: number,
        toRange: number,
        data: DataRecord[]
    ): DataRecord[] => {
        const normalizedData: DataRecord[] = [];
        for (let i = fromRange; i <= toRange; i++) {
            const record = data.find((record) => record.index === i);
            if (record) {
                normalizedData[i] = record;
            } else {
                normalizedData[i] = {
                    index: i,
                    velocity: 0,
                    slot: 0,
                    city: 'None'
                };
            }
        }
        return normalizedData;
    };

    const getTokenFromLocalStorage = (): string | null => {
        return localStorage.getItem('token');
    };

    const errorMessage = errorFlg ? (
        <ErrorMessage userFriendlyMessage="Ups!Something went wrong. Please try again!" />
    ) : null;

    return (
        <>
            <div className="mt-2">
                <SelectIndexRangeForm
                    onFormSubmit={submitForm}
                    loading={loadingFlg}
                />
            </div>
            <div className="row mt-2 justify-content-center">
                {errorMessage}
            </div>
            <div className="mt-2">
                <DataTabularForm data={data} columnHeaders={columnHeaders} />
            </div>
        </>
    );
};
