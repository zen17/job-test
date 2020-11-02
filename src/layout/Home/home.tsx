import React, { useState } from 'react';
import SelectIndexRangeForm from '../../components/SelectIndexRangeForm/SelectIndexRangeForm';
import {
    dataResponseDto,
    dataResponseRecord,
    getData
} from '../../api/dataService';
import { NetworkError } from '../../error-handling/networkError';
import { handleNetworkError } from '../../error-handling/handle-network-error';
import { ErrorMessage } from '../../common/components/ErrorMessage/ErrorMessage';
import { BasicTable } from '../../common/components/BasicTable/BasicTable';

export const Home: React.FunctionComponent = () => {
    const [loadingFlg, setLoadingFlg] = useState(false);
    const [errorFlg, setErrorFLg] = useState(false);
    const [data, setData] = useState<dataResponseRecord[]>([]);
    const columnHeaders = ['#', 'Index', 'City', 'Slot', 'Velocity'];
    const recordProperties = ['index', 'city', 'slot', 'velocity'];

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
                .then((data: dataResponseDto) => {
                    normalizeData(data.data);
                    setData(data.data);
                    if (data.token) localStorage.setItem('token', data.token);
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

    function normalizeData(data: dataResponseRecord[]) {
        data.forEach((record: dataResponseRecord) => {
            if (!record.slot) {
                record.slot = 0;
            }
            if (!record.city) {
                record.city = 'None';
            }
            if (!record.index) {
                record.index = 0;
            }
            if (!record.velocity) {
                record.velocity = 0;
                parseFloat(record.velocity+'').toFixed(2);
            }
        });
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
                <BasicTable
                    data={data}
                    columnHeaders={columnHeaders}
                    recordProperties={recordProperties}
                />
            </div>
        </>
    );
};
