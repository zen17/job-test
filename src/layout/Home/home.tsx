import React, { useState } from 'react';
import SelectIndexRangeForm from '../../components/SelectIndexRangeForm/SelectIndexRangeForm';
import { dataResponseDto, getData } from '../../api/dataService';
import { NetworkError } from '../../error-handling/networkError';
import { handleNetworkError } from '../../error-handling/handle-network-error';

export const Home: React.FunctionComponent = () => {
    const [loading, setLoading] = useState(false);

    function submitForm(fromRange: number, toRange: number) {
        setLoading(true);
        getData(fromRange, toRange, getTokenFromLocalStorage())
            .then((response) => {
                console.log('RESPONISE:', response);
                if (!response.ok)
                    throw new NetworkError(response.status, 'Network Error');
                setLoading(false);
                return response.json();
            })
            .then((data: dataResponseDto) => {
                if (data.token) localStorage.setItem('token', data.token);
                console.log(data);
            })
            .catch((err) => {
                setLoading(false);
                console.log('GRESKAAAAAAA:' + err);
                if (err instanceof NetworkError) {
                    handleNetworkError(err);
                }
            });
    }

    function getTokenFromLocalStorage(): string | null {
        return localStorage.getItem('token');
    }

    return <SelectIndexRangeForm onFormSubmit={submitForm} loading={loading} />;
};
