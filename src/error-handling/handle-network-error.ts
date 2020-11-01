import { NetworkError } from './networkError';

export function handleNetworkError(networkError: NetworkError): void {
 if (networkError.status === 500 ){
   localStorage.clear();
 }
}
