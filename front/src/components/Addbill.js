import React, { Component, Fragment } from 'react';
import axios from 'axios';

export default class Addbill extends Component {

    state = {
        billName: "",
        amount: "",
        date: ""
    }

    updateText = e => {
        const value = e.target.value;
        this.setState({
          ...this.state,
          [e.target.name]: value
        });
    }

    addItem = e => {
        e.preventDefault();
        axios.post("/add/bill", this.state)
        .then( res => res.data.added ? window.location.href = "/bills" : alert("Please try again") )
    }

    render() {
        return (
            <Fragment>
                <h2 className="title">Add New Bill</h2>
                <div className="bigBox">
                    <div className="smallBox">
                        <form onSubmit={this.addItem}>
                            <input name="billName" placeholder="Bill name" type="text" onChange={this.updateText} />
                            <input name="amount" type="number" onChange={this.updateText} />
                            <input name="date" type="date" onChange={this.updateText} />
                            <input type="submit" value="Add item" />
                        </form>
                    </div>
                </div>
            </Fragment>
        )
    }
}
