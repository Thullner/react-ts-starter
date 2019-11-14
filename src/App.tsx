import React, {FunctionComponent} from 'react';
import {BrowserRouter, Switch} from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import AuthContextProvider from "./contexts/AuthContext";
import PublicRoute from "./utils/routeTypes/PublicRoute";
import Home from "./components/pages/Home";

interface OwnProps {
}

type Props = OwnProps;

const App: FunctionComponent<Props> = (props) => {

    return (
        <BrowserRouter>
            <div>
                <AuthContextProvider>
                    <NavBar/>
                    <Switch>
                        <PublicRoute isRestricted={false} path={'/'} component={Home}/>
                    </Switch>
                </AuthContextProvider>
            </div>
        </BrowserRouter>
    );
};

export default App;
