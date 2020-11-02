import React, { useState } from 'react';
import SelectIndexRangeForm from '../../components/SelectIndexRangeForm/SelectIndexRangeForm';
import { getData } from '../../api/dataService';

import { DataRecord, DataRecordDTO, parseDataRecordDTO } from '../../common/domain/data-record';
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

    function submitForm(fromRange: number, toRange: number) {
        if (!loadingFlg) {
            setLoadingFlg(true);
            getData(fromRange, toRange, getTokenFromLocalStorage())
                .then((response) => {
                    if (!response.ok)
                        throw new NetworkError(
                            response.status,
                            'Network Error'
                        );
                    setLoadingFlg(false);
                    setErrorFLg(false);
                    return response.json();
                })
                .then((dataResponseDto: DataResponseDto) => {
                    setData(dataResponseDto.data.map((dataRecordDTO: DataRecordDTO) => parseDataRecordDTO(dataRecordDTO)));
                    if (dataResponseDto.token) localStorage.setItem('token', dataResponseDto.token);
                })
                .catch((err) => {
                    setLoadingFlg(false);
                    setErrorFLg(true);
                    if (err instanceof NetworkError) {
                        handleNetworkError(err);
                    }
                });
        }
    }


    function getTokenFromLocalStorage(): string | null {
        return localStorage.getItem('token');
    }

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
