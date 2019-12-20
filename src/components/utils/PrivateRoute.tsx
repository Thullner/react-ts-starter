import React, {FunctionComponent, useContext} from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import {AuthContext} from "../../contexts/AuthContext";

interface OwnProps extends RouteProps{
}

type Props = OwnProps;

const PrivateRoute: FunctionComponent<Props> = (props) => {

    const {isAuthenticated} = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Redirect to="/login"/>
    }

    return <Route {...props}/>;
};

export default PrivateRoute;
