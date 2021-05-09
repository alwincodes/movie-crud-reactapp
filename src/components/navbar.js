import React from 'react';
import {Link} from 'react-router-dom';
import "./css/navbar.css";

function Navbar({token}) {
    return (
        <div className="navbar">
            <ul className="nav_elements">
                <Link to="/"><li>Home</li></Link>
                
                {token.token.token&&(
                    <Logout setToken={token.setToken}/>
                )}

                {!token.token.token&&(<>
                    <Link to="/signin"><li>Login</li></Link>
                    <Link to="/signup"><li>Sign Up</li></Link>
                </>)}
            </ul>
        </div>
    )
}

function Logout({setToken}){
    const logOut=(e)=>{
        e.persist();
        setToken({token: "", refreshToken: ""});
    }
    return(
        <li onClick={logOut}>Log Out</li>
    )
}

export default Navbar;
