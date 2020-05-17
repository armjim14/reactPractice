import React, { Component, Fragment } from 'react';
import axios from 'axios';

export default class Addcat extends Component {

    state = {
        value: ""
    }

    updateText = e => {
        this.setState({value: e.target.value})
    }

    addItem = e => {
        e.preventDefault();
        axios.post("/add/cat", {name: this.state.value})
        .then( res => res.data.added ? window.location.href = "/categories" : alert("Please try again") )
    }

    render() {
        return (
            <Fragment>
                <h2 className="title">Add New Category</h2>
                <div className="bigBox">
                    <div className="smallBox">
                        <form onSubmit={this.addItem}>
                            <input placeholder="Category name" type="text" onChange={this.updateText} />
                            <input type="submit" value="Add item" />
                        </form>
                    </div>
                </div>
            </Fragment>
        )
    }
}
