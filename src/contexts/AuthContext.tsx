import React, {createContext, FunctionComponent, useState} from 'react';
import Credentials from "../models/Credentials";
import User from "../models/User";
import AuthEndpoint from "../requests/AuthEndpoint";
import TokenService from "../requests/TokenService";
import RequestError from "../models/RequestError";

interface IAuthContext {
    isAuthenticated: () => boolean;
    login: (credentials: Credentials) => Promise<void | RequestError>;
    register: (user: User) => Promise<void | RequestError>;
    logout: () => Promise<void>;
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

const AuthContextProvider: FunctionComponent<Props> = (props) => {

    const [user, setUser] = useState<User>(props.user !== undefined ? new User(props.user) : new User());

    const isAuthenticated = () => {
        return typeof user.id !== 'undefined';
    };

    const login = async (credentials: Credentials): Promise<void | RequestError> => {
        try {
            const loginResponse = await authEndpoint.login(credentials);
            TokenService.setToken(loginResponse.token.access_token);
            setUser(loginResponse.user);
        } catch (requestError) {
            return requestError;
        }
    };

    const register = async (userToRegister: User): Promise<void | RequestError> => {
        try {
            const loginResponse = await authEndpoint.register(userToRegister);
            TokenService.setToken(loginResponse.token.access_token);
            setUser(loginResponse.user);
        } catch (requestError) {
            return requestError;
        }
    };

    const logout = async () => {
        await authEndpoint.logout();
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
