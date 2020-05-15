import React, { Component } from 'react'

class Pageone extends Component {
    render() {
        return (
            <div>

                <h2 className="title">Enter Amount</h2>

                <div className="bigBox">
                    <div className="smallBox">
                        <span className="label">Category: </span>
                        <select className="forInput" id="cat">
                            <option value="1">Other</option>
                            <option value="2">Groceries</option>
                        </select>
                    </div>
                </div>

                <div className="bigBox">
                    <div className="smallBox">
                        <span className="label">Details: </span>
                        <input className="forInput" type="text" />
                    </div>
                </div>

                <div className="bigBox">
                    <div className="smallBox">
                        <span className="label">Amount: </span>
                        <input className="forInput" type="number" />
                    </div>
                </div>

            </div>
        )
    }
}

export default  Pageone