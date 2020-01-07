import TokenService from './TokenService';
import RequestError from "../models/RequestError";
import {RequestDataType} from "./RestEndpoint";

interface IHttpResponse<T> {}

class RequestHelper {

    static convertToFormData (object: any): FormData {
        const formData = new FormData()
        Object.keys(object).filter(key => object[key] !== null).forEach(key => {
            let value = object[key]
            if (Array.isArray(value)) {
                for (const item of value) {
                    formData.append(`${key}[]`, item)
                }
                return
            }

            formData.append(key, value)
        })

        return formData
    }

    post<T>(uri: string, data: RequestDataType): IHttpResponse<T> {
        return this.request('POST', uri, data);
    }

    patch<T>(uri: string, data: RequestDataType): IHttpResponse<T> {
        return this.request('PATCH', uri, data);
    }

    destroy<T>(uri: string): IHttpResponse<T> {
        return this.request('DELETE', uri);
    }

    get<T>(url: string): IHttpResponse<T> {
        return this.request('GET', url);
    }

    getRequestInit(method: string, data?: RequestDataType): RequestInit{
        if (data instanceof FormData) {
            data.append('_method', method);
            method = 'POST';
        }

        if (data){
            return {
                method,
                body: data instanceof FormData ? data : JSON.stringify(data),
                headers: this.getHeadersForData(data),
            }
        }

        return {
            method,
            headers: this.getHeadersForData(),
        }
    }

    request<T>(method: string, url: string, data?: RequestDataType): IHttpResponse<T> {

        const requestInit = this.getRequestInit(method, data && data);


        return new Promise((resolve, reject) => {
                let response: Response;
                return fetch(url, requestInit)
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
                        console.log(error);
                    })
            }
        );
    }

    getHeadersForData(data?: RequestDataType) {
        const headers = new Headers();

        if (TokenService.isAuthenticated()) {
            headers.append('Authorization', `Bearer ${TokenService.getToken()}`)
        }

        if (data instanceof FormData) {
            // headers.append('Content-Type', 'multipart/form-data');
        } else if (data){
            headers.append('Content-Type', 'application/json');
        }

        headers.append('Accept', 'application/json');

        return headers;
    }
}

export default RequestHelper;
