import React, { useState } from 'react';
import './App.css';
import SelectIndexRangeForm from './components/SelectIndexRangeForm/SelectIndexRangeForm';
import { dataResponseDto, getData } from './api/dataService';
import { NetworkError } from './error-handling/networkError';
import { handleNetworkError } from './error-handling/handle-network-error';

function App() {
    const [loading, setLoading] = useState(false);

    function submitForm() {
        setLoading(true);
        getData(1, 20, getTokenFromLocalStorage())
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

    return (
        <div className="container">
            <SelectIndexRangeForm onFormSubmit={submitForm} loading={loading} />
        </div>
    );
}

export default App;
