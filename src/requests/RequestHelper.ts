import TokenService from './TokenService';
import RequestError from "../models/RequestError";
import {RequestDataType} from "./RestEndpoint";

interface IHttpResponse<T> {}

class RequestHelper {

    post<T>(uri: string, data: RequestDataType): IHttpResponse<T> {
        return this.request('POST', uri, data);
    }

    patch<T>(uri: string, data: RequestDataType): IHttpResponse<T> {
        return this.request('PATCH', uri, data);
    }

    destroy<T>(uri: string): IHttpResponse<T> {
        return this.request('DELETE', uri, {});
    }

    get<T>(url: string): IHttpResponse<T> {
        return this.request('GET', url, {});
    }

    request<T>(method: string, url: string, data: RequestDataType): IHttpResponse<T> {
        if (data instanceof FormData) {
            data.append('_method', method);
            method = 'POST';
        }

        return new Promise((resolve, reject) => {
                let response: Response;
                return fetch(url, {
                    method,
                    body: data instanceof FormData ? data : JSON.stringify(data),
                    headers: this.getHeadersForData(data),
                })
                    .then(res => {
                        response = res;
                        return res.json();
                    })
                    .then(body => {
                        if (response.ok) {
                            resolve(body);
                        }
                        if (body.errors) {
                            const requestError = new RequestError(response.status, body.message, body.errors);

                            reject(requestError);
                        }
                        if (body.message) {
                            const requestError = new RequestError(response.status, body.message)
                            reject(requestError);
                        }
                        reject([body]);
                    })
                    .catch(error => {
                        const requestError = new RequestError(response.status);
                        reject(requestError)
                    })
            }
        );
    }

    getHeadersForData(data: RequestDataType) {
        const headers = new Headers();

        if (TokenService.isAuthenticated()) {
            headers.append('Authorization', `Bearer ${TokenService.getToken()}`)
        }

        if (data instanceof FormData) {
            headers.append('Content-Type', 'multipart/form-data');
        } else {
            headers.append('Content-Type', 'application/json');
        }

        headers.append('Accept', 'application/json');

        return headers;
    }
}

export default RequestHelper;
