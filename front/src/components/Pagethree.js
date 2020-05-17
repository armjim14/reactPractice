import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Pagethree extends Component {
    render() {
        return (
            <div className="w-100">
                <h2 className="title">Settings</h2>
                    <div className="bigBox">
                        <div className="smallBox">
                            <Link to="/categories" className="forLink cen mb-0 addH">Categories</Link>
                        </div>
                    </div>
                    <div className="bigBox">
                        <div className="smallBox">
                            <Link to="/categories" className="forLink cen mb-0 mt-0 addH">Bills</Link>
                        </div>
                    </div>
                    <div className="bigBox">
                        <div className="smallBox">
                            <Link to="/categories" className="forLink cen mt-0 addH">Transactions</Link>
                        </div>
                    </div>
            </div>
        )
    }
}

export default Pagethree
