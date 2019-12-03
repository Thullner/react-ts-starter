import React, {FunctionComponent, useContext} from 'react';
import {AuthContext} from "../../contexts/AuthContext";
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface OwnProps extends RouteProps {
    isRestricted: boolean;
}

type Props = OwnProps;

const PublicRoute: FunctionComponent<Props> = (props) => {

    const {isAuthenticated} = useContext(AuthContext);

    if (isAuthenticated() && props.isRestricted) {
        return <Redirect to="/"/>
    }
    return <Route {...props}/>;
};

export default PublicRoute;
