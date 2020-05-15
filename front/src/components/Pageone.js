import React, { Component } from 'react';
import axios from 'axios';

class Pageone extends Component {

    state = {
        list: []
    }

    componentDidMount() {
        axios.get("/sections")
        .then( (res) => {
            this.setState({list: res.data})
        })
    }

    getSections = () => {
        let list = this.state.list;

        for (let i in list){
            return ( <select className="forInput" id="cat"> <option value={list[i].CatID}>{list[i].sectionName}</option> </select>)
        }
    }

    render() {
        return (
            <div>

                <h2 className="title">Enter Amount</h2>

                <div className="bigBox">
                    <div className="smallBox">
                        <span className="label">Category: </span>
                        {/* <select className="forInput" id="cat"> */}
                            {this.getSections()}
                        {/* </select> */}
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