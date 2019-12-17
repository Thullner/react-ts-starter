import React, {createContext, FunctionComponent, useState} from 'react';
import Credentials from "../models/Credentials";
import User from "../models/User";
import AuthEndpoint from "../requests/AuthEndpoint";
import TokenService from "../requests/TokenService";

interface IAuthContext {
    isAuthenticated: () => boolean;
    login: (credentials: Credentials) => void;
    register: (user: User) => void;
    logout: () => void;
    user?: User;
}

export const AuthContext = createContext({} as IAuthContext);

interface OwnProps {
    user?: User
}

type Props = OwnProps;

const authEndpoint = new AuthEndpoint();

export interface IToken {
    access_token: string,
    token_type: string,
    expires_in: number
}

export interface ILoginResponse {
    user: User,
    token: IToken
}

export interface IAuthError {
    type: string,
    message: string
}

const AuthContextProvider: FunctionComponent<Props> = (props) => {

    const [user, setUser] = useState<User>(props.user !== undefined ? new User(props.user) : new User());
    const [authErrors, setAuthErrors] = useState<IAuthError[]>([]);

    const isAuthenticated = () => {
        return typeof user.id !== 'undefined';
    };

    const login = async (credentials: Credentials) => {
        try {
            const loginResponse = await authEndpoint.login(credentials);
            TokenService.setToken(loginResponse.token.access_token);
            setUser(loginResponse.user);
        } catch (e) {
            return e;
        }

    };

    const register = async (userToRegister: User) => {
        const loginResponse = await authEndpoint.register(userToRegister);
        TokenService.setToken(loginResponse.token.access_token);
        setUser(loginResponse.user);
    };

    const logout = () => {
        authEndpoint.logout();
        TokenService.removeToken();
        setUser(new User());
    };

    return (
        <AuthContext.Provider
            value={{isAuthenticated, login, register, logout, user: isAuthenticated() ? user : undefined}}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
