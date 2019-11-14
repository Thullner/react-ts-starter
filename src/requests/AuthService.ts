class AuthService {

    static setToken(token: string) {
        return localStorage.setItem('token', token);
    }

    static getToken() {
        return localStorage.getItem('token');
    }

    static isAuthenticated(){
        return localStorage.getItem('token') !== null;
    }

    static logout() {
        localStorage.removeItem('user');
    }
}

export default AuthService;
