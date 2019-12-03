import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import TokenService from "./requests/TokenService";
import AuthEndpoint from "./requests/AuthEndpoint";

const renderReactDOM = async () => {
    const isAuthenticated = TokenService.isAuthenticated();

    let user = undefined;

    if (isAuthenticated) {
        const authEndpoint = new AuthEndpoint();
        try {
            user = await authEndpoint.me();
        } catch (e) {
            TokenService.logout();
        }
    }

    ReactDOM.render(<App user={user} />, document.getElementById('root'));
};

renderReactDOM();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
