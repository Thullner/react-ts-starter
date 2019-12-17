import RequestHelper from './RequestHelper'


class RestEndpoint {
    endpoint: string;
    resource: string;
    requestHelper: RequestHelper;

    constructor (resource: string) {

        // @ts-ignore
        this.endpoint = process.env.REACT_APP_API_ENDPOINT;
        this.resource = resource;
        this.requestHelper = new RequestHelper();
    }

    getKey(resource: any, key: any){
        return resource instanceof FormData ? resource.get(key) : resource[key];
    }

    hasKey(resource: any, key: any){
        return resource instanceof FormData ? resource.has(key) : resource[key] !== undefined;
    }

    all () {
        return this.requestHelper.get(`${this.endpoint}/${this.resource}`);
    }

    find (id: number) {
        return this.requestHelper.get(`${this.endpoint}/${this.resource}/${id}`);
    }

    createOrUpdate(resource: any) {
        if (!this.hasKey(resource, 'id')) return this.store(resource);
        return this.update(resource);
    }

    store (resource: any) {
        return this.requestHelper.post(`${this.endpoint}/${this.resource}`, resource)
    }

    update (resource: any) {
        return this.requestHelper.patch(`${this.endpoint}/${this.resource}/${this.getKey(resource, 'id')}`, resource)
    }

    destroy (resource: any) {
        return this.requestHelper.destroy(`${this.endpoint}/${this.resource}/${this.getKey(resource, 'id')}`)
    }
}

export default RestEndpoint
