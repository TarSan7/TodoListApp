import React from 'react';
import {NavLink} from "react-router-dom";

export default function Navigation() {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink
                        to="/"
                        className={ ({isActive})  => "nav-link" + (isActive ? " active" : "") }
                    > Home </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/about"
                        className={ ({isActive})  => "nav-link" + (isActive ? " active" : "") }
                    > About </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/contact"
                        className={ ({isActive})  => "nav-link" + (isActive ? " active" : "") }
                    > Contacts </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/blog"
                        className={ ({isActive})  => "nav-link" + (isActive ? " active" : "") }
                    > Blog </NavLink>
                </li>
            </ul>
        </nav>
    );
}
