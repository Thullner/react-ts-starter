import React, {createContext, FunctionComponent, useState} from 'react';

interface IAuthContext {
    isAuthenticated: () => void;

}

export const AuthContext = createContext({} as IAuthContext);

interface OwnProps {
}

type Props = OwnProps;

export interface Auth {

}

const AuthContextProvider: FunctionComponent<Props> = (props) => {

    const isAuthenticated = () => {
        return true;
    };

    return (
        <AuthContext.Provider value={{isAuthenticated}}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
