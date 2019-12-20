import React, {ChangeEvent, FormEvent, FunctionComponent, useContext, useState} from 'react';
import {AuthContext} from "../../contexts/AuthContext";
import Credentials from "../../models/Credentials";
import {RouteComponentProps} from 'react-router-dom';
import ValidationError from "../utils/ValidationError";
import RequestError from "../../models/RequestError";

interface OwnProps {
}

type Props = OwnProps & RouteComponentProps;

const Login: FunctionComponent<Props> = (props) => {

    const [credentials, setCredentials] = useState(new Credentials());
    const [requestError, setRequestError] = useState<RequestError>();
    const {login} = useContext(AuthContext);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCredentials({...credentials, [e.target.id]: e.target.value})
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const requestError = await login(credentials);
        if (requestError) {
            setRequestError(requestError);
        }

    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                {requestError && <ValidationError requestError={requestError}/>}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="text" value={credentials.email}
                           onChange={handleChange}
                           required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" value={credentials.password}
                           onChange={handleChange}
                           required/>
                </div>
                <div className="form-group">
                    <button type="submit">Login</button>
                    <button type="button" onClick={() => props.history.push('/')}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
