import React, {FunctionComponent} from 'react';
import {BrowserRouter, Switch} from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import AuthContextProvider from "./contexts/AuthContext";
import PublicRoute from "./components/utils/PublicRoute";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import User from "./models/User";
import NotFoundPage from "./components/utils/NotFoundPage";
import PrivateRoute from "./components/utils/PrivateRoute";
import Dashboard from "./components/pages/Dashboard";

// Example Imports
import ExampleForm from "./examples/components/pages/BookForm";
import ExampleList from "./examples/components/pages/BookList";
import ExampleContextProvider from "./examples/contexts/BookContext";

interface OwnProps {
    user?: User
}

type Props = OwnProps;

const App: FunctionComponent<Props> = (props) => {

    return (
        <BrowserRouter>
            <div>
                <AuthContextProvider user={props.user}>
                    <ExampleContextProvider>
                        <NavBar/>
                        <div className="content">
                            <main>
                                <Switch>
                                    <PublicRoute isRestricted={false} exact={true} path={'/'} component={Home}/>

                                    <PublicRoute isRestricted={true} exact={true} path={'/login'} component={Login}/>
                                    <PublicRoute isRestricted={true} exact={true} path={'/register'}
                                                 component={Register}/>
                                    <PrivateRoute exact={true} path={'/dashboard'} component={Dashboard}/>

                                    // Example components
                                    <PublicRoute isRestricted={false} exact={true} path={'/example-list'}
                                                 component={ExampleList}/>
                                    <PublicRoute isRestricted={false} exact={true} path={'/example-form'}
                                                 component={ExampleForm}/>
                                    // End of example part

                                    <PublicRoute isRestricted={false} exact={false} component={NotFoundPage}/>
                                </Switch>
                            </main>
                        </div>
                    </ExampleContextProvider>
                </AuthContextProvider>
            </div>
        </BrowserRouter>
    );
};

export default App;
