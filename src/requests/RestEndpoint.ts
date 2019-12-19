import RequestHelper from './RequestHelper'

type RequestJSONType = { [key: string]: any };
export type RequestDataType = FormData | RequestJSONType;

class RestEndpoint {
    endpoint: string;
    resource: string;
    requestHelper: RequestHelper;

    constructor (resource: string) {

        if (!process.env.REACT_APP_API_ENDPOINT){
            throw new Error('REACT_APP_API_ENDPOINT is not found.');
        }
        this.endpoint = process.env.REACT_APP_API_ENDPOINT;
        this.resource = resource;
        this.requestHelper = new RequestHelper();
    }

    getKey(data: RequestDataType, key: string){
        return data instanceof FormData ? data.get(key) : data[key];
    }

    hasKey(data: RequestDataType, key: string){
        return data instanceof FormData ? data.has(key) : data[key] !== undefined;
    }

    all () {
        return this.requestHelper.get(`${this.endpoint}/${this.resource}`);
    }

    find (id: number) {
        return this.requestHelper.get(`${this.endpoint}/${this.resource}/${id}`);
    }

    createOrUpdate(data: RequestDataType) {
        if (!this.hasKey(data, 'id')) return this.store(data);
        return this.update(data);
    }

    store (data: RequestDataType) {
        return this.requestHelper.post(`${this.endpoint}/${this.resource}`, data)
    }

    update (data: RequestDataType) {
        return this.requestHelper.patch(`${this.endpoint}/${this.resource}/${this.getKey(data, 'id')}`, data)
    }

    destroy (data: RequestDataType) {
        return this.requestHelper.destroy(`${this.endpoint}/${this.resource}/${this.getKey(data, 'id')}`)
    }
}

export default RestEndpoint;
