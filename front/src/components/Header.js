import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <header>
               <Link to="/" className="button border-right forLink">
                    One
               </Link>
               <Link to="/view" className="button border-right forLink">
                    Two
               </Link>
               <Link to="/settings" className="button none-border-right forLink">
                    Three
               </Link>
               <hr className="longLine" />
            </header>
        )
    }
}

export default Header
