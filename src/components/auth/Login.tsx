import React, {ChangeEvent, FormEvent, FunctionComponent, useContext, useState} from 'react';
import {AuthContext} from "../../contexts/AuthContext";
import Credentials from "../../models/Credentials";

interface OwnProps {
}

type Props = OwnProps;

const Login: FunctionComponent<Props> = (props) => {

    const [credentials, setCredentials] = useState(new Credentials());

    const {login} = useContext(AuthContext);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCredentials({...credentials, [e.target.id]: e.target.value})
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        login(credentials);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
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
                </div>
            </form>
        </div>
    );
};

export default Login;
