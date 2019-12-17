import React, {ChangeEvent, FormEvent, FunctionComponent, useContext, useState} from 'react';
import {AuthContext} from "../../contexts/AuthContext";
import User from "../../models/User";
import {RouteComponentProps} from "react-router";

interface OwnProps {
}

type Props = OwnProps & RouteComponentProps;

const Register: FunctionComponent<Props> = (props) => {
    const [user, setUser] = useState(new User());
    const {register} = useContext(AuthContext);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.id]: e.target.value})
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        register(user);
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Name</label>
                    <input id="name" type="text" value={user.name}
                           onChange={handleChange}
                           required/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="text" value={user.email}
                           onChange={handleChange}
                           required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" value={user.password}
                           onChange={handleChange}
                           required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Confirm Password</label>
                    <input id="password_confirmation" type="password_confirmation" value={user.password_confirmation}
                           onChange={handleChange}
                           required/>
                </div>
                <div className="form-group">
                    <button type="submit">Register</button>
                    <button type="button" onClick={() => props.history.push('/')}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default Register;
