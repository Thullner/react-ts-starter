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
import BookContext from "./examples/contexts/BookContext";
import BookForm from "./examples/components/pages/BookForm";
import BookList from "./examples/components/pages/BookList";

interface OwnProps {
    user?: User
}

type Props = OwnProps;

const App: FunctionComponent<Props> = (props) => {

    return (
        <BrowserRouter>
            <div>
                <AuthContextProvider user={props.user}>
                    <BookContext>
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
                                    <PublicRoute isRestricted={false} exact={true} path={'/example-book-list'}
                                                 component={BookList}/>
                                    <PublicRoute isRestricted={false} exact={true} path={'/example-book-form'}
                                                 component={BookForm}/>
                                    // End of example part

                                    <PublicRoute isRestricted={false} exact={false} component={NotFoundPage}/>
                                </Switch>
                            </main>
                        </div>
                    </BookContext>
                </AuthContextProvider>
            </div>
        </BrowserRouter>
    );
};

export default App;
