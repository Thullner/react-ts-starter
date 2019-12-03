import TokenService from './TokenService';
import axios, {Method} from 'axios';


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

    request(method: Method, url: string, data: object | FormData) {
        if (this.isFormData(data)) {
            // @ts-ignore
            data.append('_method', method);
            method = 'POST';
        }

        console.log(method, url, data);

        return new Promise((resolve, reject) => {
            return axios.request({
                method,
                url,
                data,
                headers: this.getHeadersForData(data)
            }).then(response => resolve(response.data))
                .catch(error => {
                    reject(error.response.data);
                })
        })
    }

    getHeadersForData(data: object | FormData) {
        const isFormData = this.isFormData(data);

        const authorizationHeaders = TokenService.isAuthenticated()
            ? {'Authorization': `Bearer ${TokenService.getToken()}`}
            : {};

        return {
            'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
            'Accept': 'application/json',
            ...authorizationHeaders
        }
    }
}

export default RequestHelper;
