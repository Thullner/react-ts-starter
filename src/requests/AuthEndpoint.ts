import Credentials from "../models/Credentials";
import RestEndpoint from "./RestEndpoint";
import User from "../models/User";
import {ILoginResponse} from "../contexts/AuthContext";

class AuthEndpoint extends RestEndpoint {

    constructor() {
        super('auth');
    }

    login(credentials: Credentials): ILoginResponse {
        // @ts-ignore
        return this.requestHelper.post(`${this.endpoint}/${this.resource}/login`, credentials);
    }

    register(user: User): ILoginResponse {
        // @ts-ignore
        return this.requestHelper.post(`${this.endpoint}/${this.resource}/register`, user);
    }


    logout() {
        return this.requestHelper.post(`${this.endpoint}/${this.resource}/logout`, {});
    }

    refresh() {
        return this.requestHelper.post('refresh', {});
    }

    me(): User {
        // @ts-ignore
        return this.requestHelper.post(`${this.endpoint}/${this.resource}/me`, {});
    }
}

export default AuthEndpoint;
