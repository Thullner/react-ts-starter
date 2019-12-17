import React, {ChangeEvent, FormEvent, FunctionComponent, useContext, useState} from 'react';
import {AuthContext} from "../../contexts/AuthContext";
import Credentials from "../../models/Credentials";
import {RouteComponentProps} from 'react-router-dom';
import ValidationError from "../util/ValidationError";

interface OwnProps {
}

type Props = OwnProps & RouteComponentProps;

const Login: FunctionComponent<Props> = (props) => {

    const [credentials, setCredentials] = useState(new Credentials());
    const [errors, setErrors] = useState([]);
    const {login} = useContext(AuthContext);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCredentials({...credentials, [e.target.id]: e.target.value})
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const validationErrors = await login(credentials);
        // @ts-ignore
        setErrors(validationErrors);

    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                {errors.length > 0 &&
                <ul className="errors">
                    {errors.map(error => <ValidationError key={error}message={error}/>)}
                </ul>}
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
