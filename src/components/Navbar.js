import React from "react"
import {Link} from "react-router-dom"

function Navbar(props)
{
    
    return(
        <div className="navv">

            <ul>
                <li>
                    <Link to="/" >NextGenStreet</Link>
                </li>
                {props.log ?(<li>
                    <Link to="/register">Sign up</Link>
                </li>):""}
                {props.log ?(<li >
                    <Link to="/login">Login</Link>
                </li>):""}
                {!props.log ?(<li id="logout">
                    <Link to="/login" onClick={props.logout}>Logout</Link>
                </li>):""}
 
            </ul>
        </div>
    )
}

export default Navbar;