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
    const [loading, setLoading] = useState(false);
    const [errorFlg, setErrorFLg] = useState(false);
    const [data, setData] = useState<dataResponseRecord[]>([]);
    const columnHeaders = ['#', 'Index', 'City', 'Slot', 'Velocity'];
    const recordProperties = ['index', 'city', 'slot', 'velocity'];

    function submitForm(fromRange: number, toRange: number) {
        setLoading(true);
        getData(fromRange, toRange, getTokenFromLocalStorage())
            .then((response) => {
                console.log('RESPONISE:', response);
                if (!response.ok)
                    throw new NetworkError(response.status, 'Network Error');
                setLoading(false);
                setErrorFLg(false);
                return response.json();
            })
            .then((data: dataResponseDto) => {
                setData(data.data);
                if (data.token) localStorage.setItem('token', data.token);
                console.log(data);
            })
            .catch((err) => {
                setLoading(false);
                setErrorFLg(true);
                console.log('GRESKAAAAAAA:' + err);
                if (err instanceof NetworkError) {
                    handleNetworkError(err);
                }
            });
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
                    loading={loading}
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
