import React, {FunctionComponent, useContext} from 'react';
import {Link, NavLink} from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext";

interface OwnProps {
}

type Props = OwnProps;

const NavBar: FunctionComponent<Props> = (props) => {

    const {logout, user} = useContext(AuthContext);

    return (
        <nav>
            <div className="nav-content">
                <div className="nav-main-menu">
                    NavBar
                    <NavLink exact={true} to={'/'} >Home</NavLink>
                    <NavLink exact={true} to={'/example-book-list'} >Example - Book list</NavLink>
                </div>
                {

                    user ?
                        <div className="nav-auth-menu">
                            {user.name}
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
