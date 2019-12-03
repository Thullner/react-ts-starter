import React, {FunctionComponent} from 'react';
import {BrowserRouter, Switch} from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import AuthContextProvider from "./contexts/AuthContext";
import PublicRoute from "./utils/routeTypes/PublicRoute";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import User from "./models/User";

interface OwnProps {
    user?: User
}

type Props = OwnProps;

const App: FunctionComponent<Props> = (props) => {

    return (
        <BrowserRouter>
            <div>
                <AuthContextProvider user={props.user}>
                    <NavBar/>
                    <div className="content">
                        <main>
                            <Switch>
                                <PublicRoute isRestricted={false} exact={true} path={'/'} component={Home}/>
                                <PublicRoute isRestricted={true} exact={true} path={'/login'} component={Login}/>
                                <PublicRoute isRestricted={true} exact={true} path={'/register'} component={Register}/>
                            </Switch>
                        </main>
                    </div>
                </AuthContextProvider>
            </div>
        </BrowserRouter>
    );
};

export default App;
