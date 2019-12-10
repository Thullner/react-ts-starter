import React, {FunctionComponent, useContext, useState} from 'react';
import {Link, NavLink} from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext";

interface OwnProps {
}

type Props = OwnProps;

const NavBar: FunctionComponent<Props> = (props) => {

    const {isAuthenticated, logout, user} = useContext(AuthContext);

    console.log(user);

    return (
        <nav>
            <div className="nav-content">
                <div className="nav-main-menu">
                    NavBar
                    <NavLink exact={true} to={'/'} >Home</NavLink>
                </div>
                {

                    user ?
                        <div className="nav-auth-menu">
                            {user.email}
                            <Link to={'/'} onClick={() => logout()}>Logout</Link>
                        </div>
                        :
                        <div className="nav-auth-menu">
                            <NavLink to={'/login'}>Login</NavLink>
                            <NavLink to={'/register'}>Register</NavLink>
                        </div>
                }
            </div>
        </nav>
    );
};

export default NavBar;
