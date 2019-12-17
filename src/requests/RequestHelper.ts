import TokenService from './TokenService';

interface IHttpResponse<T> {
}

class RequestHelper {
    static convertToFormData(object: any) {
        const formData = new FormData();
        Object.keys(object).filter(key => object[key] !== null).forEach(key => {
            let value = object[key];
            if (Array.isArray(value)) {
                for (const item of value) {
                    formData.append(`${key}[]`, item);
                }
                return
            }

            formData.append(key, value);
        });

        return formData;
    }

    isFormData(resource: {} | FormData) {
        return resource instanceof FormData;
    }

    post(uri: string, data: {} | FormData) {
        return this.request('POST', uri, data);
    }

    patch(uri: string, data: {} | FormData) {
        return this.request('PATCH', uri, data);
    }

    destroy(uri: string, data = {}) {
        return this.request('DELETE', uri, data);
    }

    get(url: string) {
        return this.request('GET', url, {});
    }

    request<T>(method: string, url: string, data: object | FormData): IHttpResponse<T>{
        if (this.isFormData(data)) {
            // @ts-ignore
            data.append('_method', method);
            method = 'POST';
        }

        return new Promise((resolve, reject) => {
            let response: Response;
            return fetch(url, {
                method,
                body: JSON.stringify(data),
                headers: this.getHeadersForData(data),
            })
                .then(res => {
                    response = res;
                    return res.json();
                })
                .then(body => {
                    if (response.ok) {
                        resolve(body);
                    } else {
                        reject(body);
                    }
                })
                .catch(error => {
                    reject(error);
                })
        })
    }

    getHeadersForData(data: object | FormData) {
        const isFormData = this.isFormData(data);

        const headers = new Headers();

        if (TokenService.isAuthenticated()) {
            headers.append('Authorization', `Bearer ${TokenService.getToken()}`)
        }

        if (isFormData) {
            headers.append('Content-Type', 'multipart/form-data');
        } else {
            headers.append('Content-Type', 'application/json');
        }

        headers.append('Accept', 'application/json');

        return headers;
    }
}

export default RequestHelper;
