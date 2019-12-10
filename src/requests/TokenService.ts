class TokenService {

    static setToken(token: string) {
        return localStorage.setItem('token', token);
    }

    static getToken() {
        return localStorage.getItem('token');
    }

    static isAuthenticated(){
        return localStorage.getItem('token') !== null;
    }

    static removeToken() {
        localStorage.removeItem('token');
    }
}

export default TokenService;
